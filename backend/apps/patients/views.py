from rest_framework import viewsets, generics
from .models import Patient
from .serializers import PatientListSerializer, PatientDetailSerializer
from rest_framework.response import Response


class PatientCRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientDetailSerializer


class PatientList(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientListSerializer
