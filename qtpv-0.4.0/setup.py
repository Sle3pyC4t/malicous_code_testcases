from setuptools import setup, find_packages

setup(
    name='qtpv',
    version='0.4.0',
    author='matvey',
    author_email='cbisk@gmail.com',
    description='telegram',
    long_description=open('README.md').read(),  # Не забудьте создать файл README.md
    long_description_content_type='text/markdown',
    url='https://github.com/ваш_username/qtpv',  # Замените на URL вашего репозитория
    packages=find_packages(),  # Находит все пакеты в вашем проекте
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    python_requires='>=3.6',
    install_requires=[
        'requests',
    ],
)
