from pilgrimage_info.models import PilgrimageSeasonInfo
from users.models import User, UserStatus, UserInscriptionHistory
from personal_profile.models import PersonalProfile
from lottery.models import ParticipantStatusPhase
import random
from .util import winner_data
from datetime import datetime


def _hybrid(municipal_groups):
    season = PilgrimageSeasonInfo.objects.get(is_active=True)
    ratio = season.ratio
    winners = []
    backup = []
    # for the winners
    for group in municipal_groups:
        for _, municipals in group.items():

            participants_ids = list(
                ParticipantStatusPhase.objects.filter(
                    participant__personal_profile__municipal__in=municipals
                ).values_list("participant", flat=True)
            )
            participants = [
                (participant_id, calculate_age(birth_date))
                for participant_id, birth_date in PersonalProfile.objects.filter(
                    user__in=participants_ids
                ).values_list("user_id", "birth_date")
            ]
            # < avg1 , >= avg1 < avg2 , >= avg2
            result = categorise_participants_by_age(participants)
            participants_above_avg_2 = result["above_avg_2"]
            participants_between_avg_1_avg_2 = result["between_avg_1_avg_2"]
            participants_under_avg_1 = result["under_avg_1"]
            print(f"participants_above_avg_2: {participants_above_avg_2}")
            print(f"participants_between_avg_1_avg_2: {participants_between_avg_1_avg_2}")
            print(f"participants_under_avg_1: {participants_under_avg_1}")
            participants_grps = [
                participants_above_avg_2,
                 participants_between_avg_1_avg_2,
                 participants_under_avg_1,
            ]
            percentages = [0.5,0.3,0.2]
            total_seats = int(len(participants_ids) * ratio)+1
            print(f"total seats..........................: {total_seats}")
            # get the non winners
            # available_seats = 0
            left_seats = 0
            for participants,percentage in zip(participants_grps,percentages):
                available_seats = int(total_seats * percentage)
                available_seats += left_seats
                print(f"participants: {participants}, available_seats: {available_seats}, original seasts: {available_seats-left_seats}")
                
                participants_weighted_ids = []
                for participant in participants:
                    inscription_count = max(
                        UserInscriptionHistory.objects.get(
                            user=participant
                        ).inscription_count,
                        1,
                    )
                    participants_weighted_ids.extend([participant] * inscription_count)
                print(f"participants_weighted_ids: {participants_weighted_ids}")
                # shuffle the participants
                random.shuffle(participants_weighted_ids)
                
                winners_count = select_winners(
                    non_duplicate_list=participants,
                    participants_ids=participants_weighted_ids,
                    available_seats= available_seats,
                    process=UserStatus.Process.VISIT.value,
                    status=UserStatus.Status.PENDING.value,
                    result_list=winners,
                )
                left_seats = available_seats - winners_count
                print(f"non winners: {participants}, ..left seats: {left_seats}")

                # get the backup
                x = int(len(winners) * 0.1)
                backup_seats = (x if x>0 else 1)  # 100 winners , 10 backups
                print(f"backup seats: {backup_seats}")
                select_winners(
                    non_duplicate_list=participants,
                    participants_ids=participants_weighted_ids,
                    available_seats=backup_seats,
                    process=UserStatus.Process.LOTTERY.value,
                    status=UserStatus.Status.IN_RESERVE.value,
                    result_list=backup,
                    )
                print(f"rejected {participants}")

    result = {
        "winners": winners,
        "backup": backup,
    }
    return result


def select_winners(non_duplicate_list,participants_ids, available_seats, process, status, result_list):
    winners_count = 0
    non_duplicate_list_backup = []
    participants_ids_backup = []
    
    while participants_ids and available_seats > 0:
        count = 0
        winner = random.choice(participants_ids)
        while winner in participants_ids:
            count += 1
            participants_ids.remove(winner)
        non_duplicate_list.remove(winner)

        participant_status = UserStatus.objects.get(user=winner)

        # make sure the winner is not already a in the visit process
        if participant_status.process != UserStatus.Process.VISIT.value:
            participant = User.objects.get(id=winner)
            if participant.gender == "M" or (available_seats > 1):
                inscription_count = UserInscriptionHistory.objects.get(user = winner).inscription_count
                print(f"winner: {winner}, gender: {participant.gender}, inscription_count: {inscription_count}, participants: {non_duplicate_list}")
                available_seats -= 1 if participant.gender == "M" else 2
                winners_count += 1 if participant.gender == "M" else 2
                participant_status.process = process
                participant_status.status = status
                result_list.append(winner_data(participant))
                participant_status.save()
            elif available_seats==1 and participant.gender is "F":
                non_duplicate_list_backup.append(winner)
                for _ in range(count):
                    participants_ids_backup.append(winner)
                
    participants_ids.extend(participants_ids_backup)
    non_duplicate_list.extend(non_duplicate_list_backup)
    return winners_count


def calculate_age(birth_date):
    return (
        datetime.now().year
        - birth_date.year
        - (
            (datetime.now().month, datetime.now().day)
            < (birth_date.month, birth_date.day)
        )
    )


def calculate_average_age(ages):
    return int(sum(ages) / len(ages))


def categorise_participants_by_age(participants):

    if not participants:
        return {"under_avg_1": [], "above_avg_2": [], "between_avg_1_avg_2": []}

    avg_1 = calculate_average_age([age for _, age in participants])

    participants_above_avg_1 = [
        (participant, age) for participant, age in participants if age >= avg_1
    ]
    if not participants_above_avg_1:
        return {
            "under_avg_1": [participant for participant, age in participants],
            "above_avg_2": [],
            "between_avg_1_avg_2": [],
        }
    avg_2 = calculate_average_age(
        [age for _, age in participants_above_avg_1 if age >= avg_1]
    )
    return {
        "under_avg_1": [
            participant for participant, age in participants if age < avg_1
        ],
        "above_avg_2": [
            participant for participant, age in participants if age >= avg_2
        ],
        "between_avg_1_avg_2": [
            participant for participant, age in participants if avg_1 <= age < avg_2
        ],
    }
