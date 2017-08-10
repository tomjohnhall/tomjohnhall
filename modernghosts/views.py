from django.shortcuts import render
import requests
from mailer.forms import MailerForm

# Create your views here.

def index(request):
    return render(request, 'modern-ghosts.html')
