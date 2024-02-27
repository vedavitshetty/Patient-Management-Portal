import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCurrentPatient, updatePatient } from '../redux/patientsSlice';
import { Patient } from '../common/types';
import { useAppSelector, useAppThunkDispatch } from '../redux/store';
import { PatientForm } from '../components/PatientForm';

export const EditPatientPage = () => {
const { id } = useParams();
const dispatch = useAppThunkDispatch();
const patient = useAppSelector((state) => state.patients.currentPatient);

useEffect(() => {
    if (id) {
        dispatch(fetchCurrentPatient(Number(id)));
    }
}, [dispatch, id]);

const handleSubmit = (patientData: Patient) => {
    dispatch(updatePatient({...patientData, id: Number(id)}));
};

  return (
    <PatientForm initialValues={patient} onSubmit={handleSubmit} />
  );
};


