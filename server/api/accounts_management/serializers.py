from rest_framework import serializers
from .models import MedicalAdminProfile  , User, AdminProfile

class MedicalAdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalAdminProfile
        fields = '__all__'

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class MedicalAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalAdminProfile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'nin', 'phone_number', 'role', 'wilaya', 'municipal', 'gender', 'inscription_year']

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminProfile
        fields = '__all__'




"""
class CompanionInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanionInfo
        fields = '__all__'

class UserInscriptionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInscriptionHistory
        fields = '__all__'
"""