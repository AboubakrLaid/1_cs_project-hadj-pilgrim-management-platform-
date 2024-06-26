# Generated by Django 5.0.4 on 2024-05-10 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_management', '0003_disease_treatment_patienthealthreview'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patienthealthreview',
            name='diseases',
        ),
        migrations.RemoveField(
            model_name='patienthealthreview',
            name='treatments',
        ),
        migrations.DeleteModel(
            name='Disease',
        ),
        migrations.AddField(
            model_name='patienthealthreview',
            name='diseases',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.DeleteModel(
            name='Treatment',
        ),
        migrations.AddField(
            model_name='patienthealthreview',
            name='treatments',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
