from django.db import models
from ckeditor.fields import RichTextField


# Create your models here.

class Entry(models.Model):
    date = models.DateTimeField(blank=True, null=True)
    strdate = models.CharField(max_length=30, blank=True, null=True)
    author = models.CharField(max_length=50)
    content = RichTextField()

    def __str__(self):
        return self.strdate

class Milligan(models.Model):
    title = models.CharField(max_length=50, null=True, blank=True)
    author = models.CharField(max_length=30, default = "Spike Milligan")
    content = RichTextField()


    def __str__(self):
        return self.title
