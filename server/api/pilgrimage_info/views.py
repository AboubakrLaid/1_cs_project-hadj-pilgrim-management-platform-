from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from roles.roles import IsAdminUser
from rest_framework import status
from .models import PilgrimageSeasonInfo
from .serializers import PilgrimageSeasonInfoSerializer
from datetime import datetime, timedelta, date

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_pilgrimage_season_info(request):
    serializer = PilgrimageSeasonInfoSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({'success':True}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_current_season(request):
    try:
        current_season = PilgrimageSeasonInfo.objects.get(is_active=True)
    except PilgrimageSeasonInfo.DoesNotExist:
        return Response({'error': 'No active season'}, status=status.HTTP_404_NOT_FOUND)

    serializer = PilgrimageSeasonInfoSerializer(current_season)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_previous_seasons(request):
    
    current_season = PilgrimageSeasonInfo.objects.filter(is_active=False)
    

    serializer = PilgrimageSeasonInfoSerializer(current_season, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def mark_season_as_finished(request):
    season_year = request.data.get('year')
    if not season_year:
        return Response({'error': 'Year is required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        season = PilgrimageSeasonInfo.objects.get(year=season_year)
    except PilgrimageSeasonInfo.DoesNotExist:
        return Response({'error': 'No such season'}, status=status.HTTP_404_NOT_FOUND)
    
    now = datetime.now().date()
    procedure_deadline_plus_30_days = season.procedure_deadline + timedelta(days=30)
    print(procedure_deadline_plus_30_days, now)
    
    if now < procedure_deadline_plus_30_days:
        return Response({'message': f'Cannot finish season until {procedure_deadline_plus_30_days}.'}, status=status.HTTP_200_OK)
   
    season.is_active = False
    season.save()
    return Response({'success': True}, status=status.HTTP_200_OK)