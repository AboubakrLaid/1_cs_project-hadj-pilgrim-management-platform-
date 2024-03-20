from django.db import models
from users.models import (
    User, UserStatus
) 
from pilgrimage_info.models import (
    Phase
)

# Create your models here.
class ParticipantStatusPhase(models.Model):
    participant = models.ForeignKey(User, on_delete=models.CASCADE)
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE)
    status = models.ForeignKey(UserStatus, on_delete=models.CASCADE)
    # cretaed_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('participant', 'phase')