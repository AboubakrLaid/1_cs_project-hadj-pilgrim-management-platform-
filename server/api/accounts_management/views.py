from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.db.models import Q
from .models import MedicalAdminProfile, AdminProfile
from  users.models import User , UserInscriptionHistory , UserStatus , UserEmailVerification ,UserVerificationCode
from .serializers import (
    MedicalAdminProfileSerializer, CandidateSerializer,
     MedicalAdminSerializer, UserSerializer,
    PersonalInfoSerializer, AdminProfileSerializer
)

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


#candidat

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def edit_candidate_info(request, candidate_id):
    try:
        candidate = User.objects.get(id=candidate_id)
    except User.DoesNotExist:
        return Response({'message': 'Candidate not found'}, status=404)

    if request.method == 'GET':
        serializer = CandidateSerializer(candidate)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CandidateSerializer(candidate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_users(request):
    role = request.GET.get('role')
    wilaya = request.GET.get('wilaya')
    municipal = request.GET.get('municipal')
    gender = request.GET.get('gender')
    latest_inscription_year = request.GET.get('latest_inscription_year')
    first_name = request.GET.get('first_name')
    last_name = request.GET.get('last_name')
    nin = request.GET.get('nin')
    email = request.GET.get('email')

    if role == 'candidate':
        users = users.objects.all()
    
    elif role == 'medical_admin':
        users = MedicalAdminProfile.objects.all()
    else:
        return Response({'message': 'Invalid role specified'}, status=400)

    
    if wilaya:
        users = users.filter(wilaya=wilaya)
    if municipal:
        users = users.filter(municipal=municipal)
    if gender:
        users = users.filter(gender=gender)
    if latest_inscription_year:
        users = users.filter(latest_inscription_year=latest_inscription_year)
    if first_name:
        users = users.filter(first_name__icontains=first_name)
    if last_name:
        users = users.filter(last_name__icontains=last_name)
    if nin:
        users = users.filter(nin__icontains=nin)
    if email:
        users = users.filter(email__icontains=email) 
        

        serialized_data = []
    for user in users:
        user_data = UserSerializer(user).data
        user_data['inscription_history'] = UserInscriptionHistory(user.inscription_history.all(), many=True).data
        user_data['status'] = UserStatus(user.status.all(), many=True).data
        user_data['verification_code'] = UserVerificationCode(user.verification_code.all(), many=True).data
        user_data['email_verification'] = UserEmailVerification(user.email_verification.all(), many=True).data
        serialized_data.append(user_data)     
    
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)





# guide
"""
@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_guide(request):
    serializer = GuideSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_guide(request, guide_id):
    try:
        guide = Guide.objects.get(id=guide_id)
        guide.delete()
        return Response({'message': 'Guide deleted successfully'}, status=204)
    except Guide.DoesNotExist:
        return Response({'message': 'Guide not found'}, status=404)
"""
