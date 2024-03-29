# Generated by Django 5.0.3 on 2024-03-21 00:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_id', models.PositiveIntegerField()),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='admin_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='MedicalAdminProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_id', models.PositiveIntegerField()),
                ('work_schedule', models.JSONField(default=dict)),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='medical_admin_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
