import {
  configureStore,
  combineReducers,
  AnyAction,
  Middleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {setupListeners} from '@reduxjs/toolkit/query';
import persistedAuthReducer from '../features/authSlice';
import {loadingMiddleware} from './middleware/loadingMiddleware';
import {authApi} from '../api/Seeker/authApi';
import loaderReducer from '../features/loaderSlice';
import {profileApi} from '@/api/Seeker/profileApi';
import {homeApi} from '@/api/Seeker/homeApi';
import {providerAuthApi} from '@/api/Provider/authApi';
import {providerHomeApi} from '@/api/Provider/homeApi';
import {addressApi} from '@/api/Seeker/addressApi';
import { providerProfileApi } from '@/api/Provider/profileApi';

// Persisted reducer from your slice

// RTK Query API slice

// 1) Root‐reducer, with a reset action handler
const appReducer = combineReducers({
  auth: persistedAuthReducer, // ← use the persisted reducer here
  loader: loaderReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,

  // Provider API
  [providerAuthApi.reducerPath]: providerAuthApi.reducer,
  [providerHomeApi.reducerPath]: providerHomeApi.reducer,
  [providerProfileApi.reducerPath]: providerProfileApi.reducer,
  // [authApi.reducerPath]: authApi.reducer, // RTK Query for cached data all HTTP requests

  // Add other reducers here
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};

// 2) Analytics middleware (tight types)
const analyticsMiddleware: Middleware =
  ({}: {getState: () => any}) =>
  (next: any) =>
  (action: any) => {
    if (
      action.type === 'auth/setAuthToken' ||
      action.type === 'auth/clearToken' ||
      action.type.endsWith('/fulfilled') ||
      action.type.endsWith('/rejected')
    ) {
      if (__DEV__) {
        console.log('[ANALYTICS]', action.type);
      }
    }
    return next(action);
  };

// 3) Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredPaths: [
        //   'usersApi.queries',
        //   'requestApi.queries',
        // ],
      },
      immutableCheck: {warnAfter: 300}, // dev-only
    })
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
      .concat(homeApi.middleware)
      .concat(addressApi.middleware)

      // Provider API
      .concat(providerAuthApi.middleware)
      .concat(providerHomeApi.middleware)
      .concat(providerProfileApi.middleware)
      // .concat(authApi.middleware) // RTK Query
      .concat(loadingMiddleware) // your loader counter
      .concat(analyticsMiddleware), // logging
  devTools: __DEV__,
});

// setStoreInstance(store);

// 4) Persistor & listeners
export const persistor = persistStore(store);
setupListeners(store.dispatch);

// 5) Types & reset helper
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const resetStore = () => {
  persistor.purge();
  store.dispatch({type: 'RESET_STORE'});
  persistor.persist();
};
