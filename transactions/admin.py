from django.contrib import admin
from .models import Transaction, GuiltWord, GuiltLink
from django import forms

class TransactionForm( forms.ModelForm ):
    notes = forms.CharField( widget=forms.Textarea )
    class Meta:
        fields = '__all__'
        model = Transaction



class TransactionAdmin(admin.ModelAdmin):
    ordering = ('-date',)
    form = TransactionForm

admin.site.register(Transaction)
admin.site.register(GuiltWord)
admin.site.register(GuiltLink)
