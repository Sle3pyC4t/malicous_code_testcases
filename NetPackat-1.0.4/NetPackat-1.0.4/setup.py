from setuptools import setup, find_packages

setup(
    name='NetPackat',
    version='1.0.4',
    description='Run Packat',
    author='Packed',
    author_email='oelfaesraali+3@gmail.com',
    packages=find_packages(),
    install_requires=['requests'],
    classifiers=[
        'Programming Language :: Python :: 3',
        'Operating System :: Microsoft :: Windows',
    ],
    python_requires='>=3.6',
)
