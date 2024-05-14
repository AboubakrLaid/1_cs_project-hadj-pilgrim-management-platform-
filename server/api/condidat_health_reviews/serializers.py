from rest_framework import serializers
from .models import PatientHealthReview
from users.models import UserStatus
from promote_backup.promote_backup import promote_backup


class PatientHealthReviewSerializer(serializers.ModelSerializer):
    treatments = serializers.ListField(child=serializers.CharField(max_length=255), allow_empty=True)
    diseases = serializers.ListField(child=serializers.CharField(max_length=255), allow_empty=True)

    class Meta:
        model = PatientHealthReview
        fields = '__all__'

    def validate(self, data):
        is_sick = data.get('is_sick')
        is_healthy = data.get('is_healthy')
        if is_sick and not is_healthy and not data.get('diseases'):
            raise serializers.ValidationError({'diseases': 'Diseases are required for a sick patient.'})
        if not is_sick and is_healthy and   data.get('diseases'):
            raise serializers.ValidationError({'diseases': 'Diseases are not available for a healthy patient.'})
        if (is_sick and is_healthy ) or   (not is_sick and  not is_healthy ):
            raise serializers.ValidationError({ 'patient can"t be sick and healthy in the same time.'})
        return data

    def create(self, validated_data):
        is_accepted = validated_data.pop('is_accepted', None)
        instance = PatientHealthReview.objects.create(**validated_data)
        if is_accepted is not None:
            user_status = instance.user.status
            if is_accepted:
                user_status.process = UserStatus.Process.PAYMENT
                user_status.status = UserStatus.Status.PENDING
            else:
                user_status.process = UserStatus.Process.VISIT
                user_status.status = UserStatus.Status.REJECTED
                try:
                    promote_backup(user = instance.user)
                except Exception as e:
                    print(e)
                    
            user_status.save()
        return instance

