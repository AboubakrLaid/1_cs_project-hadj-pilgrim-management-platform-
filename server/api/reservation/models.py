from django.db import models
from municipal_wilaya.models import Wilaya
from users.models import User




class Airport(models.Model):
    name = models.CharField(max_length=100)
    wilaya = models.OneToOneField(Wilaya, on_delete=models.SET_NULL, null=True, related_name='airport') 
    associated_wilayas = models.ManyToManyField(Wilaya, related_name='airports')
    
    
class Flight(models.Model):
    airport = models.ForeignKey(Airport, on_delete=models.CASCADE, null=True, related_name='flight')
    available_seats = models.IntegerField(default=0)
    date = models.DateTimeField()
    

class Hotel(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, null=True, related_name='hotel')
    name = models.CharField(max_length=255)
    
    
class Room(models.Model):
    class RoomType(models.TextChoices):
        FOR_FEMALES = "FF", "for females"
        FOR_MALES = "FM", "for males" 
        
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True, related_name='room')
    number = models.IntegerField()
    floor = models.IntegerField(default=0)
    type = models.CharField(max_length=2, choices=RoomType.choices)
    available_beds = models.IntegerField(default=0)

    
class Reservation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='reservation')
    rooms = models.ManyToManyField(Room, related_name='reservations')
    flight = models.OneToOneField(Flight, on_delete=models.CASCADE, null=True, related_name='passengers')
    
    
