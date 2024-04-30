from rest_framework.response import Response

from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from roles.roles import IsAdminUser
from rest_framework import status
from .serializers import PersonalProfileSerializer, CompanionSerializer
from .models import PersonalProfile, Companion
from municipal_wilaya.models import Wilaya, Municipal
from users.models import User, UserStatus, UserInscriptionHistory
from lottery.models import ParticipantStatusPhase
from pilgrimage_info.models import Phase
from datetime import datetime
from django.core.mail import send_mail
from api.settings import EMAIL_HOST_USER
from pilgrimage_info.models import PilgrimageSeasonInfo







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
        my_data = {key:value[0] for key,value in data.lists()}
        print(my_data)
        serializer = PersonalProfileSerializer(data=my_data)
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
        my_data = {key:value[0] for key,value in data.list()}
        serializer = PersonalProfileSerializer(profile, data=my_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success' : True, 'message' : 'profile updated'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def accept_or_refuse_candidate(request):
    data = request.data
    is_accepted = data.get('is_accepted')
    nin = data.get('nin')
    description = data.get('description', """
Congratulations! 
                           
You have been accepted to participate in the pilgrimage.
                           
Whish you a good luck!
""")
    
    try:
        user = User.objects.get(personal_profile__nin=nin)
    except User.DoesNotExist:
        return Response({'success': False, 'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
    season = PilgrimageSeasonInfo.objects.get(is_active=True)
    message = f"""
{description}
"""
    if not is_accepted:
        message += f"""\n
Review and Edit Your Pilgrimage Application Beffore {season.inscription_deadline}
"""
    send_mail(
            subject="Decision Ready: Learn the outcome of your application",
            message=message,
            from_email=EMAIL_HOST_USER,
            recipient_list=[user.email],
        )
    if is_accepted:
        inscription_count = data.get('inscription_count', 0)
        try:
            user_status = UserStatus.objects.get(user=user)
            user_status.status = UserStatus.Status.PENDING
            user_status.process = UserStatus.Process.LOTTERY
            user_status.save()

            user_inscription_hist = UserInscriptionHistory.objects.get(user=user)
            user_inscription_hist.inscription_count += int(inscription_count)
            user_inscription_hist.save()
            try:
                phase = Phase.objects.get(pilgrimage_season_info__is_active=True, phase_number=1)
            except Phase.DoesNotExist:
                return Response({'success': False, 'message': 'No active season found'}, status=status.HTTP_400_BAD_REQUEST)
            season = phase.pilgrimage_season_info
            ParticipantStatusPhase.objects.create(participant=user, phase=phase, season=season)
            
            return Response({'success': True, 'message': 'candidate accepted/refused'}, status=status.HTTP_200_OK)
        except UserStatus.DoesNotExist:
            # should not happen
            return Response({'success': False, 'msg' : 'went wrong'}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
        
        
    else:
        user_status = UserStatus.objects.get(user=user)
        user_status.status = UserStatus.Status.REJECTED
        user_status.process = UserStatus.Process.INSCRIPTION
        UserInscriptionHistory.objects.filter(user=user).delete()
        user_status.save()
        return Response({'success': True, 'message': 'candidate accepted/refused'}, status=status.HTTP_200_OK)
    
    
    
        
    
        







