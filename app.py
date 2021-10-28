from flask import Flask, render_template, redirect
from flask.helpers import url_for
import config

from views import admin_page_view, index_view, project_page_view, v3_view

app = Flask(__name__)
app.config['SECRET_KEY'] = config.APP_SECRET


@app.route('/', methods=['GET', 'POST'])
def index():
    return index_view()


@app.route('/resume/', methods=['GET', 'POST'])
def resume_page():
    return render_template("resume.html")


@app.route(config.ADMIN_URL, methods=['GET', 'POST'])
def admin_page():
    return admin_page_view()


@app.route(config.ADMIN_URL+'success/', methods=['GET', 'POST'])
def success():
    return redirect(url_for('admin_page'))


@app.route('/more/')
def more():
    return render_template("more.html")


@app.route('/projects/')
def project_page():
    return project_page_view()


@app.route('/v3/', methods=['GET', 'POST'])
def v3():
    return v3_view()


if __name__ == "__main__":
    app.run(debug=True)
