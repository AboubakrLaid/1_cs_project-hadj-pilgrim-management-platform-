from rest_framework import serializers
from municipal_wilaya.models import Hospital
from django.contrib.contenttypes.models import ContentType
from users.serializers import UserSerializer
from .models import MedicalAdminProfile
from django.db.models import Q
from rest_framework.exceptions import ValidationError

class MedicalAdminProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = MedicalAdminProfile
        fields = ['user','work_schedule']
    
    def create(self, validated_data):        
        hospital_name = self.context['request'].data.get('hospital_name')

        # Check if the hospital exists
        try:
            hospital = Hospital.objects.get(Q(name=hospital_name) | Q(eng_name=hospital_name))
        except Hospital.DoesNotExist:
            raise ValidationError({"hospital_name": "Hospital with this name does not exist."})
        
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        work_schedule = validated_data.pop('work_schedule')
        
        medical_admin = MedicalAdminProfile.objects.create(
            user=user,
            content_type=ContentType.objects.get_for_model(Hospital),
            object_id=hospital.id,
            work_schedule=work_schedule
        )
        return medical_admin
