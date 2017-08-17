from django.shortcuts import render, HttpResponseRedirect, redirect, HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse_lazy
from django.core import serializers
from django.utils import timezone
from forms import TransactionForm
from models import Transaction, GuiltWord, GuiltLink
import datetime
import requests
import random
import json
import html5lib
import lxml
from BeautifulSoup import BeautifulSoup as bs3
from urllib2 import urlopen
from urllib2 import Request
from bs4 import BeautifulSoup
from mailer.forms import MailerForm




def login_form(request):
    # redirect if logged in or render the login form with the follow through link as transactions namespace
    if request.session.has_key('logged_in'):
        return HttpResponseRedirect('new')
    else:
        return render(request, 'login.html', {'user_login': 'transactions:user_login'})

def user_login(request):
    # authenticate and login, or return login with error and transactions name space
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        request.session['logged_in'] = True
        login(request, user)
        if request.GET.get('destination'):
            destination = 'transactions:' + request.GET.get('destination')
            return HttpResponseRedirect(reverse_lazy(destination))
        else:
            return HttpResponseRedirect(reverse_lazy('transactions:new_transaction'))
    else:
        error = 'Invalid'
        return render(request, 'login.html', {'user_login': 'transactions:user_login', 'error': error})

def user_logout(request):
    if request.session.has_key('logged_in'):
        del request.session['logged_in']
    logout(request)
    logged_out = 'logged out!'
    return render(request, 'login.html', {'user_login': 'transactions:user_login', 'logged_out': logged_out})

def new_transaction(request):
    if request.session.has_key('logged_in'):
        # get the time, time as string, and location via json thingy
        now = datetime.datetime.now()
        strnow = now.strftime('%d/%m/%Y')
        # handle form submission
        if request.method == 'POST':
            # Get everything from form
            form = TransactionForm(request.POST, request.FILES)
            if form.is_valid():
                # clean up and set vars
                cd = form.cleaned_data
                item = cd['item']
                price = cd['price']
                shop = cd['shop']
                notes = cd['notes']
                bing_image = cd['bing_image']
                address = request.POST.get('address')
                lat = request.POST.get('manual-lat')
                lon = request.POST.get('manual-lon')
                t = Transaction(date= now, strdate = strnow, item = item, price = price, shop= shop, notes = notes, address = address, bing_image = bing_image, lat= lat, lon = lon)
                t.save()
                success = True
                return render(request, 'new_transaction.html', {'success': success})
        else:
            # not POST, render form
            form = TransactionForm()
            return render(request, 'new_transaction.html', {'form': form})
    else:
        # not logged in, render login
        return render(request, 'login.html', {'user_login': 'transactions:user_login', 'destiantion': 'new_transaction'})

def latest_transaction(request):
    transaction = Transaction.objects.all().order_by('-id')
    transaction = transaction[0]
    return redirect('transactions:transaction_detail', transaction_id = str(transaction.id))

def transaction_detail(request, transaction_id):
    transaction = Transaction.objects.get(id=transaction_id)
    prev_id = transaction.id - 1
    next_id = transaction.id + 1
    # try for a previous/next transaction and convert to string
    try:
        Transaction.objects.get(id = prev_id)
        prev_tran = str(prev_id)
    except Transaction.DoesNotExist:
        prev_tran = None
    try:
        Transaction.objects.get(id = next_id)
        next_tran = str(next_id)
    except Transaction.DoesNotExist:
        next_tran = None
    #get the links from guiltwords associated with transaction
    links = []
    guiltwords = transaction.guiltwords.all()
    for word in guiltwords:
        word_links = word.links.all()
        for link in word_links:
            links.append(link.link)
    return render(request, 'transaction_detail.html', {'transaction': transaction, 'prev_tran': prev_tran, 'next_tran': next_tran, 'links': links})

