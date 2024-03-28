# Generated by Django 5.0.3 on 2024-03-27 16:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_management', '0004_remove_medicaladminprofile_contact_and_more'),
        ('municipal_wilaya', '0005_alter_municipal_eng_name_alter_municipal_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicaladminprofile',
            name='contact',
            field=models.CharField(default=''),
        ),
        migrations.AddField(
            model_name='medicaladminprofile',
            name='hospital',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='municipal_wilaya.hospital'),
        ),
        migrations.AddField(
            model_name='medicaladminprofile',
            name='state',
            field=models.CharField(default='', max_length=255),
        ),
    ]