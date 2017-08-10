from django.db import models


# Create your models here.

class GuiltLink(models.Model):
    link = models.CharField(max_length = 999)
    title = models.CharField(max_length = 100, blank=True, null=True)
    description = models.CharField(max_length = 9999, blank=True, null=True)
    image_url = models.CharField(max_length = 100, blank=True, null=True)

    def __unicode__(self):
        if self.title:
            return self.title
        else:
            return self.link

class GuiltWord(models.Model):
    word = models.CharField(max_length=30)
    alternatives = models.CharField(max_length=500, blank=True, null=True)
    links = models.ManyToManyField(GuiltLink, blank=True)

    def __unicode__(self):
        return self.word


class Transaction(models.Model):
    date = models.DateTimeField(blank=True, null=True)
    strdate = models.CharField(max_length=30, blank=True, null=True)
    item = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    shop = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to = 'image', blank=True, null=True)
    bing_image = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    lon = models.FloatField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    guiltwords = models.ManyToManyField(GuiltWord)

    def __str__(self):
        return '%s %s' % (self.id, self.item)
