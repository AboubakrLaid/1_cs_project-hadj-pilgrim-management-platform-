from rest_framework import serializers
from .models import MedicalAdminProfile  , User, AdminProfile
from django.contrib.contenttypes.models import ContentType
from municipal_wilaya.models import Wilaya

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


class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','last_name','email','password','gender','wilaya']
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }
    wilaya = serializers.IntegerField(write_only=True)
    
    def get_wilaya(self, obj):
        wilaya = Wilaya.objects.get(id=obj.admin_profile.object_id)
        return {
            'id': wilaya.id,
            'name': wilaya.name
        }
        
    def create(self, validated_data):
        print(validated_data)
        wilaya = validated_data.pop('wilaya')
        validated_data['username'] = validated_data['email']
        validated_data['role'] = User.IS_ADMIN
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'success':False, 'email': 'email already exists'})
        
        
        if AdminProfile.objects.filter(object_id=wilaya).exists():
            raise serializers.ValidationError({'success':False, 'wilaya': 'wilaya already has an admin'})
        
        user = User.objects.create_user(**validated_data)
        content_type = ContentType.objects.get_for_model(Wilaya)
        AdminProfile.objects.create(user=user, object_id=wilaya, content_type = content_type)
        return user
    
    def update(self, instance, validated_data):
        wilaya = validated_data.pop('wilaya')
        AdminProfile.objects.filter(user=instance).update(object_id=wilaya)
        instance.save()
        return instance
    
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if hasattr(instance, 'admin_profile'):
            wilaya = Wilaya.objects.get(id=instance.admin_profile.object_id)
            representation['wilaya'] = {
                'id': wilaya.id,
                'name': wilaya.name
            }
        return representation





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
