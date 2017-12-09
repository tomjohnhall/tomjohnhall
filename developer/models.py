from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=50)
    url = models.URLField()
    desktop_screenshot = models.ImageField(upload_to='img/desktop')
    mobile_screenshot = models.ImageField(upload_to='img/mobile')
    brief = models.TextField()
    cleverbits = models.TextField()
    description = models.TextField()
    def __unicode__(self):
        return u'%s' % self.name
