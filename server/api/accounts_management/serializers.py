from rest_framework import serializers
from users.models import User
from .models import MedicalAdminProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'gender']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'gender': {'required': True},
        }

    def create(self, validated_data):
        validated_data['username'] = validated_data.get('email')
        return super().create(validated_data)

class MedicalAdminProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = MedicalAdminProfile
        fields = ['user', 'hospital', 'work_schedule', 'contact', 'state']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        medical_admin_data = {
            'user': user,
            'hospital': validated_data.get('hospital'),
            'work_schedule': validated_data.get('work_schedule'),
            'contact': validated_data.get('contact', ''),
            'state': validated_data.get('state', ''),
        }
        medical_admin = MedicalAdminProfile.objects.create(**medical_admin_data)
        return medical_admin
