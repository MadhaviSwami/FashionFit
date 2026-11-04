"""Application settings, loaded from environment variables / the .env file."""

import os
import secrets
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")


def _bool(name, default=False):
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in ("1", "true", "yes", "on")


def _secret_key():
    """Use SECRET_KEY from .env, or create one and keep it in a local file so
    login tokens keep working after a server restart."""
    key = os.getenv("SECRET_KEY")
    if key:
        return key
    key_file = BASE_DIR / ".secret_key"
    if key_file.exists():
        return key_file.read_text().strip()
    key = secrets.token_hex(32)
    key_file.write_text(key)
    return key


class Config:
    SECRET_KEY = _secret_key()
    DATABASE_PATH = Path(os.getenv("DATABASE_PATH", BASE_DIR / "fashion_fit.db"))
    UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", BASE_DIR / "uploads"))
    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5180")

    MAX_UPLOAD_MB = int(os.getenv("MAX_UPLOAD_MB", "10"))
    TOKEN_MAX_AGE_SECONDS = 7 * 24 * 3600

    # Use the operating-system certificate store for HTTPS calls (fixes SSL
    # errors on networks that use their own certificates, common on Windows).
    USE_SYSTEM_CERTS = _bool("USE_SYSTEM_CERTS", True)

    # ---- Virtual try-on provider -------------------------------------
    # none | huggingface | replicate
    TRYON_PROVIDER = os.getenv("TRYON_PROVIDER", "none").strip().lower()
    TRYON_TIMEOUT_SECONDS = int(os.getenv("TRYON_TIMEOUT_SECONDS", "300"))
    TRYON_STEPS = int(os.getenv("TRYON_STEPS", "30"))
    TRYON_SEED = int(os.getenv("TRYON_SEED", "42"))

    # Hugging Face Space running IDM-VTON (free, shared GPU quota)
    HF_SPACE = os.getenv("HF_SPACE", "yisol/IDM-VTON")
    HF_TOKEN = os.getenv("HF_TOKEN", "").strip() or None

    # Replicate hosted IDM-VTON (paid, needs an API token)
    REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN", "").strip() or None
    REPLICATE_MODEL = os.getenv("REPLICATE_MODEL", "cuuupid/idm-vton")
    REPLICATE_MODEL_VERSION = os.getenv("REPLICATE_MODEL_VERSION", "").strip() or None
