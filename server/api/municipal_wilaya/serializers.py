from rest_framework import serializers
from .models import Wilaya, Municipal, Hospital


class WilayaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wilaya
        fields = [ 'id', 'name']

class MunicipalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipal
        fields = [ 'name', 'population']




class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['id', 'name', 'eng_name', 'wilaya']