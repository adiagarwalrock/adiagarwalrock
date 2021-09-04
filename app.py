from flask import Flask, render_template, request, redirect, Response, json, flash
import requests
from bot import Bot
import config


app = Flask(__name__)

app.config['SECRET_KEY'] = config.SECRET_KEY[0]


def is_human(captcha_response):
    """ Validating recaptcha response from google server
        Returns True captcha test passed for submitted form else returns False.
    """
    secret = config.CAPTCHA[1]
    payload = {'response': captcha_response, 'secret': secret}
    response = requests.post(
        "https://www.google.com/recaptcha/api/siteverify", payload)
    response_text = json.loads(response.text)
    return response_text['success']


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/resume')
def resume_page():
    return render_template("resume.html")


@app.route('/qwerty/here/nothing/admin/picture/', methods=['GET', 'POST'])
def admin_page():
    return render_template("administrator.html")


@app.route('/more')
def more():
    return render_template("more.html")


@app.route('/projects')
def project_page():
    return render_template("test.html")


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    try:
        sitekey = config.CAPTCHA[0]

        if request.method == 'POST':
            name = str(request.form['name'])
            email = str(request.form['email'])
            contact = str(request.form['contact'])
            message = str(request.form['message'])
            captcha_response = request.form['g-recaptcha-response']

            if is_human(captcha_response):
                # Process request here
                messanger = Bot()
                response = messanger.slack_bot(message, name, email, contact)

                if response:
                    status = "Detail submitted successfully."
                    flash(status)
                    return redirect('/')

                else:
                    status = "Error incurred while submitting, Please try later !"
                    flash(status)
                    return redirect('/')

            else:
             # Log invalid attempts
                status = "Sorry ! Please Check I'm not a robot."
                flash(status)

        else:
            return render_template("contact.html", sitekey=sitekey)

    except:
        return redirect('/')


if __name__ == "__main__":
    app.run(debug=True)
