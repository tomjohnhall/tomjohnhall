# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0002_entry_strdate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Milligan',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=50, null=True, blank=True)),
                ('author', models.CharField(default=b'Spike Milligan', max_length=30)),
                ('content', models.TextField()),
            ],
        ),
        migrations.AlterField(
            model_name='entry',
            name='strdate',
            field=models.CharField(max_length=30, null=True, blank=True),
        ),
    ]
