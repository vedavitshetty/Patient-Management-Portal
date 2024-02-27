import { Patient } from '../common/types';
import { PatientForm } from '../components/PatientForm';
import { createPatient } from '../redux/patientsSlice';
import { useAppThunkDispatch } from '../redux/store';

export const NewPatientPage = () => {
    const dispatch = useAppThunkDispatch();

    const handleSubmit = (patientData: Patient) => {
        dispatch(createPatient(patientData));
    };

    return (
        <div>
            <h1>Create New Patient</h1>
            <PatientForm onSubmit={handleSubmit} />
        </div>
    );
};
