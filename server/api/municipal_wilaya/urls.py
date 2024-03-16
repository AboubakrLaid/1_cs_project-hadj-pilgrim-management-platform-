from django.urls import path
from . import views
from .views import (
    get_all_hospitals_of_wilaya,
    GetAllWilayaView,
    GetAllMunicipalView,
    GetAllSpecificMunicipalView,
)



urlpatterns = [
    path('w', GetAllWilayaView.as_view(), name='GetAllWilayaView'),
    path('m', GetAllMunicipalView.as_view(), name='GetAllMunicipalView'),
    path('sm', GetAllSpecificMunicipalView.as_view(), name='GetAllSpecificMunicipalView'),
    path('h/<int:wilaya_id>', get_all_hospitals_of_wilaya, name='get_all_hospitals_of_wilaya'),
]

