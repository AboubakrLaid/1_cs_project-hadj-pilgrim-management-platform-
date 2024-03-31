from pilgrimage_info.models import PilgrimageSeasonInfo
from users.models import User, UserStatus, UserInscriptionHistory

from lottery.models import ParticipantStatusPhase
import random
from .util import winner_data


def _weighted(municipal_groups):
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
            participants_weighted_ids = []
            for participant in participants_ids:
                inscription_count = max(
                    UserInscriptionHistory.objects.get(
                        user=participant
                    ).inscription_count,
                    1,
                )
                participants_weighted_ids.extend([participant] * inscription_count)
            
            # shuffle the participants
            random.shuffle(participants_weighted_ids)
            # get the non winners
            select_winners(
                non_duplicate_list=participants_ids,
                participants_ids=participants_weighted_ids,
                ratio=ratio,
                process=UserStatus.Process.VISIT.value,
                status=UserStatus.Status.PENDING.value,
                result_list=winners,
            )
            
            

            # get the backup
            winners_count = len(winners)
            backup_ratio = winners_count * 0.1  # 100 winners , 10 backups
            select_winners(
                non_duplicate_list=participants_ids,
                participants_ids=participants_weighted_ids,
                ratio=backup_ratio,
                process=UserStatus.Process.LOTTERY.value,
                status=UserStatus.Status.IN_RESERVE.value,
                result_list=backup,
            )

    result = {
        "winners": winners,
        "backup": backup,
    }
    return result


def select_winners(
    non_duplicate_list, participants_ids, ratio, process, status, result_list
):
    backup = []
    available_seats = int(len(non_duplicate_list) * ratio) + 1
    while participants_ids and available_seats > 0:
        winner = random.choice(participants_ids)
        non_duplicate_list.remove(winner)
        while winner in participants_ids:
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
            
    return result_list
