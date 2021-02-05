import config
from flask import redirect
class Bot():
    # def __init__(self):
    # #     self.message = message
    # #     self.name = name
    # #     self.email = email
    # #     self.contact = contact
    #     return

    def slack_bot(self, message, name, email, contact=None):
        try: 
            import slack
        
            try:
                name = name
                message = message
                email = email
                contact = contact

                client = slack.WebClient(token=config.SLACK_TOKEN)
                text = name + "\nEmail: " + email + "\nContact: " + contact + "\nMessage: " + message
                channel = '#portfolio_website'

                client.chat_postMessage(channel=channel, text=text)

                return redirect('thankyou')
        
            except: 
                return "ERROR IN SENDING YOUR RESPONSE PAGE !!!! <br>PLEASE TRY AGAIN IN SOME TIME. <br>Stage: Bot Function_Execution from bot"

        except: 
                return "ERROR IN SENDING YOUR RESPONSE PAGE !!!! <br>PLEASE TRY AGAIN IN SOME TIME. <br>Stage: Bot Library Import"


# def bot(message, name=None, email=None, contact=None):
#     from twilio.rest import Client 
#     import config

#     sid = config.BOT_SID
#     token = config.BOT_TOKEN
#     client = Client(sid, token)
#   body = "*" + name + "*" + " wishes to contact you-- " +"\nEmail: " + email + "\nContact: " + contact + "\nMessage: " + message  from_whatsapp_number = 'whatsapp:+14155238886'
#     to_whatsapp_number = 'whatsapp:+918791678138'
#     
#     try:
#         client.messages.create(body=body, from_=from_whatsapp_number, to=to_whatsapp_number)
#     except :
#         return "ERROR IN SENDING YOUR RESPONSE/n Stage: Bot Function"
