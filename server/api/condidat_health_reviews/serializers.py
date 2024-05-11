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
            user_status.save()
        return instance










# from rest_framework import serializers
# from .models import PatientHealthReview


# class PatientHealthReviewSerializer(serializers.ModelSerializer):
#     treatments = serializers.ListField(child=serializers.CharField(max_length=255), allow_empty=True)
#     diseases = serializers.ListField(child=serializers.CharField(max_length=255), allow_empty=True)

#     class Meta:
#         model = PatientHealthReview
#         fields = '__all__'

#     def validate(self, data):
#         if data.get('is_sick') and not data.get('is_healthy'):
#             if not data.get('diseases'):
#                 raise serializers.ValidationError({'diseases': 'Diseases are required for a sick patient.'})
#         return data

#     def create(self, validated_data):
#         if validated_data.get('is_sick') and not validated_data.get('is_healthy'):
#             treatments = validated_data.pop('treatments', [])
#             diseases = validated_data.pop('diseases', [])
#             instance = super().create(validated_data)
#             instance.treatments = treatments
#             instance.diseases = diseases
#             instance.save()
#             return instance
#         else:
#             raise serializers.ValidationError({'is_sick': 'Patient must be sick to add diseases or treatments.'})



#     def update(self, instance, validated_data):
#         # Handle the logic when is_accepted is set to True
#         if validated_data.get('is_accepted') is True:
#             instance.is_accepted = True
#             instance.process = 'payment'
#             instance.status = 'pending'
#         # Handle the logic when is_accepted is set to False
#         elif validated_data.get('is_accepted') is False:
#             instance.status = 'refused'
#             # WE keep the process as it is
#         # Update other fields as needed
#         if validated_data.get('is_sick') and not validated_data.get('is_healthy'):
#             treatments = validated_data.pop('treatments', [])
#             diseases = validated_data.pop('diseases', [])
#             instance = super().update(instance, validated_data)
#             instance.treatments = treatments
#             instance.diseases = diseases
#             instance.save()
#             return instance
#         else:
#             raise serializers.ValidationError({'is_sick': 'Patient must be sick to add diseases or treatments.'})
