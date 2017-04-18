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
    try:
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
        story = story.replace('<td class="content2" width="469">', '').replace('</td>', '').replace('<img height="28" src="/pics/h1.gif" width="30">', '').replace('<br>', '').replace('#000000', '#ffffff')
        index = story.find('<img src="pics/', 0)
        if index == -1:
            index = story.find('<img src="/pics', 0)
        if index != -1:
            rating = story.find('rating', index)
            if rating != -1:
                rating = rating + 8
                ratingstring = story[index:rating]
                story = story.replace(ratingstring, '')
        endtitle = story.find('</span>')
        author = story.find('by', endtitle)
        authorend = story.find('<hr', author)
        authorstring = story[author:authorend]
        story = story[:authorend] + story[authorend:].replace(authorstring, '')
        storysoup = BeautifulSoup(story, "html.parser")
        for font in storysoup.findAll('font', {'face' : 'arial'}):
            font.decompose()
        for center in storysoup.findAll('center'):
            center.decompose()
        for div in storysoup.findAll('div', {'align' : 'right'}):
            div.decompose()
        for hr in storysoup.findAll('hr')[1:]:
            hr.unwrap()
        for title in storysoup.findAll('span', {'class' : 'h1'})[1:]:
            title.decompose()
        for table in storysoup.findAll('table', {'align' : 'center'}):
            table.decompose()
        story = storysoup.prettify()
    except:
        story = False
    return JsonResponse(story, safe=False)
