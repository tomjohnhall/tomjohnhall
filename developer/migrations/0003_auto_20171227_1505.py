# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-12-27 15:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('developer', '0002_auto_20171227_1500'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='page_index',
            field=models.DecimalField(decimal_places=1, default=1, max_digits=3),
        ),
    ]
