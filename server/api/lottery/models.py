from django.db import models
from users.models import (
    User, UserStatus
) 
from pilgrimage_info.models import (
    Phase, PilgrimageSeasonInfo
)


# Create your models here.
class ParticipantStatusPhase(models.Model):
    participant = models.ForeignKey(User, on_delete=models.CASCADE)
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE)
    season = models.ForeignKey(PilgrimageSeasonInfo, on_delete=models.CASCADE)
    # status = models.ForeignKey(UserStatus, on_delete=models.CASCADE)
    # cretaed_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('participant', 'phase')
        
        
class LotteryAlgorithm(models.Model):
    class Algorithms(models.TextChoices):
        RANDOM = 'RND', 'Random'
        WEIGHTED = 'WTD', 'Weighted'
        PRIORITY = 'PRT', 'Priority'
        HYBRID = 'HYB', 'Hybrid'
    season = models.OneToOneField(PilgrimageSeasonInfo, on_delete=models.CASCADE)
    algorithm = models.CharField(max_length=3, choices=Algorithms.choices)