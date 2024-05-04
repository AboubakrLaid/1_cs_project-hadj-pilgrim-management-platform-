from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from roles.roles import  IsGeneralAdminUser
from .models import ParticipantStatusPhase
from .serializers import (
    LotteryAlgorithmSerializer,
    
)
from roles.roles import IsAdminUser
from users.models import User
from pilgrimage_info.models import PilgrimageSeasonInfo
from .models import LotteryAlgorithm
from users.models import UserInscriptionHistory
from personal_profile.models import PersonalProfile
from django.utils.timezone import now
from .algorithms.AR import _age_registrations_priority
from .algorithms.R import _registration_priority
from .algorithms.A import _age_category




# @api_view(["POST"])
# @permission_classes([IsCandidateUser])
# def participate_in_lottery(request):
#     data = {"participant": request.user.id}
#     serializer = ParticipantStatusPhaseSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"success": True}, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST", "GET"])
@permission_classes([IsGeneralAdminUser])
def lottery_algorithm(request):
    if request.method == "GET":
        try:
            season = PilgrimageSeasonInfo.objects.get(is_active=True)
            algorithm = LotteryAlgorithm.objects.get(season=season)
            serializer = LotteryAlgorithmSerializer(algorithm)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
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
        # total_participants = ParticipantStatusPhase.objects.count()
        # season.ratio = total_participants / season.total_pilgrims
        # season.save()
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
    under_30 = _in_pourcentage(
        len([age for age in ages if age <= 30]), total_participants
    )
    between_31_40 = _in_pourcentage(
        len([age for age in ages if 31 <= age <= 40]), total_participants
    )
    between_41_50 = _in_pourcentage(
        len([age for age in ages if 41 <= age <= 50]), total_participants
    )
    between_51_60 = _in_pourcentage(
        len([age for age in ages if 51 <= age <= 60]), total_participants
    )
    between_61_70 = _in_pourcentage(
        len([age for age in ages if 61 <= age <= 70]), total_participants
    )
    above_71 = _in_pourcentage(
        len([age for age in ages if age >= 71]), total_participants
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
                "under_30": under_30,
                "between_31_40": between_31_40,
                "between_41_50": between_41_50,
                "between_51_60": between_51_60,
                "between_61_70": between_61_70,
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


from django.http import StreamingHttpResponse


@api_view(["POST", "GET"])
@permission_classes([IsAdminUser])
def launch_lottery(request):
    data = request.data
    municipals = data.get("municipals")
    if municipals is None:
        return Response(
            {"msg": "Please provide the municipals"}, status=status.HTTP_400_BAD_REQUEST
        )
        
    else:
        if request.method == "GET":
            
            result = []
            response = {}
            response['total'] = 0
            
            
            participants_ids = list(
                ParticipantStatusPhase.objects.filter(
                    participant__personal_profile__municipal__in=municipals
                ).values_list("participant", flat=True)
            )
            
            # users will be like {id: user_object}
            users = User.objects.filter(id__in=participants_ids).in_bulk()
            
            # specify user_id as field_name to use it as the key in the dictionary
            users_inscription = UserInscriptionHistory.objects.filter(user__id__in=participants_ids).in_bulk(field_name='user_id')
            users_personal_profile = PersonalProfile.objects.filter(user__id__in=participants_ids).in_bulk(field_name='user_id')

            for user_id in participants_ids:
                user = users.get(user_id)
                profile = users_personal_profile.get(user_id)
                inscription = users_inscription.get(user_id)
                if user:
                    gender = user.gender
                    
                    result.append({
                        "nin": profile.nin if profile else None,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "gender": gender,
                        "inscription_count": inscription.inscription_count if inscription else 0,
                    })
                    
                    response['total'] = len(participants_ids)
                    response['participants'] = result
                    

                    
            return Response(response, status=status.HTTP_200_OK)
        
        
        # for the POST method
        algorithm = LotteryAlgorithm.objects.get(season__is_active=True)
        user = request.user
        wilaya = user.admin_profile.object_id
        algorithm_functions = {
            LotteryAlgorithm.Algorithms.AGE_CATEGORIES: _age_category,
            LotteryAlgorithm.Algorithms.AGE_REGISTRATION_PRIORITY: _age_registrations_priority,
            LotteryAlgorithm.Algorithms.REGISTRATION_PRIORITY: _registration_priority,
        }
        result = algorithm_functions[algorithm.algorithm](
            municipals, wilaya,algorithm
        )

        return Response(result, status=status.HTTP_200_OK)

    

    


from users.models import UserStatus


@api_view(["GET"])
def reset_lottery(_):
    UserStatus.objects.all().update(
        process=UserStatus.Process.LOTTERY.value,
        status=UserStatus.Status.REJECTED.value,
    )
    return Response({"success": True}, status=status.HTTP_200_OK)
