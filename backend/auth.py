"""Token-based authentication helpers.

Passwords are hashed with Werkzeug (salted PBKDF2/scrypt). Login returns a
signed token that the frontend sends in the `Authorization: Bearer` header.
"""

from functools import wraps

from flask import current_app, g, jsonify, request
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

from database import get_db


def _serializer():
    return URLSafeTimedSerializer(current_app.config["SECRET_KEY"], salt="fashion-fit-auth")


def create_token(user_id):
    return _serializer().dumps({"uid": user_id})


def _user_from_request():
    header = request.headers.get("Authorization", "")
    if not header.startswith("Bearer "):
        return None
    token = header[7:].strip()
    try:
        data = _serializer().loads(token, max_age=current_app.config["TOKEN_MAX_AGE_SECONDS"])
    except (BadSignature, SignatureExpired):
        return None
    row = get_db().execute(
        "SELECT id, name, email, created_at FROM users WHERE id = ?", (data.get("uid"),)
    ).fetchone()
    return dict(row) if row else None


def optional_user():
    """Return the logged-in user (dict) or None."""
    if "user" not in g:
        g.user = _user_from_request()
    return g.user


def login_required(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        user = optional_user()
        if user is None:
            return jsonify(error="Please log in to continue."), 401
        return view(*args, **kwargs)

    return wrapper
