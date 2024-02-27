import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customAxios from '../utils/axios'

type User = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
}
type LoginData = {
  username?: string
  password?: string
  token?: string
}

const initialState = {
  user: {} as User,
  loading: false,
  error: '',
}

export const createUser = createAsyncThunk(
  'user/createUser',
  async (formData: { username: string; email: string; password: string }) => {
    const response = await customAxios.post('/accounts/register/', formData)
    return response.data.user
  },
)

export const loginUser = createAsyncThunk('user/loginUser', async (loginData: LoginData) => {
  const response = await customAxios.post('/accounts/login/', loginData)
  const { token, user } = response.data
  localStorage.setItem('token', token) // Store token in local storage
  return user
})

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await customAxios.post('/accounts/logout/')
  localStorage.removeItem('token')
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    },
    resetUser: state => {
      state.user = initialState.user
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        state.loading = true
        state.error = ''
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Account creation failed'
      })
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = ''
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      .addCase(logoutUser.pending, state => {
        state.loading = true
        state.error = ''
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false
        state.user = initialState.user // Reset user state to initial state
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Logout failed'
      })
  },
})

export default userSlice.reducer
