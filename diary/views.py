from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse_lazy
from forms import EntryForm
from models import Entry, Milligan
import datetime
from django.views import generic
from django.utils import timezone
import requests

# Create your views here.u

def user_login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        request.session['logged_in'] = True
        login(request, user)
        return HttpResponseRedirect(reverse_lazy('diary:entry'))
    else:
        error = 'Invalid'
        return render(request, 'login.html', {'user_login': 'diary:user_login', 'error': error})

def logout(request):
    if request.session.has_key('logged_in'):
        del request.session['logged_in']
    logout(request)
    return render(request, 'login.html', {'user_login': 'diary:user_login'})



def entry(request):
    if request.session.has_key('logged_in'):
        now = datetime.datetime.now()
        if request.method == 'POST':
            form = EntryForm(request.POST)
            if form.is_valid():
                cd = form.cleaned_data
                now = datetime.datetime.now()
                strnow = now.strftime('%d/%m/%Y')
                author = cd['author']
                content = cd['content']
                e = Entry(date= now, strdate = strnow, author = author, content = content)
                e.save()
                return HttpResponseRedirect('/diary/submitted/')
        else:
            form = EntryForm()
            return render(request, 'new_entry.html', {'form': form, 'now': now})
    else:
        return render(request, 'login.html', {'user_login': 'diary:user_login'})

def submitted(request):
    return HttpResponse('Thanks!')

def secrets(request):
    if request.session.has_key('secrets'):
        del request.session['secrets']
    else:
        request.session['secrets'] = True
    return HttpResponseRedirect('/diary')

def secret_submit(request):
    secret = request.POST.get('secret')
    if '42' in secret:
        return HttpResponseRedirect('/diary/secrets')
    else:
        return HttpResponseRedirect('/diary')

def index(request):
    if request.session.has_key('secrets'):
        entries = Entry.objects.order_by('-date')[:20]
        secrets = True
    else:
        entries = Milligan.objects.order_by('?')[:20]
        secrets = False
    return render(request, 'entries.html', {'latest_entry_list': entries, 'secrets': secrets})

class EntryView(generic.DetailView):
    model = Entry
    template_name = 'entry.html'

class MilliganView(generic.DetailView):
    model = Milligan
    template_name = 'milligan.html'
