from rest_framework import permissions
from users.models import User



class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == User.IS_ADMIN

class IsCandidateUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == User.IS_CANDIDATE

class IsMedicalAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == User.IS_MEDICAL_ADMIN

class IsGuideUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == User.IS_GUIDE
