from pilgrimage_info.models import PilgrimageSeasonInfo
from users.models import User, UserStatus
from personal_profile.models import PersonalProfile
from lottery.models import ParticipantStatusPhase
import random
from .util import winner_data
from datetime import datetime
from municipal_wilaya.models import Municipal, Seats
from .util import winner_data
from users.models import UserInscriptionHistory


def _age_category(municipals, wilaya, algorithm):
    season = PilgrimageSeasonInfo.objects.get(is_active=True)
    winners = []
    backup = []
    # for the winners

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
    
    # categorise the participants by age
    result = categorise_participants_by_age(participants, algorithm)
    participants_grps = [
        result["category_1"],
        result["category_2"],
        result["category_3"],
    ]
    
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
    
    
    # starting from the last category
    # cuz it has the heighest percentage
    # so the possibility of having empty seats is more
    available_seats = 0
    print(f"seats: {seats}")
    for i in range(2, -1, -1):
        participants_weighted_ids = []
        for participant in participants_grps[i]:
            inscription_count = max(
                UserInscriptionHistory.objects.get(
                    user=participant
                ).inscription_count,
                1,
            )
            participants_weighted_ids.extend([participant] * inscription_count)
        # shuffle the participants
        random.shuffle(participants_weighted_ids)
        
        available_seats = round(seats * algorithm.values["categories"][i]["percentage"])
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
        select_winners(
            participants_ids=participants_weighted_ids,
            non_duplicate_list=participants_grps[i],
            seats=backup_seats,
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


def categorise_participants_by_age(participants, algorithm):
    category = algorithm.values["categories"]
    paticipant_category_1 = [
        participant
        for participant, age in participants
        if age >= category[0]["min"]
        and age <= category[0]["max"]
    ]
    paticipant_category_2 = [
        participant
        for participant, age in participants
        if age >= category[1]["min"]
        and age <= category[1]["max"]
    ]
    paticipant_category_3 = [
        participant
        for participant, age in participants
        if age >= category[2]["min"]
        and age <= category[2]["max"]
    ]

    return {
        "category_1": paticipant_category_1,
        "category_2": paticipant_category_2,
        "category_3": paticipant_category_3,
    }