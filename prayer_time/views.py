from django.shortcuts import render

def index(request):
    return render(request, 'prayer_time/index.html')