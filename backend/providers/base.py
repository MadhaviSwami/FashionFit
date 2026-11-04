class ProviderError(RuntimeError):
    """A try-on request failed. The message is safe to show to the user."""

    def __init__(self, message, status=502):
        super().__init__(message)
        self.status = status


class TryOnProvider:
    name = "base"
    label = "Base provider"
    model = None
    supported_categories = ("upper_body", "lower_body", "dresses")

    def status(self):
        """Return (enabled: bool, message: str)."""
        raise NotImplementedError

    def generate(self, person, garment, description, category):
        """Return a PIL.Image of the person wearing the garment."""
        raise NotImplementedError

    def info(self):
        enabled, message = self.status()
        return {
            "enabled": enabled,
            "provider": self.name,
            "label": self.label,
            "model": self.model,
            "message": message,
            "supportedCategories": list(self.supported_categories) if enabled else [],
        }


class DisabledProvider(TryOnProvider):
    name = "none"
    label = "Not configured"

    def __init__(self, message):
        self._message = message

    def status(self):
        return False, self._message

    def generate(self, person, garment, description, category):
        raise ProviderError(self._message, status=503)
