from django.db import models
from django.core.validators import MinValueValidator
from users.models import User

class Wilaya(models.Model):
    name = models.CharField(max_length=20, unique=True)  
    eng_name = models.CharField(max_length=20, unique=True)

    class Meta:
        verbose_name = "Wilaya"
        verbose_name_plural = "Wilayas"

    def __str__(self):
        return self.name

class Municipal(models.Model):
    name = models.CharField(max_length=20)  
    eng_name = models.CharField(max_length=20)
    population = models.PositiveIntegerField(validators=[MinValueValidator(0)])
    wilaya = models.ForeignKey(Wilaya, on_delete=models.CASCADE, related_name='municipals')

    class Meta:
        verbose_name = "Municipal"
        verbose_name_plural = "Municipals"

    def __str__(self):
        return self.name
    

class Hospital(models.Model):
    name = models.CharField(max_length=150)
    eng_name = models.CharField(max_length=150)
    wilaya_id = models.ForeignKey(Wilaya, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Hospital"
        verbose_name_plural = "Hospitals"

    def __str__(self):
        return self.name