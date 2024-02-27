from django.urls import path
from .views import PatientRUD, PatientListOrCreate

urlpatterns = [
    path(
        "api/patients/",
        PatientListOrCreate.as_view(http_method_names=["get", "post"]),
        name="patients",
    ),
    path(
        "api/patients/<int:pk>/",
        PatientRUD.as_view(),
        name="patient-detail",
    ),
]
