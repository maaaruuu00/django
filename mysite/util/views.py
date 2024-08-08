from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def main(request):
    return render(request, 'main.html')
def clock(request):
    return render(request, 'clock.html')
def calendar(request):
    return render(request, 'calendar.html')
def exchange_rate(request):
    return render(request, 'exchange_rate.html')
def heartrate(request):
    return render(request, 'heartrate.html')
def calculator(request):
    return render(request, 'calculator.html')
def myip(request):
    return render(request, 'myip.html')
def bmi_calculator(request):
    return render(request, 'bmi_calculator.html')
def blog(request):
    return render(request, 'blog.html')
def doryang(request):
    return render(request, 'doryang.html')

def game(request):
    return render(request, 'game.html')


def base(request):
    return render(request, 'base.html')
def basetest(request):
    return render(request, 'basetest.html')

def Ads(request):
    return HttpResponse("google.com, pub-6857449583126977, DIRECT, f08c47fec0942fa0", content_type='text/plain')