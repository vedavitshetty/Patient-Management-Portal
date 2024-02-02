import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
    },
  },
});

export const { setFirstName, setLastName, setEmail } = userSlice.actions;

export default userSlice.reducer;
