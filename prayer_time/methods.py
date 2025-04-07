import requests

from core.settings import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

# i have no idea what to add to task_queue so this will do for now


def send_visit():
    message = f"Cihuy. Ada pengunjung baru!"
    requests.post(
        f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
        json={"chat_id": TELEGRAM_CHAT_ID, "text": message, "parse_mode": "HTML"},
    )
