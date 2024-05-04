from django.db import models
from users.models import User, UserStatus
from pilgrimage_info.models import Phase, PilgrimageSeasonInfo


# Create your models here.
class ParticipantStatusPhase(models.Model):
    participant = models.ForeignKey(User, on_delete=models.CASCADE)
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE)
    season = models.ForeignKey(PilgrimageSeasonInfo, on_delete=models.CASCADE)
    # status = models.ForeignKey(UserStatus, on_delete=models.CASCADE)
    # cretaed_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("participant", "phase")


class LotteryAlgorithm(models.Model):
    class Algorithms(models.TextChoices):
        AGE_REGISTRATION_PRIORITY = "AR", "Random"
        AGE_CATEGORIES = "A", "Age"
        REGISTRATION_PRIORITY = "R", "Registration"

    season = models.OneToOneField(PilgrimageSeasonInfo, on_delete=models.CASCADE)
    algorithm = models.CharField(max_length=2, choices=Algorithms.choices)
    values = models.JSONField(null=True, blank=True)
    """
    values would be:
    For R : null
    For A : {
        "categories":[
            {"min": 0, "max":30, "pourcentage": 0.5},
            {"min": 0, "max":30, "pourcentage": 0.5},
            {"min": 0, "max":30, "pourcentage": 0.5}
        ]
    }
    For AR : {
        "treshold": 70,
        "pourcentage": 0.5
    }
    """
