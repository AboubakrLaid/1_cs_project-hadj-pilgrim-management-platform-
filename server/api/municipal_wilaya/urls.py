from django.urls import path
from . import views
from .views import (
    get_all_hospitals_of_wilaya,
    GetAllWilayaView,
    GetAllMunicipalView,
    GetAllSpecificMunicipalView,
)



urlpatterns = [
    path('wilayas', GetAllWilayaView.as_view(), name='GetAllWilayaView'),
    path('wilaya/<int:wilaya_id>/municipals', GetAllSpecificMunicipalView.as_view(), name='GetAllSpecificMunicipalView'),
    path('m', GetAllMunicipalView.as_view(), name='GetAllMunicipalView'),
    path('h/<int:wilaya_id>', get_all_hospitals_of_wilaya, name='get_all_hospitals_of_wilaya'),
]

