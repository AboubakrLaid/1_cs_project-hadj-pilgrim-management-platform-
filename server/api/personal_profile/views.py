from rest_framework.response import Response

from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import PersonalProfileSerializer, CompanionSerializer
from .models import PersonalProfile, Companion
from municipal_wilaya.models import Wilaya, Municipal





# Create your views here.
@api_view(['POST', 'GET', 'PUT'])
@permission_classes([IsAuthenticated])
def personal_profile(request):
    if request.method == 'GET':
        user = request.user
        try:
            profile = user.personal_profile.first()
        except PersonalProfile.DoesNotExist:
            return Response({'success':False,'message' : 'profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            companion = user.companion.first()
            companion_data = CompanionSerializer(companion).data if companion is not None else None
        except Companion.DoesNotExist:
            pass
        
        data = PersonalProfileSerializer(profile).data
        data['companion'] = companion_data
        
        data['wilaya'] = Wilaya.objects.get(id=data['wilaya']).name
        data['municipal'] = Municipal.objects.get(id=data['municipal']).name
        
        return Response(data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = request.data
        user = request.user
        
        try:
            profile = PersonalProfile.objects.get(user=user)
            return Response({'success':False,'message' : 'this user have already a personal profile'}, status=status.HTTP_409_CONFLICT)
        except PersonalProfile.DoesNotExist:
            pass
        
        data['user'] = user.id
        
        if data.get('companion') is not None:
            data['companion']['user'] = user.id
            
        serializer = PersonalProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success' : True, 'message' : 'profile created'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    else: # PUT
        user = request.user
        data = request.data
        data['user'] = user.id
        
        try:
            profile = user.personal_profile
        except PersonalProfile.DoesNotExist:
            return Response({'success':False,'message' : 'profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PersonalProfileSerializer(profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success' : True, 'message' : 'profile updated'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_personal_profile(request):
    user = request.user
    data = request.data
    data['user'] = user.id
    try:
        profile = user.personal_profile.first()
    except PersonalProfile.DoesNotExist:
        return Response({'success':False,'message' : 'profile not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = PersonalProfileSerializer(profile, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'success' : True, 'message' : 'profile updated'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






