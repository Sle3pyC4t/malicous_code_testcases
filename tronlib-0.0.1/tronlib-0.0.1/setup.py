from setuptools import setup, find_packages
from pathlib import Path

# Read the contents of your README file
this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text() #Gets the long description from Readme file

setup(
    name='tronlib',
    version='0.0.1',
    packages=find_packages(),
    install_requires=[
         'requests',
    ],  # Add a comma here
    author='olegtron',
    author_email='hidebew558@benznoi.com',
    description='tronlib library for Python',

    long_description=long_description,
    long_description_content_type='text/markdown',
    license='MIT',
     project_urls={
           'Source Repository': 'https://github.com' #replace with your github source
    }
)
