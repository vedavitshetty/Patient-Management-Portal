from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientCRUD, PatientList

urlpatterns = [
    path(
        "api/patients/",
        PatientList.as_view(http_method_names=["get", "post"]),
        name="patients",
    ),
    path(
        "api/patients/<int:pk>/",
        PatientCRUD.as_view(),
        name="patient-detail",
    ),
]
