import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

// Define a type for the patient data
type Patient = {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  addresses: PatientAddress[];
  customerFields?: PatientCustomFields[];
}

// Define an async thunk to fetch patient data from the backend
export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
    try {
        // Make a GET request to your backend API endpoint to fetch patient data
        const response = await axios.get('/api/patients');
        return response.data; // Assuming the response contains an array of patient objects
    } catch (error) {
        throw error; // Handle errors appropriately
    }
});

// Create a patient slice using createSlice
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
        state.patients = action.payload; // Update the patients array with fetched data
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch patients'; // Handle the error
      });
  },
});

// Export the patient reducer
export default patientSlice.reducer;
