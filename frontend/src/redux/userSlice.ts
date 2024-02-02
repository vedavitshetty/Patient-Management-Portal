import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customAxios from '../utils/axios';

type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

const initialState = {
  user: {} as User,
  loading: false,
  error: '',
};

export const loginUser = createAsyncThunk('user/loginUser', async (formData: { username: string; password: string }) => {
  const response = await customAxios.post('/accounts/login/', formData);
  return response.data.user; 
});



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
        state.user = payload;
    },
    resetUser: (state) => {
        state.user = initialState.user;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed'; 
      });
  },
});

export default userSlice.reducer;
