from rest_framework import serializers
from .models import Wilaya, Municipal, Hospital


class WilayaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wilaya
        fields = ['user', 'name', 'eng_name']
        read_only_fields = ['user']  

class MunicipalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipal
        fields = ['user', 'name', 'eng_name', 'population', 'wilaya']
        read_only_fields = ['user']  




class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['id', 'name', 'eng_name', 'wilaya_id']