from django.db import models
from django.core.validators import MinValueValidator
from users.models import User
from pilgrimage_info.models import PilgrimageSeasonInfo

class Wilaya(models.Model):
    name = models.CharField(max_length=100, unique=True)  
    eng_name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Wilaya"
        verbose_name_plural = "Wilayas"

    def __str__(self):
        return self.name

class Municipal(models.Model):
    name = models.CharField(max_length=100)  
    eng_name = models.CharField(max_length=100)
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
    wilaya = models.ForeignKey(Wilaya, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Hospital"
        verbose_name_plural = "Hospitals"

    def __str__(self):
        return self.name
    
    
    
class Seats(models.Model):
    season = models.ForeignKey(PilgrimageSeasonInfo, on_delete=models.CASCADE)
    wilaya = models.OneToOneField(Wilaya, on_delete=models.CASCADE)
    available_seats = models.PositiveIntegerField(validators=[MinValueValidator(0)])
    extra_seats = models.PositiveIntegerField(validators=[MinValueValidator(0)])