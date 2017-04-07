# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import location_field.models.plain


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(null=True, blank=True)),
                ('strdate', models.CharField(max_length=30, null=True, blank=True)),
                ('item', models.CharField(max_length=50)),
                ('price', models.CharField(max_length=50)),
                ('image', models.ImageField(null=True, upload_to=b'', blank=True)),
                ('location', location_field.models.plain.PlainLocationField(max_length=63, null=True, blank=True)),
                ('notes', models.CharField(max_length=999, null=True, blank=True)),
            ],
        ),
    ]
