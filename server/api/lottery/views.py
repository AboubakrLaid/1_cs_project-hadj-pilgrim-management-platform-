from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import (
    api_view, permission_classes
)
from roles.roles import IsCandidateUser, IsGeneralAdminUser
from .models import ParticipantStatusPhase
from .serializers import ParticipantStatusPhaseSerializer, LotteryAlgorithmSerializer
from pilgrimage_info.models import PilgrimageSeasonInfo
from .models import LotteryAlgorithm


@api_view(['POST'])
@permission_classes([IsCandidateUser])
def participate_in_lottery(request):
    data={'participant': request.user.id}
    serializer = ParticipantStatusPhaseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success' : True}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'GET'])
@permission_classes([IsGeneralAdminUser])
def lottery_algorithm(request):
    if request.method == 'GET':
        try:
            season = PilgrimageSeasonInfo.objects.get(is_active=True)
            algorithm = LotteryAlgorithm.objects.get(season=season)
            return Response({'algorithm': algorithm.algorithm}, status=status.HTTP_200_OK)
        except PilgrimageSeasonInfo.DoesNotExist:
            return Response({'msg': 'There is no active season'}, status=status.HTTP_200_OK)
        except LotteryAlgorithm.DoesNotExist:
            return Response({'msg': 'There is no algorithm for the active season'}, status=status.HTTP_200_OK)
        
    data = request.data
    serializer = LotteryAlgorithmSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)