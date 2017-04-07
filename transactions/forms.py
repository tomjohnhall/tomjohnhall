from django import forms
from django.contrib import admin
from ckeditor.widgets import CKEditorWidget
from models import GuiltWord

class TransactionForm(forms.Form):
    item = forms.CharField(max_length=50)
    price = forms.DecimalField()
    shop = forms.CharField(max_length=50, required = False)
    bing_image = forms.CharField(max_length=99, required=False)
    notes = forms.CharField(required=False, widget=CKEditorWidget() )
    guiltwords = forms.ModelMultipleChoiceField(queryset=GuiltWord.objects.all(), required=False)
