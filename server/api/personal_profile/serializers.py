from rest_framework import serializers
from .models import PersonalProfile, Companion


class CompanionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companion
        fields = ['user', 'nin', 'birth_date', 'first_name', 'last_name']
        extra_kwargs = {
            'user': {'write_only': True},
        }
        
        
class PersonalProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalProfile
        fields = [ 'user', 'nin', 'birth_date', 'phone_number', 'municipal', 'wilaya', 'companion']
        extra_kwargs = {
            'user': {'write_only': True}
        }
        
    companion = CompanionSerializer(required=False)
    
    def create(self, validated_data):
        companion_data = validated_data.pop('companion', None)
        personal_profile = PersonalProfile.objects.create(**validated_data)
        
        if companion_data is not None:
            Companion.objects.create(**companion_data)
            
        return personal_profile
    
        
        

