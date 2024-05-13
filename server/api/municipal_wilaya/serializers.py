from rest_framework import serializers
from .models import Wilaya, Municipal, Hospital, Seats


class WilayaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wilaya
        fields = [ 'id', 'name']
        extra_kwargs = {
            'name': {'read_only': True}
        }

class MunicipalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipal
        fields = ['id', 'name', 'population', 'is_lottery_done']




class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['id', 'name', 'eng_name', 'wilaya']
        
        
        
class SeatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seats
        fields = ['wilaya', 'available_seats', 'extra_seats']
        # extra_kwargs = {
        #     'wilaya': {'write_only': True}
        # }
        
    