from flask import Flask, render_template, redirect
from flask.helpers import url_for
from dotenv import load_dotenv
from pathlib import Path
import os

from views import *

ENV_PATH = Path('.') / '.env'
load_dotenv(dotenv_path=ENV_PATH)


app = Flask(__name__)
app.secret_key = os.environ['APP_SECRET']


@app.route('/', methods=['GET', 'POST'])
def index():
    context = index_page_view()
    return render_template("v3.html", **context)


# @app.route('/v3/', methods=['GET', 'POST'])
# def v3():
#     context = index_page_view()
#     return render_template("index.html", **context)


@app.route('/resume/', methods=['GET', 'POST'])
def resume_page():
    return render_template("resume.html")


@app.route(os.environ['ADMIN_URL'], methods=['GET', 'POST'])
def admin_page():
    return admin_page_view()


@app.route(os.environ['ADMIN_URL']+'success/', methods=['GET', 'POST'])
def success():
    return redirect(url_for('admin_page'))


# @app.route('/more/')
# def more():
#     return render_template("more.html")


# @app.route('/contact/', methods=['GET', 'POST'])
# def contact():
#     return contact_view()


if __name__ == "__main__":
    app.run(debug=True)
