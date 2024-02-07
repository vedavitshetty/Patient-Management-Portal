import { Action } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'
import { store } from '../redux/store'

export type RootState = ReturnType<typeof store.getState>
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>