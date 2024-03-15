from django.db import models


class PilgrimageSeasonInfo(models.Model):
    is_active = models.BooleanField(default=True)
    year = models.PositiveIntegerField(default=0)
    ratio = models.FloatField(default=0.0)
    total_pilgrims = models.PositiveIntegerField(default=0)
    inscription_deadline = models.DateField()
    procedure_deadline = models.DateField()
    
    
class Phase(models.Model):
    pilgrimage_season_info = models.ForeignKey(PilgrimageSeasonInfo, on_delete=models.CASCADE, related_name='phases')
    phase_number = models.PositiveIntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    
