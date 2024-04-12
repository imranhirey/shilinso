// store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
  },
});

export type userState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
