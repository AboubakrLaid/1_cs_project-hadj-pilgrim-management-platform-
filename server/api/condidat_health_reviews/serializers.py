from rest_framework import serializers
from .models import PatientHealthReview
from users.models import UserStatus

class PatientHealthReviewSerializer(serializers.ModelSerializer):
    treatments = serializers.ListField(child=serializers.CharField(max_length=255), allow_empty=True)
    diseases = serializers.ListField(child=serializers.CharField(max_length=255), allow_empty=True)

    class Meta:
        model = PatientHealthReview
        fields = '__all__'

    def validate(self, data):
        if data.get('is_sick') and not data.get('is_healthy'):
            if not data.get('diseases'):
                raise serializers.ValidationError({'diseases': 'Diseases are required for a sick patient.'})
        return data

    def update_user_status(self, instance, validated_data):
        user = instance.user
        user_status = user.status
        if validated_data.get('is_accepted') is True:
            user_status.status = UserStatus.Status.CONFIRMED
            user_status.process = UserStatus.Process.PAYMENT
        elif validated_data.get('is_accepted') is False:
            user_status.status = UserStatus.Status.REJECTED
        user_status.save()

    def update(self, instance, validated_data):
        self.update_user_status(instance, validated_data)
        treatments = validated_data.pop('treatments', [])
        diseases = validated_data.pop('diseases', [])
        instance = super().update(instance, validated_data)
        instance.treatments = treatments
        instance.diseases = diseases
        instance.save()
        return instance

    def create(self, validated_data):
        if validated_data.get('is_sick') and not validated_data.get('is_healthy'):
            instance = super().create(validated_data)
            treatments = validated_data.pop('treatments', [])
            diseases = validated_data.pop('diseases', [])
            instance.treatments = treatments
            instance.diseases = diseases
            instance.save()
            return instance
        else:
            raise serializers.ValidationError({'is_sick': 'Patient must be sick to add diseases or treatments.'})









