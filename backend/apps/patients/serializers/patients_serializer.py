from rest_framework import serializers
from apps.patients.models import Patient
from apps.patients.models import PatientAddress, PatientCustomData


class PatientListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"


class PatientAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAddress
        fields = "__all__"


class PatientCustomDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientCustomData
        fields = "__all__"


class PatientDetailSerializer(serializers.ModelSerializer):
    addresses = PatientAddressSerializer(many=True)
    custom_data = PatientCustomDataSerializer(many=True)

    class Meta:
        model = Patient
        fields = "__all__"
