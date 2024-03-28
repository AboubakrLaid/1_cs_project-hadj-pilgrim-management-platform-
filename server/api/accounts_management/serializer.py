from rest_framework import serializers
from .models import MedicalAdminProfile

class MedicalAdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalAdminProfile
        fields = '__all__'


# condidat 
from .models import User, AdminProfile, PersonalInfo, CompanionInfo, UserInscriptionHistory

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'nin', 'phone_number', 'role', 'wilaya', 'municipal', 'gender', 'inscription_year']

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = '__all__'

class CompanionInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanionInfo
        fields = '__all__'

class UserInscriptionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInscriptionHistory
        fields = '__all__'



class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminProfile
        fields = '__all__'
