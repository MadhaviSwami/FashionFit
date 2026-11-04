"""Virtual try-on providers.

A provider takes a person photo and a garment image (both 768x1024 PIL
images) and returns a generated PIL image of the person wearing the garment.

Pick one with TRYON_PROVIDER in backend/.env:
    none         -> AI try-on disabled (default). The UI explains this.
    huggingface  -> IDM-VTON via the public Hugging Face Space (free, queue/quota limits)
    replicate    -> IDM-VTON via the Replicate API (paid, needs REPLICATE_API_TOKEN)
"""

from .base import DisabledProvider, ProviderError
from .huggingface_provider import HuggingFaceProvider
from .replicate_provider import ReplicateProvider

PROVIDERS = {
    "huggingface": HuggingFaceProvider,
    "replicate": ReplicateProvider,
}


def build_provider(config):
    name = config.TRYON_PROVIDER
    if name in ("", "none", "disabled"):
        return DisabledProvider("AI try-on is not enabled. Set TRYON_PROVIDER in backend/.env (see README).")
    cls = PROVIDERS.get(name)
    if cls is None:
        return DisabledProvider(
            f"Unknown TRYON_PROVIDER '{name}'. Use 'huggingface' or 'replicate' (see README)."
        )
    return cls(config)


__all__ = ["build_provider", "ProviderError"]
