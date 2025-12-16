import csv
from pathlib import Path

from dotenv import load_dotenv
from flask import json, redirect, render_template, request
from flask.helpers import url_for
from github import Github

ENV_PATH = Path(".") / ".env"
load_dotenv(dotenv_path=ENV_PATH)


FAV_PROJ_DB_PATH = "static/db/landing_page_projects.csv"
CERT_DB_PATH = "static/db/certs.csv"
SKILLS_PATH = "data.json"


class Github_Bot:

    def get_public_repo(self):
        github_obj = Github()
        user = github_obj.get_user("adiagarwalrock")
        return user.get_repos()


def admin_page_view():
    github_bot = Github_Bot()
    github_repos = github_bot.get_public_repo()

    if request.method == "POST":
        if request.form.get("landing_page_submit"):
            # Edit Fav Projects to pin
            landing_page_items = request.form.getlist("landing_page")

            with open(FAV_PROJ_DB_PATH, "w", newline="") as file:
                writer = csv.writer(file)
                for item in range(len(landing_page_items)):
                    writer.writerow([landing_page_items[item]])

        if request.form.get("skill_submit"):
            # Add New Skill
            new_skill = request.form.get("new_skill")
            skill_category = request.form.get("skill_category")
            with open(SKILLS_PATH, "r+") as jsonfile:
                data = json.load(jsonfile)
                data["skills"]["skills"][skill_category].append(new_skill)
                jsonfile.truncate(0)
                jsonfile.seek(0)
                json.dump(data, jsonfile)

        return redirect(url_for("success"))

    context = {"content": github_repos}
    return render_template("admin.html", **context)


def index_page_view():

    f = open(SKILLS_PATH, "r")
    data = json.load(f)
    f.close()

    github_bot = Github_Bot()
    github_repos = github_bot.get_public_repo()

    projects_data = []
    with open(FAV_PROJ_DB_PATH, "r") as file:
        reader = csv.reader(file)
        for row in reader:
            projects_data.append(row[0])

    cert_data = []
    with open(CERT_DB_PATH, "r") as file:
        reader = csv.reader(file)
        for row in reader:
            cert_data.append(row)

    context = {
        "content": github_repos,
        "projects_data": projects_data,
        "cert_data": cert_data,
        "skill_category": data["skills"]["categories"],
        "skills_data": data["skills"]["skills"],
        "canonical_url": request.url,
    }

    return render_template("v4.html", **context)
