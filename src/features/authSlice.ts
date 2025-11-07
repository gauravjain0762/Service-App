import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState, store} from '../store';

// Auth state interface
export interface AuthState {
  token: string | null;
  isLoading: boolean;
  fcmToken: string | null;
  userInfo?: any;
  language: string | null;
  isProvider: any;

  dashboard: {
    banners: any[];
    categories: any[];
    offers_unread: any;
  };
  dropDownCategories: any[];
  dropDownSubCategories: any[];
  emirates: any[];
  packages?: any[];
  guestUser?: boolean;
  guestUserModal?: boolean;
  userCurrentLocation: any;
  appData?: any;
  recentSearch?: any[];
}

// Initial state
const initialState: AuthState = {
  token: null,
  isLoading: false,
  fcmToken: null,
  userInfo: null,
  language: 'en',
  isProvider: null,

  dashboard: {
    banners: [],
    categories: [],
    offers_unread: null,
  },

  dropDownCategories: [],
  dropDownSubCategories: [],
  emirates: [],
  packages: [],
  guestUser: false,
  guestUserModal: false,
  userCurrentLocation: {},
  appData: {},
  recentSearch: [],
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
    setGuestLogin: (state, action: PayloadAction<boolean>) => {
      state.guestUser = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    setAppData: (state, action: PayloadAction<any>) => {
      state.appData = action.payload;
    },
    setIsProvider: (state, action: PayloadAction<any>) => {
      state.isProvider = action.payload;
    },
    setUserLocation: (state, action: PayloadAction<any>) => {
      state.userCurrentLocation = action.payload;
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
    setEmirates: (state, action: PayloadAction<any>) => {
      state.emirates = action.payload;
    },
    setRecentSearch: (state, action: PayloadAction<any>) => {
      state.recentSearch = action.payload;
    },
    setPackages: (state, action: PayloadAction<any>) => {
      state.packages = action.payload;
    },
    setGuestUserModal: (state, action: PayloadAction<boolean>) => {
      state.guestUserModal = action.payload;
    },

    clearToken: () => ({...initialState}),
  },
});

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // Only persist these fields
  whitelist: [
    'token',
    'userInfo',
    'language',
    'isProvider',
    'guestUser',
    'fcmToken',
    'recentSearch',
  ],
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
  setIsProvider,
  setDashboard,
  clearToken,
  setDropDownCategories,
  setDropDownSubCategories,
  setPackages,
  setGuestLogin,
  setGuestUserModal,
  setEmirates,
  setUserLocation,
  setAppData,
  setRecentSearch,
} = authSlice.actions;

// Selectors
export const selectToken = (state: RootState) => state.auth.token;

export const selectUser = (state: RootState) => state.auth.userInfo;

// Helper selector to check if token is expired

export default persistedAuthReducer;
