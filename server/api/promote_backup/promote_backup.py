from pilgrimage_info.models import Phase
from users.models import UserStatus, User
from django.db.models import Q
import random
from api.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from pilgrimage_info.models import Phase
from lottery.models import ParticipantStatusPhase


def promote_backup(user):
    # promotion priority : from the same municipal, from the same wilaya, from the whole country
    winners = get_in_reserve_users(user)
    phases_id = list(Phase.objects.filter(pilgrimage_season_info__is_active=True).values_list("id", flat=True))
    try:
        user_phase = ParticipantStatusPhase.objects.filter(user=user).first().phase.id
        # check if the the user is not in the last phase
        if user_phase != phases_id[-1]:
            
            if winners:
                for winner in winners:
                    UserStatus.objects.filter(user=winner).update(
                        status=UserStatus.Status.PENDING,
                        process=UserStatus.Process.PAYMENT,
                    )
                    # give this user the next phase
                    try:
                        x = ParticipantStatusPhase.objects.filter(user=winner)
                        x.phase = Phase.objects.get(pk=user_phase+1)
                    except ParticipantStatusPhase.DoesNotExist:
                        pass
                    send_mail(
                        "Pilgrimage",
                        "You have been promoted to the pilgrimage",
                        EMAIL_HOST_USER,
                        [winner.email],
                        fail_silently=False,
                    )
    except:
        user_phase = None
        

    


def get_in_reserve_users(user):
    municipal = user.personal_profile.municipal
    wilaya = user.personal_profile.wilaya
    availabale_seat = 1 if user.gender == "M" else 2

    users_ids = list(
        UserStatus.objects.filter(status=UserStatus.Status.IN_RESERVE)
        .filter(
            Q(user__personal_profile__municipal=municipal)
            | Q(user__personal_profile__wilaya=wilaya)
        )
        .values_list("user", flat=True)
    )
    if not users_ids:
        return None
    
    winners = []
    while availabale_seat > 0:
        winner = random.choice(users_ids)
        users_ids.remove(winner)
        userr = User.objects.get(pk=winner)
        user_members = 1 if userr.gender == "M" else 2
        if user_members <= availabale_seat:
            winners.append(userr)
            availabale_seat -= user_members
    return winners
            
    
