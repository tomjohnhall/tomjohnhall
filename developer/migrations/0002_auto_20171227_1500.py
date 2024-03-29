# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-12-27 15:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('developer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='page_index',
            field=models.DecimalField(decimal_places=1, default=1, max_digits=3),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='project',
            name='desktop_screenshot',
            field=models.ImageField(upload_to='img/desktop'),
        ),
        migrations.AlterField(
            model_name='project',
            name='mobile_screenshot',
            field=models.ImageField(upload_to='img/mobile'),
        ),
    ]
