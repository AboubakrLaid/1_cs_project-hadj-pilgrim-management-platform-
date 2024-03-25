from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from roles.roles import IsCandidateUser, IsGeneralAdminUser
from .models import ParticipantStatusPhase
from .serializers import ParticipantStatusPhaseSerializer, LotteryAlgorithmSerializer
from pilgrimage_info.models import PilgrimageSeasonInfo
from .models import LotteryAlgorithm
from users.models import UserInscriptionHistory
from personal_profile.models import PersonalProfile
from django.utils.timezone import now
import time


@api_view(["POST"])
@permission_classes([IsCandidateUser])
def participate_in_lottery(request):
    data = {"participant": request.user.id}
    serializer = ParticipantStatusPhaseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





@api_view(["POST", "GET"])
@permission_classes([IsGeneralAdminUser])
def lottery_algorithm(request):
    if request.method == "GET":
        try:
            season = PilgrimageSeasonInfo.objects.get(is_active=True)
            algorithm = LotteryAlgorithm.objects.get(season=season)
            return Response(
                {"algorithm": algorithm.algorithm}, status=status.HTTP_200_OK
            )
        except PilgrimageSeasonInfo.DoesNotExist:
            return Response(
                {"msg": "There is no active season"}, status=status.HTTP_200_OK
            )
        except LotteryAlgorithm.DoesNotExist:
            return Response(
                {"msg": "There is no algorithm for the active season"},
                status=status.HTTP_200_OK,
            )

    data = request.data
    serializer = LotteryAlgorithmSerializer(data=data)
    if serializer.is_valid():
        season = PilgrimageSeasonInfo.objects.get(is_active=True)
        total_participants = ParticipantStatusPhase.objects.count()
        season.ratio = total_participants / season.total_pilgrims
        season.save()
        serializer.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def _in_pourcentage(value, total):
    return (value / total) * 100

@api_view(["GET"])
@permission_classes([IsGeneralAdminUser])
def statistics(_):
    # Get user ids from ParticipantStatusPhase
    participant_user_ids = ParticipantStatusPhase.objects.values_list(
        "participant_id", flat=True
    )
    total_participants = len(participant_user_ids)

    # Filter profiles based on participants and calculate age
    current_year = now().year
    profiles = PersonalProfile.objects.filter(user_id__in=participant_user_ids)

    # Calculate age in Python
    current_year = now().year
    ages = [current_year - profile.birth_date.year for profile in profiles]

    # Now, you can categorize ages as needed
    under_40 = _in_pourcentage(
        len([age for age in ages if age < 40]), total_participants
    )
    between_41_70 = _in_pourcentage(
        len([age for age in ages if 40 <= age <= 70]), total_participants
    )
    above_71 = _in_pourcentage(
        len([age for age in ages if age > 70]), total_participants
    )

    # Participation counts, filtered by participant user ids
    one_participation = _in_pourcentage(
        UserInscriptionHistory.objects.filter(
            user_id__in=participant_user_ids, inscription_count=1
        ).count(),
        total_participants,
    )
    two_participation = _in_pourcentage(
        UserInscriptionHistory.objects.filter(
            user_id__in=participant_user_ids, inscription_count=2
        ).count(),
        total_participants,
    )
    three_participation = _in_pourcentage(
        UserInscriptionHistory.objects.filter(
            user_id__in=participant_user_ids, inscription_count=3
        ).count(),
        total_participants,
    )
    four_participation = _in_pourcentage(
        UserInscriptionHistory.objects.filter(
            user_id__in=participant_user_ids, inscription_count=4
        ).count(),
        total_participants,
    )
    more_than_four = _in_pourcentage(
        UserInscriptionHistory.objects.filter(
            user_id__in=participant_user_ids, inscription_count__gt=4
        ).count(),
        total_participants,
    )

    return Response(
        {
            "total_participants": total_participants,
            "age_groups_pourcentages": {
                "under_40": under_40,
                "between_41_70": between_41_70,
                "above_71": above_71,
            },
            "participation_counts_pourcentages": {
                "one": one_participation,
                "two": two_participation,
                "three": three_participation,
                "four": four_participation,
                "more_than_four": more_than_four,
            },
        },
        status=status.HTTP_200_OK,
    )
