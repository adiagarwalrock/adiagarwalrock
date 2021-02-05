from flask import Flask, render_template, url_for, request, redirect
from bot import Bot

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/resume')
def resume_page():
    return render_template("resume.html")

@app.route('/projects')
def project_page():
    return render_template("test.html")

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    try:
        if request.method == 'POST':
            name = str(request.form['name'])
            email = str(request.form['email'])
            contact = str(request.form['contact'])
            message = str(request.form['message'])
            try:
                messanger = Bot()
                messanger.slack_bot(message, name, email, contact)
                try:
                    import time 
                    for i in range(5,0,-1): 
                        time.sleep(1) 
                    
                    return redirect('/')

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
    