# Generated by Django 5.0.6 on 2024-05-14 20:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('municipal_wilaya', '0008_municipal_is_lottery_done'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Airport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('associated_wilayas', models.ManyToManyField(related_name='airports', to='municipal_wilaya.wilaya')),
                ('wilaya', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='airport', to='municipal_wilaya.wilaya')),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('available_seats', models.IntegerField(default=0)),
                ('date', models.DateTimeField()),
                ('airport', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='flight', to='reservation.airport')),
            ],
        ),
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('flight', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hotel', to='reservation.flight')),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('floor', models.IntegerField(default=0)),
                ('type', models.CharField(choices=[('FF', 'for females'), ('FM', 'for males')], max_length=2)),
                ('available_beds', models.IntegerField(default=0)),
                ('hotel', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='room', to='reservation.hotel')),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flight', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='passengers', to='reservation.flight')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reservation', to=settings.AUTH_USER_MODEL)),
                ('room', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='persons', to='reservation.room')),
            ],
        ),
    ]
