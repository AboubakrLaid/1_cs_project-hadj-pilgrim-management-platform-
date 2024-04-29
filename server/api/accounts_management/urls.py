from django.urls import path
from . import views

urlpatterns = [
    path('search-medical-admins/', views.search_medical_admins, name='search_medical_admins'),
    # new
    #path('add_guide/', views.add_guide, name='add_guide'),
    #path('delete_guide/<int:guide_id>/', views.delete_guide, name='delete_guide'),
    path('edit_candidate_info/<int:candidate_id>/', views.edit_candidate_info, name='edit_candidate_info'),
    path('search_users/', views.search_users, name='search_users'),
    
]
