from django.contrib import admin
from .models import Entry, Milligan
from django import forms
from ckeditor.widgets import CKEditorWidget



class EntryAdmin(admin.ModelAdmin):
    ordering = ('-date',)
    content = forms.CharField(widget=CKEditorWidget())


admin.site.register(Entry)

class MilliganAdmin(admin.ModelAdmin):
    ordering = ('-id',)
    content = forms.CharField(widget=CKEditorWidget())

admin.site.register(Milligan)
