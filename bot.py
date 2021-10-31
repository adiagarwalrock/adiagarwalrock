import os
from github import Github
from dotenv import load_dotenv
from pathlib import Path


ENV_PATH = Path('.') / '.env'
load_dotenv(dotenv_path=ENV_PATH)


class Bot():
    def __init__(self):
        import slack
        self.client = slack.WebClient(token=os.environ['SLACK_TOKEN'])

    def contact_slack_bot(self, message, name, email, contact=None):
        try:
            notification = "%s \nEmail: %s \nContact: %s \nMessage: %s" % (
                name, email, contact, message)
            self.client.chat_postMessage(
                channel='#portfolio_website', text=notification)
            print(notification)
            return True

        except:
            return False


class Github_Bot():

    def get_public_repo(self):
        github_obj = Github()
        user = github_obj.get_user('adiagarwalrock')
        return user.get_repos()