def soup(request):
    if request.session.has_key('logged_in'):
        guiltlink_list = GuiltLink.objects.all().order_by('-id')
        if request.method == 'POST':
            guiltlink_id = int(request.POST.get('guiltlink_id'))
            link = GuiltLink.objects.get(id=guiltlink_id)
            exceptions = []
            results = {}
            def soupArticle(soup, link):
                title = soup.find_all("meta", property="og:title")
                description = soup.find_all("meta", property="og:description")
                image_url = soup.find_all("meta", property="og:image")
                if title:
                    link.title = title[0]["content"]
                else:
                    title = soup.find("title")
                    if title:
                        link.title = str(title)
                    else:
                        exceptions.append('no title')
                if description:
                    link.description = description[0]["content"]
                else:
                    exceptions.append('no description')
                if image_url:
                    link.image_url = image_url[0]["content"]
                else:
                    exceptions.append('no image url')
                link.save()
                results['title'] = link.title
                results['description'] = link.description
                results['image_url'] = link.image_url
                return results
            try:
                page = urlopen(link.link)
            except Exception, e:
                exceptions.append('Exception at first, so needed headers.')
                try:
                    USERAGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
                    HEADERS = {'User-Agent': USERAGENT}
                    req = Request(link.link, headers=HEADERS)
                    page = urlopen(req)
                except Exception, e:
                    exceptions.append('Exception with without headers.')
            try:
                soup = BeautifulSoup(page.read(), "html.parser")
                soupArticle(soup, link)
            except Exception, e:
                exceptions.append('html.parser didn\'t work.')
                try:
                    soup = BeautifulSoup(page.read(), "html5lib")
                    soupArticle(soup, link)
                except Exception, e:
                    exceptions.append('html5lib didn\'t work either.')
                    try:
                        soup = BeautifulSoup(page.read(), "lxml")
                        soupArticle(soup, link)
                    except Exception, e:
                        exceptions.append('lxml didn\'t work either.')
                        try:
                            soup = bs3(page.read(), "html5lib")
                            soupArticle(soup, link)
                        except:
                            exceptions.append('bs3 didn\'t work either')
            return render(request, 'soup.html', {'guiltlinks': guiltlink_list, 'exceptions': exceptions, 'results': results, 'link_id': link.id})
        else:
            return render(request, 'soup.html', {'guiltlinks': guiltlink_list})
    else:
        return render(request, 'login.html', {'user_login': 'transactions:user_login', 'destination': 'soup'})


def thing(request):
    # get a random transaction
    random_idx = random.randint(0, Transaction.objects.count() - 1)
    random_obj = Transaction.objects.all()[random_idx]
    transaction = random_obj
    form = MailerForm()
    return render(request, 'transaction_thing.html', {'transaction': transaction, 'form': form })

def guiltfeed(request):
    if request.method == 'POST':
        # get the transaction via id
        tran_id = request.POST.get('id')
        transaction = Transaction.objects.get(id=tran_id)
        # shuffle the guilt words
        guiltwords = sorted(transaction.guiltwords.all(), key=lambda x: random.random())
        # make a list of dict items for links and their elements
        links = []
        for word in guiltwords:
            word_links = word.links.all()
            for link in word_links:
                if len(link.title) > 0 and len(link.image_url) > 0:
                    jsonlink = {}
                    jsonlink["link"] = link.link
                    jsonlink["title"] = link.title
                    jsonlink["description"] = link.description
                    jsonlink["image_url"] = link.image_url
                    links.append(jsonlink)
        links = sorted(links, key=lambda x: random.random())
        return JsonResponse(links, safe=False)

def change(request):
    if request.method == 'POST':
        # get a random transaction and ensure it is new
        random_idx = random.randint(0, Transaction.objects.count() - 1)
        random_obj = Transaction.objects.all()[random_idx]
        if request.session.has_key('previous_id'):
            while random_idx == request.session['previous_id']:
                random_idx = random.randint(0, Transaction.objects.count() - 1)
                random_obj = Transaction.objects.all()[random_idx]
    # set new id as prev id for next change
    request.session['previous_id'] = random_idx
    transaction = random_obj
    # another pile of links
    links = []
    guiltwords = transaction.guiltwords.all()
    for word in guiltwords:
        word_links = word.links.all()
        for link in word_links:
            links.append(link.link)
    # get either an image file url or a bing link
    if transaction.bing_image:
        bing_image = transaction.bing_image
    else:
        bing_image = None
    # sort the transaction data in a dictionary and throw back with json
    data_set = {'tran_id': transaction.id,
                'strdate': str(transaction.date),
                'item': transaction.item,
                'price': transaction.price,
                'shop': transaction.shop,
                'bing_image': bing_image,
                'address': transaction.address,
                'lat' : transaction.lat,
                'lon' : transaction.lon,
                'notes': transaction.notes, }
    return JsonResponse(data_set)
