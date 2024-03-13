# Generated by Django 5.0.3 on 2024-03-12 22:34

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Municipal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Wilaya',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Companion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nin', models.CharField(max_length=18, unique=True)),
                ('birth_date', models.DateField()),
                ('first_name', models.CharField(max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='companion', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PersonalProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nin', models.CharField(max_length=18, unique=True)),
                ('birth_date', models.DateField()),
                ('phone_number', models.CharField(max_length=10, unique=True)),
                ('municipal', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='persons', to='personal_profile.municipal')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='personal_profile', to=settings.AUTH_USER_MODEL)),
                ('wilaya', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='persoons', to='personal_profile.wilaya')),
            ],
        ),
    ]
