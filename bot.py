import os
from github import Github
from dotenv import load_dotenv
from pathlib import Path


# ENV_PATH = Path('.') / '.env'
# load_dotenv(dotenv_path=ENV_PATH)


class Github_Bot():

    def get_public_repo(self):
        github_obj = Github()
        user = github_obj.get_user('adiagarwalrock')
        return user.get_repos()
