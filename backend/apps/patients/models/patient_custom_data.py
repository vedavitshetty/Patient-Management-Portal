from django.db import models
from django.core.exceptions import ValidationError


class FieldTypeChoices(models.TextChoices):
    TEXT = "TEXT"
    NUMBER = "NUMBER"


class PatientCustomData(models.Model):
    field_name = models.CharField(max_length=100)
    field_type = models.CharField(
        max_length=50, choices=FieldTypeChoices.choices, default=FieldTypeChoices.TEXT
    )
    field_value = models.TextField()
    patient = models.ForeignKey(
        "Patient",
        on_delete=models.CASCADE,  # Keep CASCADE
        related_name="custom_data",
        default=None,
    )

    def clean(self):
        if self.field_type == FieldTypeChoices.NUMBER:
            # Validate if the field_value is a valid number
            try:
                float(self.field_value)
            except ValueError:
                raise ValidationError("Field value must be a valid number.")
        # Call the parent class's clean method
        super().clean()
