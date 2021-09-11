from flask import Flask, render_template, redirect
from flask.helpers import url_for
import config

from views import admin_page_view, contact_view, index_view, project_page_view


app = Flask(__name__)
app.config['SECRET_KEY'] = config.SECRET_KEY[0]


@app.route('/')
def index():
    return index_view()


@app.route('/resume/')
def resume_page():
    return render_template("resume.html")


@app.route('/qwerty/here/nothing/admin/picture/', methods=['GET', 'POST'])
def admin_page():
    return admin_page_view()


@app.route('/qwerty/here/nothing/admin/picture/success/', methods=['GET', 'POST'])
def success():
    return redirect(url_for('admin_page'))


@app.route('/more/')
def more():
    return render_template("more.html")


@app.route('/projects/')
def project_page():
    return project_page_view()


@app.route('/contact/', methods=['GET', 'POST'])
def contact():
    return contact_view()


if __name__ == "__main__":
    app.run(debug=True)
