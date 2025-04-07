from huey.contrib.djhuey import task

from .methods import send_visit


@task()
def send_visit_notification():
    send_visit()
