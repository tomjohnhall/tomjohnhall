from django.shortcuts import render
from models import Project

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
