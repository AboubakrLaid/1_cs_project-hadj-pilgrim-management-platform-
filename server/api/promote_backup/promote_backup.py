from pilgrimage_info.models import Phase
from users.models import UserStatus, User
from django.db.models import Q
import random
from api.settings import EMAIL_HOST_USER
from django.core.mail import send_mail


def promote_backup(user):
    # promotion priority : from the same municipal, from the same wilaya, from the whole country
    winners = get_in_reserve_users(user)
    if winners:
        for winner in winners:
            UserStatus.objects.filter(user=winner).update(
                status=UserStatus.Status.PENDING,
                process=UserStatus.Process.PAYMENT,
            )
            send_mail(
                "Pilgrimage",
                "You have been promoted to the pilgrimage",
                EMAIL_HOST_USER,
                [winner.email],
                fail_silently=False,
            )
        

    


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
            
    
