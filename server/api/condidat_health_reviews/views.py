from rest_framework.response import Response
from rest_framework import status
from roles.roles import IsMedicalAdminUser
from users.models import User
from .serializers import PatientHealthReviewSerializer
from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
@permission_classes([IsMedicalAdminUser])
def add_patient_health_review(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()
    data['user'] = user.id  

    serializer = PatientHealthReviewSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'Patient health review added successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
