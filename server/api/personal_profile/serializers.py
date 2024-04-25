from rest_framework import serializers
from .models import PersonalProfile, Companion
from users.models import UserStatus

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
        UserStatus.objects.create(user=personal_profile.user)
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
        
        

