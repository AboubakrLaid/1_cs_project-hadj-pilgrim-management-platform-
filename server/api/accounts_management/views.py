from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MedicalAdminProfileSerializer

@api_view(['POST'])
def add_medical_admin(request):
    serializer = MedicalAdminProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response({'error': 'Failed to add medical admin', 'details': serializer.errors}, status=400)
