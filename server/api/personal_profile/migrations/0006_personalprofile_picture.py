# Generated by Django 5.0.3 on 2024-04-27 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('personal_profile', '0005_companion_address_personalprofile_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='personalprofile',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='pictures/'),
        ),
    ]
