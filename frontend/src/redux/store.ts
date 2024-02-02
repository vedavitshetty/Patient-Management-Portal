import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import userReducer from './userSlice'; 
import patientsReducer from './patientsSlice'; 

const rootReducer = combineReducers({
    user: userReducer, // Register your userSlice here
    patients: patientsReducer, // Register your patientsSlice here
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
