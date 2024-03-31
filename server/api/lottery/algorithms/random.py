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
    non_winners = []
    winners_count = 0
    # for the winners
    for group in municipal_groups:
        for _, municipals in group.items():

            participants_ids = list(
                ParticipantStatusPhase.objects.filter(
                    participant__personal_profile__municipal__in=municipals
                ).values_list("participant", flat=True)
            )
            
            # get the non winners
            select_winners(
                participants_ids,
                ratio,
                UserStatus.Process.VISIT.value,
                UserStatus.Status.PENDING.value,
                winners,
            )
            
            # get the backup
            winners_count = len(winners)
            backup_ratio = winners_count * 0.1  # 100 winners , 10 backups
            select_winners(
                participants_ids,
                backup_ratio,
                UserStatus.Process.LOTTERY.value,
                UserStatus.Status.IN_RESERVE.value,
                backup,
            )

    result = {
        "winners": winners,
        "backup": backup,
    }
    return result


def select_winners(participants_ids, ratio, process, status, result_list):
    available_seats = int(len(participants_ids) * ratio) + 1
    backup = []
    print(f"available seats: {available_seats}")
    while participants_ids and available_seats > 0:
        winner = random.choice(participants_ids)
        participants_ids.remove(winner)
        participant_status = UserStatus.objects.get(user=winner)

        # make sure the winner is not already a in the visit process
        if participant_status.process != UserStatus.Process.VISIT.value:
            participant = User.objects.get(id=winner)
            if participant.gender == "M" or (available_seats > 1):
                available_seats -= 1 if participant.gender == "M" else 2
                participant_status.process = process
                participant_status.status = status
                result_list.append(winner_data(participant))
                participant_status.save()
            elif available_seats==1 and participant.gender is "F":
                backup.append(winner)
                
    participants_ids.extend(backup)
    return result_list
