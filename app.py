from flask import Flask, render_template, url_for, request, redirect
from bot import bot

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/resume')
def resume_page():
    return render_template("resume.html")


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    try:
        if request.method == 'POST':
            name = request.form['name']
            email = request.form['email']
            contact = request.form['contact']
            message = request.form['message']
            try:
                bot(message, name, email, contact)
                try:
                    return redirect('thankyou')

                except:
                    return redirect('/')

            except:
                return "ERROR IN SENDING YOUR RESPONSE PAGE !!!! <br>PLEASE TRY AGAIN IN SOME TIME. <br>Stage: Bot Function_Call from app"

        else:
            return render_template("contact.html")

    except:
        return redirect('/')


@app.route('/thankyou')
def thankyou():
    return render_template("thanksPage.html")


if __name__ == "__main__":
    app.run(debug=True)
