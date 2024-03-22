from rest_framework import serializers
from .models import ParticipantStatusPhase, LotteryAlgorithm
from users.models import UserInscriptionHistory,UserStatus
from users.serializers import UserStatusSerializer
from pilgrimage_info.models import Phase
from django.db import transaction
from datetime import datetime
from pilgrimage_info.models import PilgrimageSeasonInfo

class ParticipantStatusPhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParticipantStatusPhase
        fields = ['participant']
        
        
    def create(self, validated_data):
        with transaction.atomic():
            user = validated_data['participant']
            phase = Phase.objects.get(phase_number=1)
             
            status_serializer = UserStatusSerializer(data={'user': user.id})
            if status_serializer.is_valid(raise_exception=True):
                status = status_serializer.save()
            
            validated_data['phase'] = phase
            validated_data['status'] = status
            
            # user participate to the lottery
            participant_status_phase = super().create(validated_data)
            
            
            user_inscription_history  = UserInscriptionHistory.objects.create(user=user)
            user_inscription_history.inscription_count += 1
            user_inscription_history.latest_inscription_year = datetime.now().year
            user_inscription_history.save()
            
            return participant_status_phase
        
    
        
class LotteryAlgorithmSerializer(serializers.ModelSerializer):
    class Meta:
        model = LotteryAlgorithm
        fields = ['algorithm']
        
    def create(self, validated_data):
        try:
            season = PilgrimageSeasonInfo.objects.get(is_active=True)
            validated_data['season'] = season
            
            return super().create(validated_data)
        except PilgrimageSeasonInfo.DoesNotExist:
            raise serializers.ValidationError({'error':'There is no active season'})
        