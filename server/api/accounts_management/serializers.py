from rest_framework import serializers
from django.db import transaction
from users.serializers import UserSerializer
from .models import MedicalAdminProfile

class MedicalAdminProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = MedicalAdminProfile
        fields = ['user', 'hospital', 'work_schedule', 'contact', 'state']

    @transaction.atomic
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        hospital = validated_data.get('hospital')
        if not hospital:
            raise serializers.ValidationError("Hospital is required")

        work_schedule = validated_data.get('work_schedule')
        if not work_schedule:
            raise serializers.ValidationError("Work schedule is required")

        contact = validated_data.get('contact')
        state = validated_data.get('state')

        medical_admin_data = {
            'user': user,
            'hospital': hospital,
            'work_schedule': work_schedule,
            'contact': contact,
            'state': state,
        }
        medical_admin = MedicalAdminProfile.objects.create(**medical_admin_data)
        return medical_admin
