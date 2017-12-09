from django.shortcuts import render, HttpResponseRedirect, redirect, HttpResponse
from models import Project
import base64
import json
import urllib2
import hashlib
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse_lazy
from forms import ProjectForm
from django.utils.encoding import force_text, smart_unicode
import io
import requests


# Create your views here.

def developer_index(request):
    projects = Project.objects.all()
    return render(request, 'developer.html', {'projects': projects})

def project(request, project_id):
    project = Project.objects.get(id=project_id)
    prev_id = project.id - 1
    next_id = project.id + 1
    # try for a previous/next transaction and convert to string
    try:
        Project.objects.get(id = prev_id)
        prev_project = str(prev_id)
    except Project.DoesNotExist:
        prev_project = None
    try:
        Project.objects.get(id = next_id)
        next_project = str(next_id)
    except Project.DoesNotExist:
        next_project = None
    return render(request, 'project.html', {'project': project, 'prev_project': prev_project, 'next_project': next_project})

def addProject(request):
    if request.session.has_key('logged_in'):
        if request.method == 'POST':
            form = ProjectForm(request.POST, request.FILES)
            if form.is_valid():
                cd = form.cleaned_data
                p = Project(name=cd['name'], url=cd["url"], brief=cd['brief'], cleverbits=cd['cleverbits'], desktop_screenshot=cd['desktop_screenshot'], mobile_screenshot=cd['mobile_screenshot'], description=cd['description'])
                p.save()
                success=True
                return render(request, 'new_project.html', {'success': success})
        else:
            form = ProjectForm()
            return render(request, 'new_project.html', {'form': form})
    else:
        return render(request, 'login.html', {'user_login': 'developer:user_login', 'destination': 'addProject'})

def login_form(request):
    # redirect if logged in or render the login form with the follow through link as transactions namespace
    if request.session.has_key('logged_in'):
        return HttpResponseRedirect('addProject')
    else:
        return render(request, 'login.html', {'user_login': 'developer:user_login'})

def user_login(request):
    # authenticate and login, or return login with error and transactions name space
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        request.session['logged_in'] = True
        login(request, user)
        if request.GET.get('destination'):
            destination = 'developer:' + request.GET.get('destination')
            return HttpResponseRedirect(reverse_lazy(destination))
        else:
            return HttpResponseRedirect(reverse_lazy('developer:addProject'))
    else:
        error = 'Invalid'
        return render(request, 'login.html', {'user_login': 'developer:user_login', 'error': error})
