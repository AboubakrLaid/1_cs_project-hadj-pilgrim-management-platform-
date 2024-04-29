# Generated by Django 5.0.4 on 2024-04-29 02:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lottery', '0004_remove_participantstatusphase_status'),
        ('pilgrimage_info', '0004_alter_pilgrimageseasoninfo_year'),
    ]

    operations = [
        migrations.AddField(
            model_name='participantstatusphase',
            name='season',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='pilgrimage_info.pilgrimageseasoninfo'),
            preserve_default=False,
        ),
    ]