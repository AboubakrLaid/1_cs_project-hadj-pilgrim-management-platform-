from django.db import models
from users.models import User
from municipal_wilaya.models import Wilaya, Municipal





class PersonalProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='personal_profile')
    nin = models.CharField(max_length=18, unique=True)
    passport_number = models.CharField(max_length=9, unique=True, blank=True, null=True)
    passport_expiration_date = models.DateField( blank=True, null=True)
    birth_certificate_number = models.CharField(max_length=5, unique=True, blank=True, null=True)
    files = models.FileField(upload_to='files/', blank=True, null=True)
    picture = models.ImageField(upload_to='pictures/', blank=True, null=True)
    address = models.CharField(max_length=180)
    birth_date = models.DateField()
    phone_number = models.CharField(max_length=10, unique=True)
    municipal = models.ForeignKey(Municipal, on_delete=models.SET_NULL, related_name='persons', null=True)
    wilaya = models.ForeignKey(Wilaya, on_delete=models.SET_NULL, related_name='persons', null=True)
    
    
class Companion(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='companion')
    nin = models.CharField(max_length=18)
    passport_number = models.CharField(max_length=9, blank=True, null=True)
    passport_expiration_date = models.DateField(blank=True, null=True)
    birth_certificate_number = models.CharField(max_length=5, blank=True, null=True)
    address = models.CharField(max_length=180)
    birth_date = models.DateField()
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)



