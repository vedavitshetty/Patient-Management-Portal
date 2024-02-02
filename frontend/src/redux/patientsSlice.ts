import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import customAxios from '../utils/axios';
import { snakeKeysToCamel } from '../utils/textHelpers';

type PatientState = {
  patients: Patient[];
  loading: boolean;    
  error: string | null; 
}

type PatientAddress = {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zip: string;
}

type PatientCustomFields = {
    fieldName: string;
    fieldType: string;
    fieldValue: string;
}

const initialState: PatientState = {
  patients: [],
  loading: false,
  error: null,
}

type Patient = {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  addresses: PatientAddress[];
  customerFields?: PatientCustomFields[];
}

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
  const response = await customAxios.get('patients/list-all-patients/');
  const data = response.data.map((patient: any) => snakeKeysToCamel(patient));
  return data; 
});

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload; 
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch patients'; 
      });
  },
});


export default patientSlice.reducer;
