from django.shortcuts import render
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
from urllib2 import urlopen
from urllib2 import Request
import random
import re

# Create your views here.

def index(request):
    return render(request, 'index.html')

def loadSciFi(request):
    def getSoup(url, headers):
        req = Request(url, headers=headers)
        page = urlopen(req)
        soup = BeautifulSoup(page.read(), "html.parser")
        return soup
    def getSciFi(url, headers):
        soup = getSoup(url, headers)
        thispage = soup.find("td", {"class" : "content2"})
        nextpage = soup.findAll('a', text=re.compile('Next Page'))
        return {'thispage' : thispage , 'nextpage' : nextpage}
    url = 'http://www.sffworld.com/authors/fiction/sf.html'
    headers ={"User-Agent":'USERAGENT'}
    links = []
    content = []
    soup = getSoup(url, headers)
    titles = soup.select('a')
    for a in titles:
        if 'authors' in a["href"] :
            link = 'http://www.sffworld.com' + a["href"]
            links.append(link)
    story_url = random.choice(links)
    story = getSciFi(story_url, headers)
    content.append(story["thispage"])
    while len(story["nextpage"]) > 0:
        url = story_url.split('/')
        nexturl = '/'.join(url[0:7]) + '/' + story["nextpage"][0]["href"]
        story = getSciFi(nexturl, headers)
        content.append(story["thispage"])
    prettycontent = []
    for a in content:
        ab = a.prettify()
        prettycontent.append(ab)
    story = ''.join(prettycontent)
    try:
        story
    except:
        story = "Couldn't do the sci fi :("
    return JsonResponse(story, safe=False)
