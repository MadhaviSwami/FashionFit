"""Fashion Fit backend (Flask).

Run:  python app.py      (serves http://localhost:5000)
"""

import re
import sqlite3
import time
import uuid

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

from config import BASE_DIR, Config

if Config.USE_SYSTEM_CERTS:
    try:  # use the Windows/macOS certificate store for outgoing HTTPS
        import truststore

        truststore.inject_into_ssl()
    except ImportError:
        pass

from auth import create_token, login_required, optional_user  # noqa: E402
from database import get_db, init_db  # noqa: E402
from image_utils import (  # noqa: E402
    ImageError,
    analyze_person,
    fit_garment,
    fit_person,
    load_upload,
    restore_framing,
    thumbnail_data_url,
    to_data_url,
    to_jpeg_bytes,
)
from providers import ProviderError, build_provider  # noqa: E402

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
VALID_CATEGORIES = {"upper_body", "lower_body", "dresses"}


def validate_password(password):
    if len(password) < 8:
        return "Password must be at least 8 characters."
    if not re.search(r"[A-Za-z]", password) or not re.search(r"\d", password):
        return "Password must contain at least one letter and one number."
    return None


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["MAX_CONTENT_LENGTH"] = (Config.MAX_UPLOAD_MB * 2 + 2) * 1024 * 1024
    Config.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    (Config.UPLOAD_DIR / "results").mkdir(exist_ok=True)

    CORS(app, resources={r"/api/*": {"origins": [Config.FRONTEND_ORIGIN, "http://127.0.0.1:5180"]}})
    init_db(app)

    provider = build_provider(Config)
    max_mb = Config.MAX_UPLOAD_MB

    # ------------------------------------------------------------ errors
    @app.errorhandler(413)
    def too_large(_e):
        return jsonify(error=f"Upload too large. Maximum is {max_mb} MB per image."), 413

    @app.errorhandler(404)
    def not_found(_e):
        return jsonify(error="Not found."), 404

    @app.errorhandler(500)
    def server_error(_e):
        return jsonify(error="Something went wrong on the server."), 500

    # ------------------------------------------------------------ root
    @app.get("/")
    def index():
        """This server is only the API. Point people to the website instead."""
        site = Config.FRONTEND_ORIGIN
        return (
            "<!doctype html><title>Fashion Fit API</title>"
            "<body style='font-family:system-ui;max-width:560px;margin:60px auto;line-height:1.6'>"
            "<h1>Fashion Fit API is running &#10003;</h1>"
            "<p>This address is the <b>backend</b> only. It has no web pages.</p>"
            f"<p>Open the website at <a href='{site}'>{site}</a> "
            "(start it with <code>npm run dev</code> in the <code>frontend</code> folder).</p>"
            "<p>API health check: <a href='/api/health'>/api/health</a></p></body>"
        )

    # ------------------------------------------------------------ health
    @app.get("/api/health")
    def health():
        return jsonify(status="ok")

    # ------------------------------------------------------------ try-on
    @app.get("/api/tryon/status")
    def tryon_status():
        return jsonify(provider.info())

    @app.post("/api/tryon/analyze")
    def tryon_analyze():
        """Photo quality check. The photo is processed in memory only."""
        try:
            person = load_upload(request.files.get("person"), max_mb, "photo")
        except ImageError as exc:
            return jsonify(error=str(exc)), 400
        return jsonify(analyze_person(person))

    @app.post("/api/tryon")
    def tryon():
        enabled, message = provider.status()
        if not enabled:
            return jsonify(error=message, aiEnabled=False), 503

        try:
            person = load_upload(request.files.get("person"), max_mb, "photo")
            garment = load_upload(request.files.get("garment"), max_mb, "garment image")
        except ImageError as exc:
            return jsonify(error=str(exc)), 400

        category = request.form.get("category", "upper_body")
        if category not in VALID_CATEGORIES:
            return jsonify(error="Invalid garment category."), 400
        product_id = request.form.get("product_id", "")
        color_key = request.form.get("color", "")
        product_name = (request.form.get("product_name") or product_id or "Garment")[:120]
        description = (request.form.get("description") or product_name or "a garment")[:200]

        quality = analyze_person(person)
        person_canvas, box = fit_person(person)
        garment_canvas = fit_garment(garment)

        started = time.time()
        try:
            raw = provider.generate(person_canvas, garment_canvas, description, category)
        except ProviderError as exc:
            return jsonify(error=str(exc)), exc.status
        elapsed = round(time.time() - started, 1)
        result = restore_framing(raw, box, person.size)

        history_id = None
        user = optional_user()
        if user and request.form.get("save_history") == "true":
            # Saved only with explicit consent. We store the generated result,
            # never the original photo. Users can delete it at any time.
            filename = f"{uuid.uuid4().hex}.jpg"
            (Config.UPLOAD_DIR / "results" / filename).write_bytes(to_jpeg_bytes(result))
            db = get_db()
            cur = db.execute(
                "INSERT INTO tryon_history (user_id, product_id, product_name, color_key, provider, result_file)"
                " VALUES (?, ?, ?, ?, ?, ?)",
                (user["id"], product_id, product_name, color_key, provider.name, filename),
            )
            db.commit()
            history_id = cur.lastrowid

        return jsonify(
            image=to_data_url(result),
            provider=provider.name,
            model=provider.model,
            seconds=elapsed,
            tips=quality["tips"],
            historyId=history_id,
        )

    # ------------------------------------------------------------ auth
    @app.post("/api/auth/signup")
    def signup():
        data = request.get_json(silent=True) or {}
        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""
        if len(name) < 2:
            return jsonify(error="Please enter your name (at least 2 characters)."), 400
        if not EMAIL_RE.match(email):
            return jsonify(error="Please enter a valid email address."), 400
        problem = validate_password(password)
        if problem:
            return jsonify(error=problem), 400
        db = get_db()
        try:
            cur = db.execute(
                "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
                (name, email, generate_password_hash(password)),
            )
            db.commit()
        except sqlite3.IntegrityError:
            return jsonify(error="An account with this email already exists."), 409
        user = dict(db.execute("SELECT id, name, email, created_at FROM users WHERE id = ?", (cur.lastrowid,)).fetchone())
        return jsonify(token=create_token(user["id"]), user=user), 201

    @app.post("/api/auth/login")
    def login():
        data = request.get_json(silent=True) or {}
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""
        row = get_db().execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
        if not row or not check_password_hash(row["password_hash"], password):
            return jsonify(error="Incorrect email or password."), 401
        user = {k: row[k] for k in ("id", "name", "email", "created_at")}
        return jsonify(token=create_token(user["id"]), user=user)

    @app.get("/api/auth/me")
    @login_required
    def me():
        return jsonify(user=optional_user())

    @app.patch("/api/auth/me")
    @login_required
    def update_me():
        user = optional_user()
        data = request.get_json(silent=True) or {}
        name = (data.get("name") or "").strip()
        if len(name) < 2:
            return jsonify(error="Please enter your name (at least 2 characters)."), 400
        db = get_db()
        db.execute("UPDATE users SET name = ? WHERE id = ?", (name, user["id"]))
        db.commit()
        return jsonify(user={**user, "name": name})

    @app.delete("/api/auth/me")
    @login_required
    def delete_me():
        user = optional_user()
        db = get_db()
        for row in db.execute("SELECT result_file FROM tryon_history WHERE user_id = ?", (user["id"],)):
            (Config.UPLOAD_DIR / "results" / row["result_file"]).unlink(missing_ok=True)
        db.execute("DELETE FROM users WHERE id = ?", (user["id"],))
        db.commit()
        return jsonify(ok=True)

    # ------------------------------------------------------------ try-on history
    @app.get("/api/history")
    @login_required
    def list_history():
        from PIL import Image

        rows = get_db().execute(
            "SELECT * FROM tryon_history WHERE user_id = ? ORDER BY created_at DESC, id DESC LIMIT 30",
            (optional_user()["id"],),
        ).fetchall()
        items = []
        for r in rows:
            path = Config.UPLOAD_DIR / "results" / r["result_file"]
            if not path.exists():
                continue
            with Image.open(path) as img:
                thumb = thumbnail_data_url(img)
            items.append({
                "id": r["id"],
                "productId": r["product_id"],
                "productName": r["product_name"],
                "color": r["color_key"],
                "provider": r["provider"],
                "createdAt": r["created_at"],
                "thumbnail": thumb,
            })
        return jsonify(history=items)

    def _history_row(history_id):
        return get_db().execute(
            "SELECT * FROM tryon_history WHERE id = ? AND user_id = ?", (history_id, optional_user()["id"])
        ).fetchone()

    @app.get("/api/history/<int:history_id>/image")
    @login_required
    def history_image(history_id):
        row = _history_row(history_id)
        if not row:
            return jsonify(error="Not found."), 404
        path = Config.UPLOAD_DIR / "results" / row["result_file"]
        if not path.exists():
            return jsonify(error="Image file is missing."), 404
        return send_file(path, mimetype="image/jpeg")

    @app.delete("/api/history/<int:history_id>")
    @login_required
    def delete_history(history_id):
        row = _history_row(history_id)
        if not row:
            return jsonify(error="Not found."), 404
        (Config.UPLOAD_DIR / "results" / row["result_file"]).unlink(missing_ok=True)
        db = get_db()
        db.execute("DELETE FROM tryon_history WHERE id = ?", (history_id,))
        db.commit()
        return jsonify(ok=True)

    # ------------------------------------------------------------ contact
    @app.post("/api/contact")
    def contact():
        data = request.get_json(silent=True) or {}
        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip()
        message = (data.get("message") or "").strip()
        if len(name) < 2:
            return jsonify(error="Please enter your name."), 400
        if not EMAIL_RE.match(email):
            return jsonify(error="Please enter a valid email address."), 400
        if len(message) < 10:
            return jsonify(error="Your message should be at least 10 characters."), 400
        db = get_db()
        db.execute(
            "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)", (name, email, message[:5000])
        )
        db.commit()
        return jsonify(ok=True), 201

    return app


app = create_app()

if __name__ == "__main__":
    info = build_provider(Config).info()
    print(f"\n  Fashion Fit API on http://localhost:5000")
    print(f"  AI try-on: {'ENABLED' if info['enabled'] else 'DISABLED'} - {info['message']}\n")
    app.run(host="127.0.0.1", port=5000, debug=False)
