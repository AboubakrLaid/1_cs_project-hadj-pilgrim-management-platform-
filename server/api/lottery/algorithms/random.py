from pilgrimage_info.models import PilgrimageSeasonInfo
from users.models import User, UserStatus
from users.serializers import UserSerializer, UserStatusSerializer
from personal_profile.serializers import PersonalProfileSerializer
from personal_profile.models import PersonalProfile
from lottery.models import ParticipantStatusPhase
import random
from .util import winner_data


def _random(municipal_groups):
    season = PilgrimageSeasonInfo.objects.get(is_active=True)
    ratio = season.ratio
    winners = []
    backup = []
    all_non_winners = []
    winners_count = 0
    for group in municipal_groups:
        for grp, municipals in group.items():
            print(grp)
            
            participants_ids = list(ParticipantStatusPhase.objects.filter(
                participant__personal_profile__municipal__in=municipals
            ).values_list("participant", flat=True))
            print(participants_ids)
            available_seats = int(len(participants_ids) * ratio) + 1
            winners_count += available_seats
            
            
            while  participants_ids and available_seats > 0:
                winner = random.choice(participants_ids)
                participants_ids.remove(winner)
                participant_status = UserStatus.objects.get(user=winner)
                
                # make sure the winner is not already a in the visit process
                if participant_status.process != UserStatus.Process.VISIT.value:
                    participant = User.objects.get(id=winner)
                    is_in_backup = False
                    if participant.gender == "M" or (available_seats > 1):
                        available_seats -= 1 if participant.gender == 'M' else 2
                        participant_status.process = UserStatus.Process.VISIT.value
                        participant_status.status = UserStatus.Status.PENDING.value
                        winners.append(winner_data(participant))
                        participant_status.save()
                    
            print("participants_ids", participants_ids)
            # TODO manage the backup list
    result = {
        "winners":winners,
        "backup" : backup,
    }
    return  result
