from django.db import models
from users.models import User


class Payment(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='payment')
    is_paid = models.BooleanField(default=False)
    payment_code = models.CharField(max_length=15)
    file = models.FileField(upload_to='payment_files/')    
