from rest_framework import viewsets, generics
from .models import Patient
from .serializers import PatientListSerializer, PatientDetailSerializer
from rest_framework.response import Response


class PatientCRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientDetailSerializer


class PatientList(generics.ListCreateAPIView):
    # Get queryset sorted by first name
    queryset = Patient.objects.all().order_by('first_name')
    serializer_class = PatientListSerializer
