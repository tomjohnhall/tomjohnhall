from __future__ import unicode_literals

from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.

class Mate(models.Model):
    email = models.CharField(max_length= 199, blank=True, null=True)
    mobile = PhoneNumberField(blank=True, null=True)
    text = models.BooleanField()
    whatsapp = models.BooleanField()
    group = models.BooleanField()
