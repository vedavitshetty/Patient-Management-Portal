import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customAxios from '../utils/axios';
import { snakeKeysToCamel } from '../utils/textHelpers';
import { Patient } from '../common/types';
import { toast } from 'react-toastify';

type PatientState = {
  patients: Patient[];
  currentPatient: Patient;
  loading: {
    patients: boolean;
    currentPatient: boolean;
  };    
  error: {
    patients: string;
    currentPatient: string;
  };
}

const initialState: PatientState = {
  patients: [],
  currentPatient: {} as Patient,
  loading: {
    patients: false,
    currentPatient: false,
  },
  error: {
    patients: '',
    currentPatient: '',
  
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
      });
  },
});


export default patientSlice.reducer;
