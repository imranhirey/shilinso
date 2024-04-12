import { User } from '@/@types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { object } from 'yup';

interface AuthState {
  isLoggedIn: boolean;
  user: any;
}

interface Payload {
  user: string;
}

interface VerifyPayload {
  isEmailVerified: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Payload>) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      // remove token from local storage
      localStorage.removeItem('token');
      state.user = {};
      state.isLoggedIn = false;
    },
    verifyEmail: (state, action: PayloadAction<VerifyPayload>) => {
      state.user.security.isverified.email = action.payload.isEmailVerified;
    },
  },
});

export const { login, logout, verifyEmail } = authSlice.actions;

export default authSlice.reducer;