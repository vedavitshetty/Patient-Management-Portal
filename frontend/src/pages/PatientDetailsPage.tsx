import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppThunkDispatch } from '../redux/store';
import { formatDateOfBirth } from '../utils/textHelpers';
import { fetchCurrentPatient } from '../redux/patientsSlice';

export const PatientDetailsPage: React.FC = () => {
    const dispatch = useAppThunkDispatch();
    const memoizedDispatch = useCallback(dispatch, [dispatch]);

    const { id } = useParams<{ id?: string }>(); // Add a question mark to make id optional
    const patient = useAppSelector((state) => state.patients.currentPatient);

    useEffect(() => {
        if (id) {
            memoizedDispatch(fetchCurrentPatient(Number(id)));
        }
    }, [id, memoizedDispatch]);

    if (!patient.id) {
        // Handle patient not found
        return <div>Patient not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-4">Patient Details</h2>
            <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">Personal Information</h3>
                <p>First Name: {patient.firstName}</p>
                <p>Middle Name: {patient.middleName}</p>
                <p>Last Name: {patient.lastName}</p>
                <p>Date of Birth: {formatDateOfBirth(patient.dateOfBirth)}</p>
                <p>Status: {patient.status}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">Addresses</h3>
                <ul>
                    {patient.addresses?.map((address, index) => (
                        <li key={index}>
                            <p>Address Line 1: {address.addressLine1}</p>
                            <p>Address Line 2: {address.addressLine2}</p>
                            <p>City: {address.city}</p>
                            <p>State: {address.state}</p>
                            <p>Zip Code: {address.zipCode}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {patient.customData && patient.customData.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold mb-2">Custom Data</h3>
                    <ul>
                        {patient.customData.map((customField, index) => (
                            <li key={index}>
                                <p>{customField.fieldName}: {customField.fieldValue}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PatientDetailsPage;
