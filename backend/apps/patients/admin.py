from django.contrib import admin
from .models import Patient, PatientAddress, PatientCustomData

# Register your models here.
admin.site.register(Patient)
admin.site.register(PatientAddress)
admin.site.register(PatientCustomData)
