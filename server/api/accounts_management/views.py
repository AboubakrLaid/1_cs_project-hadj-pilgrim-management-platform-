from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.db.models import Q
from .models import MedicalAdminProfile
from .serializers import MedicalAdminProfileSerializer

@api_view(['GET'])
@permission_classes([IsAdminUser])
def search_medical_admins(request):
    user = request.user
    wilaya = user.responsibility.wilaya
    medical_admins = MedicalAdminProfile.objects.filter(user__personal_profile__wilaya__id=wilaya.id)

    gender = request.GET.get('gender')
    if gender:
        medical_admins = medical_admins.filter(user__gender=gender)

    municipal_id = request.GET.get('municipal')
    if municipal_id :
        medical_admins = medical_admins.filter(user__municipal=municipal_id )    

    hospital_id = request.GET.get('hospital')
    if hospital_id:
        medical_admins = medical_admins.filter(user__personal_profile__hospital__id=hospital_id)

    q_type = request.GET.get('q')
    q_value = request.GET.get('value')
    if q_type and q_value:
        if q_type == 'nin':
            medical_admins = medical_admins.filter(user__nin__startswith=q_value)
        elif q_type == 'name':
            medical_admins = medical_admins.filter(Q(user__first_name__startswith=q_value) | Q(user__last_name__startswith=q_value))
        elif q_type == 'email':
            medical_admins = medical_admins.filter(user__email__startswith=q_value)
        elif q_type == 'phone_number':
            medical_admins = medical_admins.filter(user__phone_number__startswith=q_value)

    serializer = MedicalAdminProfileSerializer(medical_admins, many=True)
    return Response(serializer.data)

# Create your views here.


# condidat 
from rest_framework import viewsets, status
from rest_framework.permissions import  IsAuthenticated
from .models import User, , AdminProfile
from .serializers import UserSerializer, AdminProfileSerializer

class MedicalAdminViewSet(viewsets.ModelViewSet):
    queryset = MedicalAdminProfile.objects.all()
    serializer_class = MedicalAdminProfileSerializer
    permission_classes = [IsAdminUser]

class AdminViewSet(viewsets.ModelViewSet):
    queryset = AdminProfile.objects.all()
    serializer_class = AdminProfileSerializer
    permission_classes = [IsAdminUser]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get('role')
        wilaya = self.request.query_params.get('wilaya')
        municipal = self.request.query_params.get('municipal')
        gender = self.request.query_params.get('gender')
        inscription_year = self.request.query_params.get('inscription_year')

        if role:
            queryset = queryset.filter(role=role)
        if wilaya:
            queryset = queryset.filter(wilaya=wilaya)
        if municipal:
            queryset = queryset.filter(municipal=municipal)
        if gender:
            queryset = queryset.filter(gender=gender)
        if inscription_year:
            queryset = queryset.filter(inscription_year=inscription_year)

        return queryset
