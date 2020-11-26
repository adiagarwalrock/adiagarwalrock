def bot(message, name=None, email=None, contact=None):

    from twilio.rest import Client 
    import config

    sid = config.BOT_SID
    token = config.BOT_TOKEN

    client = Client(sid, token)

    from_whatsapp_number = 'whatsapp:+14155238886'
    to_whatsapp_number = 'whatsapp:+918791678138'

    name = name
    email = email
    contact = contact
    message = message

    body = "*" + name + "*" + " wishes to contact you-- " +"\nEmail: " + email + "\nContact: " + contact + "\nMessage: " + message

    try:
        client.messages.create(body=body, from_=from_whatsapp_number, to=to_whatsapp_number)
    
    except :
        return "ERROR IN SENDING YOUR RESPONSE/n Stage: Bot Function"