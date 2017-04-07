from django import forms
from django.contrib import admin
from ckeditor.widgets import CKEditorWidget

class EntryForm(forms.Form):
    author = forms.CharField(max_length=30)
    content = forms.CharField(widget=CKEditorWidget())
