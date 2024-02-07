import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from './userSlice'; 
import patientsReducer from './patientsSlice'; 
import { ThunkAppDispatch } from '../common/state';

const rootReducer = combineReducers({
    user: userReducer,
    patients: patientsReducer, 
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
