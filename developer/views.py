from django.shortcuts import render
from models import Project

# Create your views here.

def developer_index(request):
    projects = Project.objects.all()
    return render(request, 'developer.html', {'projects': projects})
