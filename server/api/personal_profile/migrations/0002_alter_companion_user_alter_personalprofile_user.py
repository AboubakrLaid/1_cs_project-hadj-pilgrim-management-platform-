# Generated by Django 5.0.3 on 2024-03-27 23:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('personal_profile', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='companion',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='companion', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='personalprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='personal_profile', to=settings.AUTH_USER_MODEL),
        ),
    ]