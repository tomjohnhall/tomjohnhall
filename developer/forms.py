from django import forms
from django.contrib import admin

class ProjectForm(forms.Form):
    name = forms.CharField()
    url = forms.URLField()
    desktop_screenshot = forms.ImageField()
    mobile_screenshot = forms.ImageField()
    brief = forms.CharField(widget=forms.Textarea)
    cleverbits = forms.CharField(widget=forms.Textarea)
    description = forms.CharField(widget=forms.Textarea)
