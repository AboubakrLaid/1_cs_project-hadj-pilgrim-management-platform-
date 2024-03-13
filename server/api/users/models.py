from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


class User(AbstractUser):
    GENDER_CHOICES = [
        ('M', 'male'),
        ('F', 'female'),
    ]
    
    IS_ADMIN = "Admin"
    IS_CANDIDATE = "Candidate"
    IS_MEDICAL_ADMIN = "MedicalAdmin"
    IS_GUIDE = "Guide"
    
    ROLE_CHOICES = [
        (IS_ADMIN, 'admin'),
        (IS_CANDIDATE, 'candidate'),
        (IS_MEDICAL_ADMIN, 'medical_admin'),
        (IS_GUIDE, 'guide'),
    ]
    
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES,null=False, blank=False, default='M')
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default=IS_CANDIDATE)
 
 
class UserInscriptionHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inscription_history')
    inscription_count = models.IntegerField(default=0) #! -1 for pilgrim
    latest_inscription_year = models.IntegerField(null=True, blank=True)


class UserStatus(models.Model):
    PHASES_CHOICES = [
        (1, 'won the lottery'),
        (2, 'accepted in medical visit'),
        (3, 'successful fees payment'),
        (4, 'reservation phase')
    ]
    STATUS_CHOICES = [
        (' ', 'candidate did not yet finish the phase'),
        ('P', 'pending (for backup list)'),
        ('R', 'rejected'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='status')
    phase = models.IntegerField(choices=PHASES_CHOICES, default=1)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=' ')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    

class UserVerificationCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='verification_code')
    code = models.CharField(max_length=6, null=False, blank=False)
    


# if the user have an instance here 
# then his email is not verified
class UserEmailVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='email_verification')
    code = models.CharField(max_length=6, null=False, blank=False)