from django.db import models
from users.models import User

class Wilaya(models.Model):
    pass
class Municipal(models.Model):
    pass


# Create your models here.
class PersonalProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='personal_profile')
    nin = models.CharField(max_length=18, unique=True)
    birth_date = models.DateField()
    phone_number = models.CharField(max_length=10, unique=True)
    municipal = models.ForeignKey('Municipal', on_delete=models.SET_NULL, related_name='persons', null=True)
    wilaya = models.ForeignKey('Wilaya', on_delete=models.SET_NULL, related_name='persoons',null=True)
    
    
class Companion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='companion')
    nin = models.CharField(max_length=18)
    birth_date = models.DateField()
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    