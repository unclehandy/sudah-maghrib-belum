from django.shortcuts import render

from .tasks import send_visit_notification


def index(request):
    response = render(request, "prayer_time/index.html")

    # Only send if render was successful
    if response.status_code == 200:
        send_visit_notification()

    return response
