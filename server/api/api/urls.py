"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
   2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))

"""



from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),

    path('api/profile/', include('personal_profile.urls')),
    path('api/pilgrimage/', include('pilgrimage_info.urls')),

    
    path('api/administrative/', include('municipal_wilaya.urls')),  
    path('api/lottery/', include('lottery.urls')),
    path('api/accounts/', include('accounts_management.urls')),
    path('api/health_reviews/', include('condidat_health_reviews.urls')),
    path('api/payment/', include('payment.urls')),
   

    # token urls
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),  
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

