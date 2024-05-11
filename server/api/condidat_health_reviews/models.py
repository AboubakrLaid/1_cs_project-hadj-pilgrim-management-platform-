from django.db import models
from users.models import User
from django.contrib.postgres.fields import ArrayField

class PatientHealthReview(models.Model):
    BLOOD_TYPE_CHOICES = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='health_reviews')
    blood_type = models.CharField(max_length=3, choices=BLOOD_TYPE_CHOICES, blank=False)

    treatments = ArrayField(models.CharField(max_length=255), default=list, blank=True)
    diseases = ArrayField(models.CharField(max_length=255), default=list, blank=True)

    files = models.FileField(upload_to='patient_files/', blank=True)
    medical_opinion = models.TextField(blank=False)
    is_healthy = models.BooleanField(default=True)
    is_sick = models.BooleanField(default=False)
    is_accepted = models.BooleanField(default=None, null=True, blank=True)
    def __str__(self):
        return f"Patient Health Review - User: {self.user.username}"
