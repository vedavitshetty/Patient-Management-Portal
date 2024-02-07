import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customAxios from '../utils/axios';
import { snakeKeysToCamel } from '../utils/textHelpers';

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

type PatientAddress = {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
}

type PatientCustomData = {
    fieldName: string;
    fieldType: string;
    fieldValue: string;
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

type Patient = {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  status: string;
  addresses: PatientAddress[];
  customData?: PatientCustomData[];
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
      })
      .addCase(fetchCurrentPatient.rejected, (state, action) => {
        state.loading.currentPatient = false;
        state.error.currentPatient = action.error.message || 'Failed to fetch patients'; 
      });
  },
});


export default patientSlice.reducer;
