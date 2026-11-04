"""Image processing with Pillow and OpenCV.

- Validate uploaded images and fix phone-camera rotation (EXIF).
- Check photo quality (face detected, blur, brightness) with OpenCV.
- Fit photos onto the 768x1024 (3:4) canvas that try-on models expect, and
  map the result back to the original framing afterwards.
"""

import base64
import io

import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageOps, UnidentifiedImageError

MODEL_SIZE = (768, 1024)  # width, height used by IDM-VTON
ALLOWED_FORMATS = {"JPEG", "PNG", "WEBP"}
MIN_SIDE = 256

_face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


class ImageError(ValueError):
    """Raised when an uploaded file is not a usable image."""


def load_upload(file_storage, max_mb, label="image"):
    if file_storage is None or file_storage.filename == "":
        raise ImageError(f"No {label} was uploaded.")
    data = file_storage.read()
    if len(data) > max_mb * 1024 * 1024:
        raise ImageError(f"The {label} is larger than {max_mb} MB.")
    try:
        img = Image.open(io.BytesIO(data))
        fmt = img.format
        img.load()
    except (UnidentifiedImageError, OSError):
        raise ImageError(f"The {label} could not be read. Please use a JPG, PNG or WEBP file.")
    if fmt not in ALLOWED_FORMATS:
        raise ImageError(f"Unsupported {label} format ({fmt}). Please use JPG, PNG or WEBP.")
    img = ImageOps.exif_transpose(img)
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA")
        background = Image.new("RGB", img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[-1])
        img = background
    else:
        img = img.convert("RGB")
    if min(img.size) < MIN_SIDE:
        raise ImageError(f"The {label} is too small. Please use one at least {MIN_SIDE}px on each side.")
    return img


def analyze_person(img):
    """Basic photo-quality checks. Returns a dict with tips for the user."""
    small = img.copy()
    small.thumbnail((800, 800))
    gray = cv2.cvtColor(np.asarray(small), cv2.COLOR_RGB2GRAY)

    faces = _face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=6, minSize=(40, 40))
    sharpness = float(cv2.Laplacian(gray, cv2.CV_64F).var())
    brightness = float(gray.mean())
    width, height = img.size

    tips = []
    if len(faces) == 0:
        tips.append("We couldn't find a face. Use a front-facing photo where your face and upper body are visible.")
    elif len(faces) > 1:
        tips.append("More than one person may be in the photo. Try-on works best with a single person.")
    if sharpness < 15:
        tips.append("The photo looks blurry. A sharper photo gives better results.")
    if brightness < 60:
        tips.append("The photo is quite dark. Try a brighter, evenly lit photo.")
    elif brightness > 215:
        tips.append("The photo is very bright. Avoid strong backlight or overexposure.")
    if width > height * 1.1:
        tips.append("Landscape photos work less well. A portrait (vertical) photo is recommended.")

    return {
        "faces": int(len(faces)),
        "sharpness": round(sharpness, 1),
        "brightness": round(brightness, 1),
        "width": width,
        "height": height,
        "ok": len(tips) == 0,
        "tips": tips,
    }


def fit_person(img):
    """Place the photo on a 3:4 canvas without distorting it.

    Empty space is filled with a blurred copy of the photo, which keeps the
    model from inventing strange backgrounds. Returns (canvas, box) where box
    is the region of the canvas that holds the original photo.
    """
    tw, th = MODEL_SIZE
    scale = min(tw / img.width, th / img.height)
    nw, nh = max(1, round(img.width * scale)), max(1, round(img.height * scale))
    resized = img.resize((nw, nh), Image.LANCZOS)

    background = ImageOps.fit(img, MODEL_SIZE, Image.LANCZOS).filter(ImageFilter.GaussianBlur(30))
    x, y = (tw - nw) // 2, (th - nh) // 2
    background.paste(resized, (x, y))
    return background, (x, y, x + nw, y + nh)


def fit_garment(img):
    """Center the garment on a white 768x1024 canvas."""
    canvas = Image.new("RGB", MODEL_SIZE, (255, 255, 255))
    copy = img.copy()
    copy.thumbnail(MODEL_SIZE, Image.LANCZOS)
    canvas.paste(copy, ((MODEL_SIZE[0] - copy.width) // 2, (MODEL_SIZE[1] - copy.height) // 2))
    return canvas


def restore_framing(result, box, original_size):
    """Crop the model output back to the original photo's framing."""
    if result.size != MODEL_SIZE:
        result = result.resize(MODEL_SIZE, Image.LANCZOS)
    cropped = result.crop(box)
    # keep a sensible resolution (no larger than the original, max 1024px tall)
    target_h = min(original_size[1], 1024)
    target_w = round(original_size[0] * target_h / original_size[1])
    return cropped.resize((target_w, target_h), Image.LANCZOS)


def to_jpeg_bytes(img, quality=92):
    buf = io.BytesIO()
    img.convert("RGB").save(buf, format="JPEG", quality=quality)
    return buf.getvalue()


def to_data_url(img, quality=92):
    return "data:image/jpeg;base64," + base64.b64encode(to_jpeg_bytes(img, quality)).decode()


def thumbnail_data_url(img, max_side=360):
    thumb = img.copy()
    thumb.thumbnail((max_side, max_side))
    return to_data_url(thumb, quality=80)
