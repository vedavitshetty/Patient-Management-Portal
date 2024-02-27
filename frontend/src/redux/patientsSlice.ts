import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customAxios from '../utils/axios';
import { camelKeysToSnake, snakeKeysToCamel } from '../utils/textHelpers';
import { Patient } from '../common/types';
import { toast } from 'react-toastify';

type PatientState = {
  patients: Patient[];
  currentPatient: Patient;
  loading: {
    patients: boolean;
    currentPatient: boolean;
    createPatient: boolean;
    updatePatient: boolean;
    deletePatient: boolean;
  };    
  error: {
    patients: string;
    currentPatient: string;
    createPatient: string;
    updatePatient: string;
    deletePatient: string;
  };
}

const initialState: PatientState = {
  patients: [],
  currentPatient: {} as Patient,
  loading: {
    patients: false,
    currentPatient: false,
    createPatient: false,
    updatePatient: false,
    deletePatient: false,
  },
  error: {
    patients: '',
    currentPatient: '',
    createPatient: '',
    updatePatient: '',
    deletePatient: '',
  
  },
}

export const fetchAllPatients = createAsyncThunk('patients/fetchPatients', async () => {
  const response = await customAxios.get('patients/api/patients/');
  const data = response.data.map((patient: any) => snakeKeysToCamel(patient));
  return data; 
});

export const fetchCurrentPatient = createAsyncThunk('patients/fetchCurrentPatient', async (patientId: number) => {
  const response = await customAxios.get(`patients/api/patients/${patientId}/`);
  const data = snakeKeysToCamel(response.data);
  return data;
});

export const deletePatient = createAsyncThunk('patients/deletePatient', async (patientId: number) => {
  const response = await customAxios.delete(`patients/api/patients/${patientId}/`);
  const data = snakeKeysToCamel(response.data);
  return data;
});

export const updatePatient = createAsyncThunk('patients/updatePatient', async (patient: Patient) => {
  const response = await customAxios.put(`patients/api/patients/${patient.id}/`, patient);
  const data = snakeKeysToCamel(response.data);
  return data;
});

export const createPatient = createAsyncThunk('patients/createPatient', async (patient: Patient) => {
  const { id, ...patientDataWithoutId } = patient;
  const response = await customAxios.post('patients/api/patients/', camelKeysToSnake(patientDataWithoutId));
  const data = snakeKeysToCamel(response.data);
  return data;
});

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPatients.pending, (state) => {
        state.loading.patients = true;
        state.error.patients = '';
      })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.loading.patients = false;
        state.patients = action.payload; 
        toast.success('Patients fetched successfully');
      })
      .addCase(fetchAllPatients.rejected, (state, action) => {
        state.loading.patients = false;
        state.error.patients= action.error.message || 'Failed to fetch patients'; 
      })
      .addCase(fetchCurrentPatient.pending, (state) => {
        state.loading.currentPatient = true;
        state.error.currentPatient = '';
      })
      .addCase(fetchCurrentPatient.fulfilled, (state, action) => {
        state.loading.currentPatient = false;
        state.currentPatient = action.payload; 
        toast.success('Patient fetched successfully');
      })
      .addCase(fetchCurrentPatient.rejected, (state, action) => {
        state.loading.currentPatient = false;
        state.error.currentPatient = action.error.message || 'Failed to fetch patients'; 
      })
      .addCase(deletePatient.pending, (state) => {
        state.loading.deletePatient = true;
        state.error.deletePatient = '';
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading.deletePatient = false;
        state.patients = action.payload; 
        toast.success('Patient deleted successfully');
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading.deletePatient = false;
        state.error.deletePatient = action.error.message || 'Failed to delete patient'; 
      })
      .addCase(updatePatient.pending, (state) => {
        state.loading.updatePatient = true;
        state.error.updatePatient = '';
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading.updatePatient = false;
        state.currentPatient = action.payload; 
        toast.success('Patient updated successfully');
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading.updatePatient = false;
        state.error.updatePatient = action.error.message || 'Failed to update patient'; 
      })
      .addCase(createPatient.pending, (state) => {
        state.loading.createPatient = true;
        state.error.createPatient = '';
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading.createPatient = false;
        state.currentPatient = action.payload; 
        toast.success('Patient created successfully');
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading.createPatient = false;
        state.error.createPatient = action.error.message || 'Failed to create patient'; 
      });
  },
});


export default patientSlice.reducer;
