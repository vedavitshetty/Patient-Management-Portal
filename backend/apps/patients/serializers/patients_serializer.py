from rest_framework import serializers
from apps.patients.models import Patient
from apps.patients.models import PatientAddress, PatientCustomData


class PatientAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAddress
        fields = "__all__"


class PatientCustomDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientCustomData
        fields = "__all__"


class PatientListOrCreateSerializer(serializers.ModelSerializer):
    addresses = PatientAddressSerializer(many=True)
    custom_data = PatientCustomDataSerializer(many=True)

    class Meta:
        model = Patient
        fields = "__all__"

    def create(self, validated_data):
        addresses_data = validated_data.pop("addresses")
        custom_data_data = validated_data.pop("custom_data")
        patient = Patient.objects.create(**validated_data)

        for address_data in addresses_data:
            PatientAddress.objects.create(patient=patient, **address_data)

        for custom_data in custom_data_data:
            PatientCustomData.objects.create(patient=patient, **custom_data)

        return patient


class PatientRUDSerializer(serializers.ModelSerializer):
    addresses = PatientAddressSerializer(many=True)
    custom_data = PatientCustomDataSerializer(many=True)

    class Meta:
        model = Patient
        fields = "__all__"

    def update(self, instance, validated_data):
        addresses_data = validated_data.pop("addresses", [])
        custom_data_data = validated_data.pop("custom_data", [])

        # Update the patient instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Handle updating or creating addresses
        for address_data in addresses_data:
            address_id = address_data.get("id")
            if address_id:
                address_instance = PatientAddress.objects.get(
                    id=address_id, patient=instance
                )
                for address_attr, address_value in address_data.items():
                    setattr(address_instance, address_attr, address_value)
                address_instance.save()
            else:
                PatientAddress.objects.create(patient=instance, **address_data)

        # Handle updating or creating custom data
        for custom_data in custom_data_data:
            custom_data_id = custom_data.get("id")
            if custom_data_id:
                custom_data_instance = PatientCustomData.objects.get(
                    id=custom_data_id, patient=instance
                )
                for custom_attr, custom_value in custom_data.items():
                    setattr(custom_data_instance, custom_attr, custom_value)
                custom_data_instance.save()
            else:
                PatientCustomData.objects.create(patient=instance, **custom_data)

        return instance
