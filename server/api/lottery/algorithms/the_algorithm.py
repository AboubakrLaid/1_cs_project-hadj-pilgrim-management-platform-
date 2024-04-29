from pilgrimage_info.models import PilgrimageSeasonInfo
from users.models import User, UserStatus, UserInscriptionHistory
from personal_profile.models import PersonalProfile
from lottery.models import ParticipantStatusPhase
import random
from municipal_wilaya.models import Seats, Municipal
from .util import winner_data
from datetime import datetime
from django.db import models
from .util import winner_data


def _the_algorithm(municipal, wilaya):
    season = PilgrimageSeasonInfo.objects.get(is_active=True)
    winners = []
    extra_winners = []
    backup = []

    participants_ids = list(
        ParticipantStatusPhase.objects.filter(
            participant__personal_profile__municipal=municipal,
            participant__status__process=UserStatus.Process.LOTTERY,
        ).values_list("participant", flat=True)
    )
    participants_weighted_ids = []

    for participant in participants_ids:
        inscription_count = max(
            UserInscriptionHistory.objects.get(user=participant).inscription_count,
            1,
        )
        participants_weighted_ids.extend([participant] * inscription_count)

    # shuffle the participants
    random.shuffle(participants_weighted_ids)

    municipal_population = Municipal.objects.get(id=municipal).population
    wilaya_municpal_population = list(
        Municipal.objects.filter(wilaya=wilaya)
        .order_by("-population")
        .values_list("population", flat=True)
    )
    wilaya_population = sum(wilaya_municpal_population)

    wilaya_seats = Seats.objects.get(wilaya=wilaya, season=season)
    wilaya_extra_seats = wilaya_seats.extra_seats

    extra_seats_distribution = round_robin_distribution(
        wilaya_municpal_population, wilaya_extra_seats
    )
    seats = int(
        wilaya_seats.available_seats
        * 0.01
        * ((100 * municipal_population) / wilaya_population)
    )
    extra_seats = extra_seats_distribution[
        wilaya_municpal_population.index(municipal_population)
    ]
    backup_seats = int(seats * 0.1) + 1
    select_participants(
        winners,
        participants_ids,
        participants_weighted_ids,
        seats,
        status=UserStatus.Status.PENDING,
        process=UserStatus.Process.VISIT,
    )
    select_old_participants(
        extra_winners, participants_ids, participants_weighted_ids, extra_seats
    )
    select_participants(
        backup,
        participants_ids,
        participants_weighted_ids,
        backup_seats,
        status=UserStatus.Status.PENDING,
        process=UserStatus.Process.LOTTERY,
    )

    # print(f"winners: {winners}")

    return {
        "winners": winners,
        "extra_winners": extra_winners,
        "backup": backup,
    }


def select_participants(
    result_list, non_duplicate_ids_list, duplicate_ids_list, seats, process, status
):
    while non_duplicate_ids_list and seats > 0:
        winner = random.choice(duplicate_ids_list)
        non_duplicate_ids_list.remove(winner)
        while winner in duplicate_ids_list:
            duplicate_ids_list.remove(winner)

        participant = User.objects.get(id=winner)
        if participant.gender == "M" or seats > 1:
            seats -= 1 if participant.gender == "M" else 2
            participant_status = UserStatus.objects.get(user=winner)
            participant_status.process = process
            participant_status.status = status
            participant_status.save()
            result_list.append(winner_data(participant))

    return result_list


def select_old_participants(
    result_list, non_duplicate_ids_list, duplicate_ids_list, extra_seats
):
    participants = [
        (participant_id, calculate_age(birth_date))
        for participant_id, birth_date in PersonalProfile.objects.filter(
            user__in=non_duplicate_ids_list
        ).values_list("user_id", "birth_date")
    ]
    # < avg1 , >= avg1 < avg2 , >= avg2
    result = get_old_participants(participants)
    duplicate = [participant for participant  in duplicate_ids_list if participant in result]
    

    
    select_participants(
        result_list=result_list,
        duplicate_ids_list=duplicate,
        seats=extra_seats,
        non_duplicate_ids_list=result,
        status=UserStatus.Status.PENDING,
        process=UserStatus.Process.VISIT,
    )

    return result_list



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


def get_old_participants(participants):

    return [participant for participant, age in participants if age >=60]


def round_robin_distribution(municipal_population_list, extra_seats):
    length = len(municipal_population_list)
    distributed_seats = [0] * length
    print(municipal_population_list)
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
