from django.shortcuts import render
from .methods import send_visit_notification

# def index(request):
#     send_visit_notification()
#     return render(request, 'prayer_time/index.html')

def index(request):
    response = render(request, 'prayer_time/index.html')
    
    # Only send if render was successful
    if response.status_code == 200:
        send_visit_notification()
    
    return response
    