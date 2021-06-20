import config
from flask import redirect


class Bot():

    def slack_bot(self, message, name, email, contact=None):
        try:
            import slack

            try:
                client = slack.WebClient(token=config.SLACK_TOKEN)
                notification = "%s \nEmail: %s \nContact: %s \nMessage: %s" % (
                    name, email, contact, message)
                client.chat_postMessage(
                    channel='#portfolio_website', text=notification)
                return True

            except:
                return False

        except:
            return False


# bot = Bot()
# bot.slack_bot("message", "name", "email", "1564894613")
