from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from roles.roles import IsAdminUser 
from users.models import User
from rest_framework.decorators import (api_view,permission_classes)
from .models import  PatientHealthReview

from rest_framework.decorators import api_view, permission_classes
from .models import PatientHealthReview
from .serializers import PatientHealthReviewSerializer


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_patient_health_review(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if PatientHealthReview.objects.filter(user=user).exists():
        return Response({'error': 'Patient review already exists for this user'}, status=status.HTTP_400_BAD_REQUEST)
    
    data = request.data.copy()
    data['user'] = user.id
    treatments = data.pop('treatments', [])
    diseases = data.pop('diseases', [])
    data['treatments'] = treatments
    data['diseases'] = diseases

    serializer = PatientHealthReviewSerializer(data=data)
    if serializer.is_valid():
        is_sick = serializer.validated_data.get('is_sick', False)
        is_healthy = serializer.validated_data.get('is_healthy', False)
        
        if is_sick and not is_healthy:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'is_sick': 'Patient must be sick to add diseases or treatments.'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@permission_classes([IsAdminUser])


def add_disease_to_review(request, pk):
    try:
        patient_review = PatientHealthReview.objects.get(pk=pk)
    except PatientHealthReview.DoesNotExist:
        return Response({'error': 'Patient review not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()
    disease = data.get('disease')
    if not disease:
        return Response({'error': 'Disease field is required'}, status=status.HTTP_400_BAD_REQUEST)

    patient_review.diseases.append(disease)
    patient_review.save()

    serializer = PatientHealthReviewSerializer(patient_review)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_disease_from_review(request, pk):
    try:
        patient = PatientHealthReview.objects.get(pk=pk)
    except PatientHealthReview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    disease_to_delete = request.data.get('disease')
    if not disease_to_delete:
        return Response({'detail': 'Disease data is required.'}, status=status.HTTP_400_BAD_REQUEST)

    if disease_to_delete in patient.diseases:
        patient.diseases.remove(disease_to_delete)
        patient.save()
        return Response({'message': 'Disease deleted successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Disease not found in patient\'s record'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_treatment_to_review(request, pk):
    try:
        patient_review = PatientHealthReview.objects.get(pk=pk)
    except PatientHealthReview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    new_treatment = request.data.get('treatment')
    if not new_treatment:
        return Response({'error': 'Treatment not provided'}, status=status.HTTP_400_BAD_REQUEST)

    if new_treatment not in patient_review.treatments:
        patient_review.treatments.append(new_treatment)
        patient_review.save()
        return Response({'message': 'Treatment added successfully'})
    else:
        return Response({'error': 'Treatment already exists'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_treatment_from_review(request, pk):
    try:
        patient_review = PatientHealthReview.objects.get(pk=pk)
    except PatientHealthReview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    treatment_to_delete = request.data.get('treatment')
    if not treatment_to_delete:
        return Response({'detail': 'Treatment data is required.'}, status=status.HTTP_400_BAD_REQUEST)

    if treatment_to_delete in patient_review.treatments:
        patient_review.treatments.remove(treatment_to_delete)
        patient_review.save()
        return Response({'message': 'Treatment deleted successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Treatment not found in patient\'s record'}, status=status.HTTP_400_BAD_REQUEST)
