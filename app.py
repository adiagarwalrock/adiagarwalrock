from flask import Flask, render_template, redirect, request
from flask.helpers import url_for
from dotenv import load_dotenv
from pathlib import Path
import os

from views import *
from bot import Bot

ENV_PATH = Path('.') / '.env'
load_dotenv(dotenv_path=ENV_PATH)


app = Flask(__name__)
app.secret_key = os.environ['APP_SECRET']


@app.route('/', methods=['GET', 'POST'])
def index():
    ip_address = request.remote_addr
    # print("Current IP: ", ip_address)
    slack_bot = Bot()
    message="ACCESSED IP: " + ip_address
    # response = slack_bot.contact_slack_bot(message, "PROFILE ALERT", "None")
    return index_page_view()


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
