from pilgrimage_info.models import PilgrimageSeasonInfo
from users.models import User, UserStatus
from personal_profile.models import PersonalProfile
from lottery.models import ParticipantStatusPhase
import random
from .util import winner_data
from datetime import datetime
from municipal_wilaya.models import Municipal, Seats, Wilaya
from .util import winner_data
from users.models import UserInscriptionHistory


def _age_registrations_priority(municipals, wilaya, algorithm, used_seats):
    season = PilgrimageSeasonInfo.objects.get(is_active=True)
    extra_seats = Seats.objects.get(wilaya=wilaya, season=season).extra_seats
    winners = []
    backup = []
    # for the winners

    participants_ids = list(
        ParticipantStatusPhase.objects.filter(
            participant__personal_profile__municipal__in=municipals,
            participant__status__status=UserStatus.Status.PENDING.value,
            participant__status__process=UserStatus.Process.LOTTERY.value,
        ).values_list("participant", flat=True)
    )
    participants = [
        (participant_id, calculate_age(birth_date))
        for participant_id, birth_date in PersonalProfile.objects.filter(
            user__in=participants_ids
        ).values_list("user_id", "birth_date")
    ]

    # categorise the participants by age
    participants_grps = [
        participants_ids,
        [
            participant
            for participant, age in participants
            if age >= algorithm.values["threshold"]
        ],
    ]

    percentages = [1 - algorithm.values["percentage"], algorithm.values["percentage"]]

    # Calculating the total number of seats
    municipals_population = sum(
        list(
            Municipal.objects.filter(id__in=municipals).values_list(
                "population", flat=True
            )
        )
    )
    wilaya_population = sum(
        list(
            Municipal.objects.filter(wilaya=wilaya).values_list("population", flat=True)
        )
    )

    wilaya_seats = Seats.objects.get(wilaya=wilaya, season=season)

    seats = int(
        wilaya_seats.available_seats
        * 0.01
        * ((100 * municipals_population) / wilaya_population)
    )
    
    seats += used_seats

    # starting from the last category
    # givimg it extra seats
    available_seats = round(
        extra_seats * 0.01 * ((100 * municipals_population) / wilaya_population)
    )
    print(f"seats: {seats}")
    for i in range(1, -1, -1):
        participants_weighted_ids = []
        for participant in participants_grps[i]:
            inscription_count = max(
                UserInscriptionHistory.objects.get(user=participant).inscription_count,
                1,
            )
            participants_weighted_ids.extend([participant] * inscription_count)
        # shuffle the participants
        random.shuffle(participants_weighted_ids)

        available_seats += round(seats * percentages[i])
        print(f"available_seats: {available_seats}")

        select_winners(
            participants_ids=participants_weighted_ids,
            non_duplicate_list=participants_grps[i],
            seats=available_seats,
            process=UserStatus.Process.VISIT.value,
            status=UserStatus.Status.PENDING.value,
            result_list=winners,
        )

        backup_seats = round(available_seats * 0.5)
        # initialize the available seats

        available_seats = 0

        print(f"backup_seats: {backup_seats}")
        select_winners(
            participants_ids=participants_weighted_ids,
            non_duplicate_list=participants_grps[i],
            seats=backup_seats,
            process=UserStatus.Process.LOTTERY.value,
            status=UserStatus.Status.IN_RESERVE.value,
            result_list=backup,
        )

        try:
            UserStatus.objects.filter(user__in=participants_grps[i]).update(status=UserStatus.Status.REJECTED.value)
        except Exception as e:
            print(f"Error updating UserStatus: {e}")

    
    result = {
        "total_winners": seats,
        "winners": winners,
        "backup": backup,
    }
    return result


def select_winners(
    non_duplicate_list, participants_ids, seats, process, status, result_list
):
    while participants_ids and seats > 0:
        winner = random.choice(participants_ids)

        participant_status = UserStatus.objects.get(user=winner)

        # make sure the winner is not already a in the visit process
        if participant_status.process != UserStatus.Process.VISIT.value:
            participant = User.objects.get(id=winner)
            if participant.gender == "M" or (seats > 1):
                seats -= 1 if participant.gender == "M" else 2
                participant_status.process = process
                participant_status.status = status
                result_list.append(winner_data(participant))
                participant_status.save()
                non_duplicate_list.remove(winner)
                while winner in participants_ids:
                    participants_ids.remove(winner)

    return seats


def calculate_age(birth_date):
    return (
        datetime.now().year
        - birth_date.year
        - (
            (datetime.now().month, datetime.now().day)
            < (birth_date.month, birth_date.day)
        )
    )


def round_robin_distribution(municipal_population_list, extra_seats):
    length = len(municipal_population_list)
    distributed_seats = [0] * length
    i = 0
    while extra_seats > 0:
        j = 1
        while i < length and extra_seats > (
            len(municipal_population_list[i + 1 :]) * j
        ):

            distributed_seats[i] += 1
            extra_seats -= 1
            j += 1
        i += 1

    distributed_seats.reverse()
    return distributed_seats
