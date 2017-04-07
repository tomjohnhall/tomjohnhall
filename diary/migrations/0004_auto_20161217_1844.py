# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import ckeditor.fields


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0003_auto_20161202_1111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='content',
            field=ckeditor.fields.RichTextField(),
        ),
        migrations.AlterField(
            model_name='milligan',
            name='content',
            field=ckeditor.fields.RichTextField(),
        ),
    ]
