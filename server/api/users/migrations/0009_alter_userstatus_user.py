# Generated by Django 5.0.3 on 2024-03-20 01:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_remove_userstatus_end_date_remove_userstatus_phase_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userstatus',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='status', to=settings.AUTH_USER_MODEL, unique=True),
        ),
    ]
