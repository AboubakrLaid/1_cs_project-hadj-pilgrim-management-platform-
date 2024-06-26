# Generated by Django 5.0.3 on 2024-04-24 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_alter_userinscriptionhistory_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userstatus',
            name='process',
            field=models.CharField(choices=[('I', 'inscription'), ('L', 'lottery'), ('V', 'visit'), ('P', 'payment'), ('R', 'reservation')], default='I', max_length=1),
        ),
        migrations.AlterField(
            model_name='userstatus',
            name='status',
            field=models.CharField(choices=[('P', 'pending'), ('R', 'rejected'), ('C', 'confirmed'), ('I', 'in reserve')], default='P', max_length=1),
        ),
    ]
