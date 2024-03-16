from rest_framework.response import Response

from rest_framework.decorators import (
    api_view,
    permission_classes,
)

from rest_framework import status



from rest_framework import generics
from .models import Wilaya, Municipal, Hospital
from .serializers import WilayaSerializer, MunicipalSerializer, HospitalSerializer



# Create your views here.


class GetAllWilayaView(generics.ListAPIView):
    queryset = Wilaya.objects.all()
    serializer_class = WilayaSerializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAllMunicipalView(generics.ListAPIView):
    queryset = Municipal.objects.all()
    serializer_class = MunicipalSerializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAllSpecificMunicipalView(generics.ListAPIView):
    serializer_class = MunicipalSerializer

    def get_queryset(self):
        try:
            wilaya_id = self.kwargs['wilaya_id']
            queryset = Municipal.objects.filter(wilaya_id=wilaya_id)
            return queryset
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





class HospitalListView(generics.ListCreateAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HospitalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer




@api_view(['GET'])
def get_all_hospitals_of_wilaya(request, wilaya_id):
    try:
     
        hospitals = Hospital.objects.filter(wilaya_id=wilaya_id)
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Hospital.DoesNotExist:
        return Response({'error': 'Wilaya does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)