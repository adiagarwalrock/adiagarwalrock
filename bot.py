def bot(message, name=None, email=None, contact=None):

    from twilio.rest import Client 

    sid = 'AC26add13cb99c160e2f8f85e850cce5bb'
    token = '8f4b8fbc6f9e8f7e844bdc12435f800b'

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