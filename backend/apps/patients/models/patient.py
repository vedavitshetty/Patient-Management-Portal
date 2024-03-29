from django.db import models
from .patient_address import PatientAddress
from .patient_custom_data import PatientCustomData


class PatientStatus(models.TextChoices):
    INQUIRY = "INQUIRY"
    ONBOARDING = "ONBOARDING"
    ACTIVE = "ACTIVE"
    CHURNED = "CHURNED"


class Patient(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(blank=True, null=True)
    status = models.CharField(
        max_length=50, choices=PatientStatus.choices, default=PatientStatus.INQUIRY
    )
    primary_city = models.CharField(max_length=50, blank=True, null=True)
    primary_state = models.CharField(max_length=8, blank=True, null=True)
