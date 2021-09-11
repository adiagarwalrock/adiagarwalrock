from flask import render_template, request, redirect, json, flash
from flask.helpers import url_for
import requests
from bot import Bot, Github_Bot
import csv
import config

DB_FILENAME = 'static/db/landing_page_projects.csv'


def is_human(captcha_response):
    secret = config.CAPTCHA[1]
    payload = {'response': captcha_response, 'secret': secret}
    response = requests.post(
        "https://www.google.com/recaptcha/api/siteverify", payload)
    response_text = json.loads(response.text)
    return response_text['success']


def admin_page_view():
    github_bot = Github_Bot()
    github_repos = github_bot.get_public_repo()
    if request.method == 'POST':
        if request.form.get('landing_page_submit'):
            landing_page_items = request.form.getlist('landing_page')
            print("landing_page: ", landing_page_items)

            with open(DB_FILENAME, 'w', newline='') as file:
                writer = csv.writer(file)
                for item in range(len(landing_page_items)):
                    writer.writerow([landing_page_items[item]])

        return redirect(url_for('success'))
    return render_template("administrator.html", content=github_repos)


def index_view():
    github_bot = Github_Bot()
    github_repos = github_bot.get_public_repo()
    to_display = {}
    with open(DB_FILENAME, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            # HELP
            to_display['repo'] = row[0]

    return render_template("index.html", content=github_repos, to_display=to_display)


def project_page_view():
    github_bot = Github_Bot()
    github_repos = github_bot.get_public_repo()
    return render_template("projects.html", content=github_repos)


def contact_view():
    try:
        sitekey = config.CAPTCHA[0]

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

        else:
            return render_template("contact.html", sitekey=sitekey)

    except:
        return redirect('/')
