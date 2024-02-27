from rest_framework import generics, status
from .models import Patient
from .serializers import PatientListOrCreateSerializer, PatientRUDSerializer
from rest_framework.response import Response


class PatientRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientRUDSerializer


class PatientListOrCreate(generics.ListCreateAPIView):
    serializer_class = PatientListOrCreateSerializer
    
    def get_queryset(self):
        churned_patients = Patient.objects.filter(status='CHURNED').order_by("first_name")
        non_churned_patients = Patient.objects.exclude(status='CHURNED').order_by("first_name")
        return {'churned': churned_patients, 'non_churned': non_churned_patients}

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        churned_serializer = self.get_serializer(queryset['churned'], many=True)
        non_churned_serializer = self.get_serializer(queryset['non_churned'], many=True)

        response_data = {
            'churned': churned_serializer.data,
            'non_churned': non_churned_serializer.data
        }
        return Response(response_data)
