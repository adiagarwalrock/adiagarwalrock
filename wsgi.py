'''WSGI module for running the Flask application with Gunicorn.'''

import logging
from typing import Any, Dict
import gunicorn.app.base
from app import app
from config import Config


class GunicornApp(gunicorn.app.base.BaseApplication):
    """Gunicorn application class with conf"""

    def __init__(self, app: Any, options: dict[str, Any] | None = None) -> None:
        self.options = options or {}
        self.application = app
        super().__init__()

    def load_config(self) -> None:
        """Load configuration options into Gunicorn config."""
        for key, value in self.options.items():
            if key in self.cfg.settings and value is not None:
                self.cfg.set(key, value)

    def load(self) -> Any:
        """Return the application instance."""
        return self.application


if __name__ == "__main__":
    # Production server using Gunicorn
    port: int = Config.PORT
    workers: int = Config.WORKERS
    timeout: int = Config.TIMEOUT
    options: Dict[str, Any] = {
        "bind": f"0.0.0.0:{port}",
        "workers": workers,
        "worker_class": "sync",
        "timeout": timeout,
        "keepalive": 2,
        "max_requests": 1000,
        "max_requests_jitter": 100,
    }

    logging.info(f"Starting Gunicorn server on port {port} with {workers} workers")
    GunicornApp(app, options).run()
