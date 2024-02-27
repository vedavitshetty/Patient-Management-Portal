from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from apps.patients.models.patient import Patient

class PatientsViewsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_patient_list_or_create_view(self):
        url = reverse('patients')
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'status': 'ACTIVE',
            'addresses': [], 
            'custom_data': []
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Patient.objects.count(), 1)
        self.assertEqual(Patient.objects.get().first_name, 'John')

    def test_patient_RUD_view(self):
        patient = Patient.objects.create(first_name='John', last_name='Doe', status='ACTIVE')
        url = reverse('patient-detail', kwargs={'pk': patient.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

