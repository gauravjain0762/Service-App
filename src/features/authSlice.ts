import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../store';

// Auth state interface
export interface AuthState {
  token: string | null;
  isLoading: boolean;
  fcmToken: string | null;
  userInfo?: any;
  language: string | null;
  selectedService: any;

  dashboard: {
    banners: any[];
    categories: any[];
  };
  dropDownCategories: any[];
  dropDownSubCategories: any[];
}

// Initial state
const initialState: AuthState = {
  token: null,
  isLoading: false,
  fcmToken: null,
  userInfo: null,
  language: 'en',
  selectedService: null,

  dashboard: {
    banners: [],
    categories: [],
  },

  dropDownCategories: [],
  dropDownSubCategories: [],
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
    setSelectedService: (state, action: PayloadAction<any>) => {
      state.selectedService = action.payload;
    },
    setDashboard: (state, action: PayloadAction<any>) => {
      state.dashboard = action.payload;
    },

    setDropDownCategories: (state, action: PayloadAction<any>) => {
      state.dropDownCategories = action.payload;
    },

    setDropDownSubCategories: (state, action: PayloadAction<any>) => {
      state.dropDownSubCategories = action.payload;
    },

    clearToken: () => ({...initialState}),
  },
});

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // Only persist these fields
  whitelist: ['token', 'userInfo', 'language', 'selectedService'],
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
  setSelectedService,
  setDashboard,
  clearToken,
  setDropDownCategories,
  setDropDownSubCategories,
} = authSlice.actions;

// Selectors
export const selectToken = (state: RootState) => state.auth.token;

export const selectUser = (state: RootState) => state.auth.userInfo;

// Helper selector to check if token is expired

export default persistedAuthReducer;
