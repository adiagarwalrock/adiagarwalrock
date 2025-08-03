import os

class Config:
    PORT = int(os.environ.get("PORT", 10000))
    WORKERS = int(os.environ.get("WEB_CONCURRENCY", 1))
    TIMEOUT = int(os.environ.get("TIMEOUT", 120))
    HOST: str = os.environ.get("HOST", "127.0.0.1")
