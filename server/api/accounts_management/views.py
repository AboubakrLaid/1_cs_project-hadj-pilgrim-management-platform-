from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MedicalAdminProfileSerializer
from rest_framework import status
from roles.roles import IsAdminUser
from users.models import User
from rest_framework.decorators import (api_view,permission_classes)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_medical_admin(request):
    serializer = MedicalAdminProfileSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'Medical admin added successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
