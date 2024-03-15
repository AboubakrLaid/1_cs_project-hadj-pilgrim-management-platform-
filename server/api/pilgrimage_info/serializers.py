from django.db import transaction
from rest_framework import serializers
from .models import PilgrimageSeasonInfo, Phase



class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = ['phase_number', 'start_date', 'end_date']
        
        
        
class  PilgrimageSeasonInfoSerializer(serializers.ModelSerializer):
    phases = PhaseSerializer(many=True, required=True)
    class Meta:
        model = PilgrimageSeasonInfo
        fields = ['year', 'ratio', 'total_pilgrims', 'inscription_deadline', 'procedure_deadline', 'phases']
        extra_kwargs = {
            'ratio' : {'read_only': True},
        }
        
    def validate(self, attrs):
        if PilgrimageSeasonInfo.objects.filter(is_active=True).exists():
            raise serializers.ValidationError('There is already an active season')
        
        return attrs
    def create(self, validated_data):
        with transaction.atomic():
            phases_data = validated_data.pop('phases', [])
            pilgrimage_season_info = PilgrimageSeasonInfo.objects.create(**validated_data)
            
            for phase_data in phases_data:
                Phase.objects.create(pilgrimage_season_info=pilgrimage_season_info, **phase_data)
                
            return pilgrimage_season_info