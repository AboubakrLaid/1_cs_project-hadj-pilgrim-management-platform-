from rest_framework import serializers
from .models import User, UserInscriptionHistory, UserStatus
from . import validators




class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(validators = validators.unique_email)
    role = serializers.CharField(max_length=15, default=User.IS_CANDIDATE)
    class Meta:
        model = User
        fields = ['first_name','last_name','email','password','gender','role']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'gender': {'required': True},
            'role'  : {'read_only': True}
        }
        
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            gender=validated_data["gender"]
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    
class UserStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStatus
        fields = ['phase','status','start_date','end_date']

