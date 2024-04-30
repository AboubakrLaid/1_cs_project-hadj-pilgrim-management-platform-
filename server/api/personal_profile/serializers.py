from rest_framework import serializers
from .models import PersonalProfile, Companion
from users.models import UserStatus
from users.models import UserInscriptionHistory
from datetime import datetime


class CompanionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companion
        fields = '__all__'
        extra_kwargs = {
            'user': {'write_only': True},
        }
        
        
class PersonalProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalProfile
        fields = '__all__'
        extra_kwargs = {
            'user': {'write_only': True}
        }
    companion = CompanionSerializer(required=False)
    
    def create(self, validated_data):
        
        companion_data = validated_data.pop('companion', None)
        personal_profile = PersonalProfile.objects.create(**validated_data)
        
        if companion_data is not None:
            Companion.objects.create(**companion_data)
        user = validated_data["user"]
        user_inscription_history = UserInscriptionHistory.objects.create(user=user)
        user_inscription_history.inscription_count += 1
        user_inscription_history.latest_inscription_year = datetime.now().year
        user_inscription_history.save()
        return personal_profile
    
    def update(self, instance, validated_data):
        companion_data = validated_data.pop('companion', None)
        
        instance = super().update(instance, validated_data)
        
        if companion_data is not None:
            companion = instance.user.companion

            
            companion_serializer = CompanionSerializer(companion, data=companion_data, partial=True)
            if companion_serializer.is_valid(raise_exception=True):
                companion_serializer.save()
        UserStatus.objects.update(user=instance.user, status='P', process='I')
        
        return instance
        
        
