from django.db import models
from users.models import User
from django.db.models import JSONField

#from django_extensions.db.fields import ListField

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

    treatments = JSONField(default=list)
    diseases = JSONField(default=list)

    files = models.FileField(upload_to='patient_files/', blank=True)
    medical_opinion = models.TextField(blank=False)
    is_healthy = models.BooleanField(default=True)
    is_sick = models.BooleanField(default=False)
    is_accepted = models.BooleanField(default=None, null=True, blank=True)
    def __str__(self):
        return f"Patient Health Review - User: {self.user.username}"
