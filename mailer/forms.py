from django import forms
from django.core.validators import validate_email
from phonenumber_field.formfields import PhoneNumberField

class MailerForm(forms.Form):
    email = forms.CharField(validators=[validate_email])
    mobile = PhoneNumberField(required=False)
    text = forms.BooleanField(required=False)
    whatsapp = forms.BooleanField(required=False)
    group = forms.BooleanField(required=False)
