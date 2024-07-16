from flask import (
    Flask,
    render_template,
    redirect,
    request,
    Response,
    send_from_directory,
)
from flask.helpers import url_for
from dotenv import load_dotenv
from pathlib import Path
import os

from views import *

ENV_PATH = Path(".") / ".env"
load_dotenv(dotenv_path=ENV_PATH)


app = Flask(__name__)
app.secret_key = os.environ["APP_SECRET"]
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["EXPLAIN_TEMPLATE_LOADING"] = True

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


@app.route("/sitemap.xml")
def sitemap():
    base_url = request.host_url.rstrip("/")  # Get the base URL
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap-image/1.1
        http://www.sitemaps.org/schemas/sitemap-image/1.1/sitemap-image.xsd">
    <url>
        <loc>{base_url}/</loc>
        <lastmod>2024-01-01</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{base_url}/resume</loc>
        <lastmod>2024-01-01</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>"""

    return Response(xml, mimetype="application/xml")


@app.route("/robots.txt")
def robots():
    return send_from_directory(os.getcwd(), "Robots.txt")


if __name__ == "__main__":
    app.run(debug=True)
