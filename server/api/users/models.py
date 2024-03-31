from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


class User(AbstractUser):
    GENDER_CHOICES = [
        ('M', 'male'),
        ('F', 'female'),
    ]
    
    IS_ADMIN = "Admin"
    IS_GENERAL_ADMIN = "GeneralAdmin"
    IS_CANDIDATE = "Candidate"
    IS_MEDICAL_ADMIN = "MedicalAdmin"
    IS_GUIDE = "Guide"
    
    ROLE_CHOICES = [
        (IS_ADMIN, 'admin'),
        (IS_GENERAL_ADMIN, 'general_admin'),
        (IS_CANDIDATE, 'candidate'),
        (IS_MEDICAL_ADMIN, 'medical_admin'),
        (IS_GUIDE, 'guide'),
    ]
    
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default=IS_CANDIDATE)
 
 
class UserInscriptionHistory(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='inscription_history')
    inscription_count = models.IntegerField(default=0) #! -1 for pilgrim
    latest_inscription_year = models.IntegerField(null=True, blank=True)


class UserStatus(models.Model):
    class Status(models.TextChoices):
        PENDING = 'P', 'pending'
        REJECTED = 'R', 'rejected'
        CONFIRMED = 'C', 'confirmed'
        IN_RESERVE = 'I', 'in reserve'
   
    class Process(models.TextChoices):
        LOTTERY = 'L', 'lottery'
        VISIT = 'V', 'visit'
        PAYMENT = 'P', 'payment'
        RESERVATION = 'R', 'reservation'
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='status')
    process = models.CharField(max_length=1,choices=Process.choices, default=Process.LOTTERY.value)
    status = models.CharField(max_length=1, choices=Status.choices, default=Status.REJECTED.value)
    

    

class UserVerificationCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='verification_code')
    code = models.CharField(max_length=6, null=False, blank=False)
    


# if the user have an instance here 
# then his email is not verified
class UserEmailVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='email_verification')
    code = models.CharField(max_length=6, null=False, blank=False)
