"""IDM-VTON through a Hugging Face Space (default: yisol/IDM-VTON).

IDM-VTON (Choi et al., 2024) is a diffusion-based virtual try-on model. The
public demo Space runs on shared "ZeroGPU" hardware, so requests can queue,
and anonymous users get a small daily GPU quota. Adding a free HF_TOKEN in
backend/.env raises that quota. The public demo only handles upper-body
garments (tops, shirts, jackets, kurtas).
"""

import shutil
import tempfile
from pathlib import Path

from PIL import Image

from .base import ProviderError, TryOnProvider


class HuggingFaceProvider(TryOnProvider):
    name = "huggingface"
    label = "Hugging Face Space"
    supported_categories = ("upper_body",)

    def __init__(self, config):
        self.space = config.HF_SPACE
        self.token = config.HF_TOKEN
        self.steps = config.TRYON_STEPS
        self.seed = config.TRYON_SEED
        self.model = f"IDM-VTON ({self.space})"
        self._client = None
        try:
            import gradio_client  # noqa: F401
            self._import_error = None
        except ImportError:
            self._import_error = "gradio_client is not installed. Run: pip install gradio_client"

    def status(self):
        if self._import_error:
            return False, self._import_error
        note = "" if self.token else " No HF_TOKEN set, so the free anonymous GPU quota applies."
        return True, f"AI try-on is powered by {self.model} on Hugging Face.{note}"

    def _get_client(self):
        if self._client is None:
            from gradio_client import Client

            try:
                kwargs = {"verbose": False}
                if self.token:
                    kwargs["hf_token"] = self.token
                self._client = Client(self.space, **kwargs)
            except Exception as exc:  # network / space asleep / bad name
                raise ProviderError(f"Could not connect to the Hugging Face Space '{self.space}': {exc}")
        return self._client

    def generate(self, person, garment, description, category):
        if category not in self.supported_categories:
            raise ProviderError(
                "The Hugging Face IDM-VTON demo only supports upper-body garments "
                "(tops, shirts, jackets, kurtas). Use the Replicate provider for "
                "bottoms and dresses.",
                status=400,
            )
        from gradio_client import handle_file

        client = self._get_client()
        workdir = Path(tempfile.mkdtemp(prefix="fashionfit_"))
        try:
            person_path = workdir / "person.png"
            garment_path = workdir / "garment.png"
            person.save(person_path)
            garment.save(garment_path)

            try:
                result = client.predict(
                    {"background": handle_file(str(person_path)), "layers": [], "composite": None},
                    handle_file(str(garment_path)),
                    description or "a garment",
                    True,   # use auto-generated mask
                    False,  # auto-crop (we already fit the photo to 3:4)
                    self.steps,
                    self.seed,
                    api_name="/tryon",
                )
            except Exception as exc:
                text = str(exc)
                if "quota" in text.lower() or "GPU" in text:
                    raise ProviderError(
                        "The free Hugging Face GPU quota has been used up. Wait a while, or add "
                        "a free HF_TOKEN to backend/.env for a larger quota. Details: " + text,
                        status=429,
                    )
                raise ProviderError(f"The Hugging Face Space returned an error: {text}")

            output_path = result[0] if isinstance(result, (list, tuple)) else result
            if not output_path or not Path(output_path).exists():
                raise ProviderError("The try-on model did not return an image.")
            with Image.open(output_path) as img:
                return img.convert("RGB").copy()
        finally:
            shutil.rmtree(workdir, ignore_errors=True)
