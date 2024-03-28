from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MedicalAdminProfileSerializer
from rest_framework import status
from roles.roles import IsAdminUser
from users.models import User
from rest_framework.decorators import (api_view,permission_classes)
from .models import MedicalAdminProfile

from rest_framework import status
from roles.roles import IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from personal_profile.models import PersonalProfile, Companion
from personal_profile.serializers import PersonalProfileSerializer, CompanionSerializer
from roles.roles import IsAdminUser


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_medical_admin(request):
    serializer = MedicalAdminProfileSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'Medical admin added successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_medical_admin(request, pk):
    try:
        medical_admin = MedicalAdminProfile.objects.get(pk=pk)
    except MedicalAdminProfile.DoesNotExist:
        return Response({'error': 'Medical admin not found'}, status=status.HTTP_404_NOT_FOUND)

    medical_admin.delete()
    return Response({'success': True, 'message': 'Medical admin deleted successfully'}, status=status.HTTP_200_OK)


