import { setLanguage } from '@/features/authSlice';
import i18n from '@/i18n/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

export const asyncKeys = {
  // clear in logout time
  token: '@token',
  user_info: '@user_info',
  language: '@Language',
  fcmToken: '@fcmToken',
  recentSearches: '@recentSearches',
  rememberMe: '@rememberMe',
  phoneNumber: '@phoneNumber',
  biometricPublicKey: '@biometricPublicKey',
  faceIDEnabled: '@faceIDEnabled',
  recentLocationSearches: '@recentLocationSearches',
};

export const setLanguages = (code: any):any => async(dispatch: any) => {
  await i18n.changeLanguage(code || 'en'); 
  await setAsyncLanguage(code);
  await dispatch(setLanguage(code || 'en'));
};

export const clearAsync = async () => {
  await AsyncStorage.multiRemove([asyncKeys.token, asyncKeys.user_info]);
};

export const clearLoginAsync = async () => {
  await AsyncStorage.multiRemove([asyncKeys.rememberMe, asyncKeys.phoneNumber]);
};

export const setAsyncRememberMe = async (value: string) => {
  await AsyncStorage.setItem(asyncKeys.rememberMe, JSON.stringify(value));
};
export const getAsyncRememberMe = async () => {
  const value = await AsyncStorage.getItem(asyncKeys.rememberMe);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
};
export const setAsyncPhoneNumber = async (value: string) => {
  await AsyncStorage.setItem(asyncKeys.phoneNumber, JSON.stringify(value));
};

export const getAsyncPhoneNumber = async () => {
  const value = await AsyncStorage.getItem(asyncKeys.phoneNumber);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
};

export const setAsyncToken = async (token: string) => {
  await AsyncStorage.setItem(asyncKeys.token, JSON.stringify(token));
};

export const getAsyncToken = async () => {
  const token = await AsyncStorage.getItem(asyncKeys.token);
  if (token) {
    return `${JSON.parse(token)}`;
  } else {
    return null;
  }
};

export const setAsyncUserInfo = async (user: any) => {
  await AsyncStorage.setItem(asyncKeys.user_info, JSON.stringify(user));
};

export const getAsyncUserInfo = async () => {
  const userInfo = await AsyncStorage.getItem(asyncKeys.user_info);
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return null;
  }
};

export const setAsyncFCMToken = async (token: any) => {
  await AsyncStorage.setItem(asyncKeys.fcmToken, JSON.stringify(token));
};

export const getAsyncFCMToken = async () => {
  const token = await AsyncStorage.getItem(asyncKeys.fcmToken);
  if (token) {
    return JSON.parse(token);
  } else {
    return null;
  }
};

export const setAsyncLanguage = async (value: any) => {
  await AsyncStorage.setItem(asyncKeys.language, JSON.stringify(value));
};

export const getAsyncLanguage = async () => {
  const value = await AsyncStorage.getItem(asyncKeys.language);
  if (value) {
    return JSON.parse(value);
  } else {
    return 'en';
  }
};
export const setAsyncBiometricPublicKey = async (credentials: any) => {
  await AsyncStorage.setItem(
    asyncKeys.biometricPublicKey,
    JSON.stringify(credentials),
  );
};

export const getAsyncBiometricPublicKey = async () => {
  const value = await AsyncStorage.getItem(asyncKeys.biometricPublicKey);
  if (value) {
    return JSON.parse(value);
  } else {
    return '';
  }
};
export const setAsyncFaceIDEnabled = async (enabled: any) => {
  await AsyncStorage.setItem(asyncKeys.faceIDEnabled, JSON.stringify(enabled));
};
export const getAsyncFaceIDEnabled = async () => {
  const value = await AsyncStorage.getItem(asyncKeys.faceIDEnabled);
  if (value) {
    return JSON.parse(value);
  } else {
    return 'false';
  }
};

export const setRecentSearches = async (searches: any) => {
  await AsyncStorage.setItem(
    asyncKeys.recentSearches,
    JSON.stringify(searches),
  );
};

export const getRecentSearches = async () => {
  const searches = await AsyncStorage.getItem(asyncKeys.recentSearches);
  return searches ? JSON.parse(searches) : [];
};

export const setRecentLocationSearches = async (searches: any) => {
  await AsyncStorage.setItem(
    asyncKeys.recentLocationSearches,
    JSON.stringify(searches),
  );
};

export const getRecentLocationSearches = async () => {
  const searches = await AsyncStorage.getItem(asyncKeys.recentLocationSearches);
  return searches ? JSON.parse(searches) : [];
};
