from django.urls import path
from . import views

urlpatterns = [
    path('search-medical-admins/', views.search_medical_admins, name='search_medical_admins'),
    # new
    #path('add_guide/', views.add_guide, name='add_guide'),
    #path('delete_guide/<int:guide_id>/', views.delete_guide, name='delete_guide'),
    path('edit_candidate_info/<int:candidate_id>/', views.edit_candidate_info, name='edit_candidate_info'),
    path('users/', views.get_all_users, name='search_users'),
    path('users/user/', views.search_user, name='search_user'),
    path('admins/', views.get_all_admins, name='search_admins'),
    path('admins/new/', views.create_new_admin, name='add_admin'),
    path('admins/<int:admin_id>/', views.update_delete_admin, name='edit_admin_info'),
]
