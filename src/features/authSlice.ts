import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../store';

// Auth state interface
export interface AuthState {
  token: string | null;
  isLoading: boolean;
  user: any;
  fcmToken: string | null;
  userInfo?: any;
  language: string | null;
}

// Initial state
const initialState: AuthState = {
  token: null,
  isLoading: false,
  user: null,
  fcmToken: null,
  userInfo: null,
  language: 'en',
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set tokens
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string | null>) => {
      state.language = action.payload;
    },

    setFcmToken: (state, action: PayloadAction<string | null>) => {
      state.fcmToken = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },

    clearToken: state => {
      console.log('clearing token', new Error().stack);

      state.fcmToken = null;
      state.token = null;
      state.user = null;
    },
  },
});

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // Only persist these fields
  whitelist: ['authToken', 'user', 'language'],
};

// Create the persisted reducer
export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer,
);

export const {
  setAuthToken,
  setFcmToken,
  setLoading,
  setUserInfo,
  setLanguage,

  clearToken,
} = authSlice.actions;

// Selectors
export const selectToken = (state: RootState) => state.auth.token;

export const selectUser = (state: RootState) => state.auth.user;

// Helper selector to check if token is expired

export default persistedAuthReducer;
