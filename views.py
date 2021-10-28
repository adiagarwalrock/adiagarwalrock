from flask import render_template, request, redirect, json, flash
from flask.helpers import url_for
import requests
import json
import csv
import pandas

from bot import Bot, Github_Bot
import config

DATA_FILE = 'data.json'
SITEKEY = config.CAPTCHA_SITE

f = open(DATA_FILE,)
data = json.load(f)
f.close()


def is_human(captcha_response):
    secret = config.CAPTCHA_SECRET
    payload = {'response': captcha_response, 'secret': secret}
    response = requests.post(
        "https://www.google.com/recaptcha/api/siteverify", payload)
    response_text = json.loads(response.text)
    return response_text['success']


def admin_page_view():
    github_bot = Github_Bot()
    github_repos = github_bot.get_public_repo()

    if request.method == 'POST':
        # Edit Fav Projects to pin
        if request.form.get('landing_page_submit'):
            landing_page_items = request.form.getlist('landing_page')
            print("landing_page: ", landing_page_items)

            with open(config.FAV_PROJ_DB_PATH, 'w', newline='') as file:
                writer = csv.writer(file)
                for item in range(len(landing_page_items)):
                    writer.writerow([landing_page_items[item]])

        if request.form.get('skill_submit'):
            # Add New Skill
            new_skill = request.form.get('new_skill')
            skill_category = request.form.get('skill_category')
            print("\nSKILL: ", new_skill, skill_category)

        return redirect(url_for('success'))

    context = {
        "content": github_repos
    }
    return render_template("administrator.html", **context)


def index_view():
    github_bot = Github_Bot()
    github_repos = github_bot.get_public_repo()
    if request.method == 'POST':
        name = str(request.form['name'])
        email = str(request.form['email'])
        contact = str(request.form['contact'])
        message = str(request.form['message'])
        captcha_response = request.form['g-recaptcha-response']

        if is_human(captcha_response):
            slack_bot = Bot()
            response = slack_bot.contact_slack_bot(
                message, name, email, contact)

            if response:
                status = "Detail submitted successfully."
                flash(status)
                return redirect('/')
            else:
                status = "Error incurred while submitting, Please try later !"
                flash(status)
                return redirect('/')

        else:
            status = "Sorry ! Please check the CAPTCHA"
            flash(status)

    context = {
        "content": github_repos,
        "projects_data": data['projects'],
        "skill_category": data['categories'],
        "sitekey": SITEKEY,
        "skills_data": data['skills'],
    }

    return render_template("index.html", **context)


def project_page_view():
    github_bot = Github_Bot()
    github_repos = github_bot.get_public_repo()
    return render_template("projects.html", content=github_repos)


def v3_view():

    github_bot = Github_Bot()
    github_repos = github_bot.get_public_repo()

    if request.method == 'POST':
        name = str(request.form['name'])
        email = str(request.form['email'])
        contact = str(request.form['contact'])
        message = str(request.form['message'])
        captcha_response = request.form['g-recaptcha-response']

        if is_human(captcha_response):
            slack_bot = Bot()
            response = slack_bot.contact_slack_bot(
                message, name, email, contact)

            if response:
                status = "Detail submitted successfully."
                flash(status)
                return redirect('v3')
            else:
                status = "Error incurred while submitting, Please try later !"
                flash(status)
                return redirect('v3')

        else:
            status = "Sorry ! Please check the CAPTCHA"
            flash(status)

    context = {
        "content": github_repos,
        "projects_data": data['projects'],
        "skill_category": data['categories'],
        "sitekey": SITEKEY,
        "skills_data": data['skills'],
    }
    return render_template("v3.html", **context)
