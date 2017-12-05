from django.shortcuts import render
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
from urllib2 import urlopen
from urllib2 import Request
import random
import re
from mailer.forms import MailerForm
import html5lib


# Create your views here.

def index(request):
    return render(request, 'index.html')

def loadSciFi(request):
    def getSoup(url, headers):
        req = Request(url, headers=headers)
        page = urlopen(req)
        soup = BeautifulSoup(page.read(), "html5lib")
        return soup
    def getSciFi(url, headers):
        soup = getSoup(url, headers)
        title = soup.find('h1')
        title = title.get_text();
        author = soup.find('div', {'class':'storyAuthor'})
        author = author.get_text()
        paras = soup.findAll('div', {'class':'storyText'})
        body = []
        for p in paras:
            body.append(p.get_text())
        story = {'title': title, 'author': author, 'body': body, 'url': url}
        return story
    url = 'http://dailysciencefiction.com/science-fiction/future-societies'
    headers ={"User-Agent":'USERAGENT'}
    try:
        soup = getSoup(url, headers)
        titles = soup.findAll('a', {'class': 'storyListTitle'})
        refs = []
        for a in titles:
            ref = a['href']
            refs.append(ref)
        story_url = 'http://dailysciencefiction.com' + random.choice(refs)
        story = getSciFi(story_url, headers)
    except:
        pass
    return JsonResponse(story, safe=False)
