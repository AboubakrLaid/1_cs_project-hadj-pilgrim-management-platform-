from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import (
    api_view, permission_classes
)
from roles.roles import IsCandidateUser
from .models import ParticipantStatusPhase
from .serializers import ParticipantStatusPhaseSerializer


@api_view(['POST'])
@permission_classes([IsCandidateUser])
def participate_in_lottery(request):
    data={'participant': request.user.id}
    serializer = ParticipantStatusPhaseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success' : True}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)