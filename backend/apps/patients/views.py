from rest_framework import generics, status
from .models import Patient
from .serializers import PatientListOrCreateSerializer, PatientRUDSerializer
from rest_framework.response import Response


class PatientRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientRUDSerializer


class PatientListOrCreate(generics.ListCreateAPIView):
    queryset = Patient.objects.all().order_by("first_name")
    serializer_class = PatientListOrCreateSerializer
