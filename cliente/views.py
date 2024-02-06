from django.shortcuts import render
# Create your views here.


def index(request):
    return render(request, 'agenda/index.html')

def login(request):
    return render(request, 'login.html')

def psicologia(request):
    return render(request, 'psicologia.html')

def terapia(request):
    return render(request, 'terapia.html')