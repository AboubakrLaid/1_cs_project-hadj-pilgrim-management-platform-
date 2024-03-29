from rest_framework import serializers
from .models import MedicalAdminProfile

class MedicalAdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalAdminProfile
        fields = '__all__'




