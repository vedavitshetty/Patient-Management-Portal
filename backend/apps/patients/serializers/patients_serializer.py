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

        # Create a dictionary to map address IDs to their respective instances
        address_instances = {
            address.id: address for address in instance.addresses.all()
        }

        # Handle updating or creating addresses
        for address_data in addresses_data:
            address_id = address_data.get("id")
            if address_id:
                address_instance = address_instances.pop(address_id, None)
                if address_instance:
                    # Update existing address instance
                    for address_attr, address_value in address_data.items():
                        setattr(address_instance, address_attr, address_value)
                    address_instance.save()
            else:
                address_data.pop("patient", None)
                # Create new address instance
                PatientAddress.objects.create(patient=instance, **address_data)

        # Delete any remaining address instances that were not updated or created
        for address_instance in address_instances.values():
            address_instance.delete()

        # Create a dictionary to map Customer Data IDs to their respective instances
        custom_data_instances = {
            custom_data.id: custom_data for custom_data in instance.custom_data.all()
        }

        # Handle updating or creating custom data
        for custom_data in custom_data_data:
            custom_data_id = custom_data.get("id")
            if custom_data_id:
                custom_data_instance = custom_data_instances.pop(custom_data_id, None)
                if custom_data_instance:
                    # Update existing custom data instance
                    for custom_attr, custom_value in custom_data.items():
                        setattr(custom_data_instance, custom_attr, custom_value)
                    custom_data_instance.save()
            else:
                custom_data.pop("patient", None)
                # Create new custom data instance
                PatientCustomData.objects.create(patient=instance, **custom_data)

        # Delete any remaining custom data instances that were not updated or created
        for custom_data_instance in custom_data_instances.values():
            custom_data_instance.delete()

        return instance
