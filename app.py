from flask import (
    Flask,
    render_template,
    redirect,
    request,
    send_from_directory,
)
from flask.helpers import url_for
from dotenv import load_dotenv
from pathlib import Path
import os

from flask_app.config import Config
from flask_app.views import *

ENV_PATH = Path(".") / ".env"
load_dotenv(dotenv_path=ENV_PATH)


app = Flask(__name__)
app.secret_key = os.environ["APP_SECRET"]
app.static_folder = "static"


@app.route("/", methods=["GET"])
def index():
    return index_page_view()


@app.route(os.environ["ADMIN_URL"], methods=["GET", "POST"])
def admin_page():
    return admin_page_view()


@app.route(os.environ["ADMIN_URL"] + "success/", methods=["GET", "POST"])
def success():
    return redirect(url_for("admin_page"))


@app.route("/resume/", methods=["GET"])
def resume():
    canonical_url = request.url
    return render_template("resume.html", canonical_url=canonical_url)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("/error.html")


@app.after_request
def add_expires_header(response):
    if "image" in response.content_type:
        response.headers["Expires"] = "Wed, 21 Oct 2025 07:28:00 GMT"
        response.headers["Cache-Control"] = "public, max-age=2592000"
    return response


@app.route("/robots.txt")
def robots_txt():
    assert app.static_folder is not None
    return send_from_directory(app.static_folder, "Robots.txt")


@app.route("/sitemap.xml")
def sitemap_xml():
    assert app.static_folder is not None
    return send_from_directory(app.static_folder, "sitemap.xml")


@app.route("/humans.txt")
def humans_txt():
    assert app.static_folder is not None
    return send_from_directory(app.static_folder, "humans.txt")


@app.route("/security.txt")
@app.route("/.well-known/security.txt")
def security_txt():
    assert app.static_folder is not None
    return send_from_directory(app.static_folder, "security.txt")


if __name__ == "__main__":
    app.run(debug=Config.DEBUG)
