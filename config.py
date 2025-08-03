import os

class Config:
    PORT = int(os.environ.get("PORT", 8000))
    WORKERS = int(os.environ.get("WEB_CONCURRENCY", 1))
    TIMEOUT = int(os.environ.get("TIMEOUT", 120))
