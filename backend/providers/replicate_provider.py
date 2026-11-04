"""IDM-VTON through the Replicate HTTP API (default model: cuuupid/idm-vton).

Needs a Replicate account with billing and an API token in
REPLICATE_API_TOKEN. Supports upper-body, lower-body and dress garments.
"""

import base64
import io
import time

import requests
from PIL import Image

from .base import ProviderError, TryOnProvider

API = "https://api.replicate.com/v1"


def _data_uri(img):
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


class ReplicateProvider(TryOnProvider):
    name = "replicate"
    label = "Replicate"

    def __init__(self, config):
        self.token = config.REPLICATE_API_TOKEN
        self.model_name = config.REPLICATE_MODEL
        self.version = config.REPLICATE_MODEL_VERSION
        self.timeout = config.TRYON_TIMEOUT_SECONDS
        self.steps = config.TRYON_STEPS
        self.seed = config.TRYON_SEED
        self.model = f"IDM-VTON ({self.model_name} on Replicate)"

    def status(self):
        if not self.token:
            return False, "TRYON_PROVIDER is 'replicate' but REPLICATE_API_TOKEN is missing in backend/.env."
        return True, f"AI try-on is powered by {self.model}."

    @property
    def _headers(self):
        return {"Authorization": f"Bearer {self.token}", "Content-Type": "application/json"}

    def _request(self, method, url, **kwargs):
        try:
            resp = requests.request(method, url, headers=self._headers, timeout=60, **kwargs)
        except requests.RequestException as exc:
            raise ProviderError(f"Could not reach Replicate: {exc}")
        if resp.status_code == 401:
            raise ProviderError("Replicate rejected the API token. Check REPLICATE_API_TOKEN.", status=502)
        if resp.status_code == 402:
            raise ProviderError("Replicate says billing is required for this account.", status=502)
        if resp.status_code >= 400:
            raise ProviderError(f"Replicate error {resp.status_code}: {resp.text[:300]}")
        return resp.json()

    def _resolve_version(self):
        if not self.version:
            data = self._request("GET", f"{API}/models/{self.model_name}")
            latest = data.get("latest_version") or {}
            if not latest.get("id"):
                raise ProviderError(f"Could not find a version for Replicate model '{self.model_name}'.")
            self.version = latest["id"]
        return self.version

    def generate(self, person, garment, description, category):
        payload = {
            "version": self._resolve_version(),
            "input": {
                "human_img": _data_uri(person),
                "garm_img": _data_uri(garment),
                "garment_des": description or "a garment",
                "category": category,
                "crop": False,
                "steps": self.steps,
                "seed": self.seed,
            },
        }
        prediction = self._request("POST", f"{API}/predictions", json=payload)

        deadline = time.time() + self.timeout
        while prediction.get("status") in ("starting", "processing"):
            if time.time() > deadline:
                raise ProviderError("The try-on took too long and was stopped. Please try again.", status=504)
            time.sleep(2)
            prediction = self._request("GET", prediction["urls"]["get"])

        if prediction.get("status") != "succeeded":
            raise ProviderError(f"Try-on failed on Replicate: {prediction.get('error') or prediction.get('status')}")

        output = prediction.get("output")
        url = output[0] if isinstance(output, list) else output
        if not url:
            raise ProviderError("Replicate did not return an image.")
        try:
            img_resp = requests.get(url, timeout=60)
            img_resp.raise_for_status()
            return Image.open(io.BytesIO(img_resp.content)).convert("RGB")
        except Exception as exc:
            raise ProviderError(f"Could not download the generated image: {exc}")
