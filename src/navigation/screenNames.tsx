export const SCREENS = {
  Dashboard: 'Dashboard',
  LoginScreen: 'LoginScreen',
  Splash: 'Splash',
  SignUpScreen: 'SignUpScreen',
  OtpVerifyScreen: 'OtpVerifyScreen',
  TabNavigation: 'TabNavigation',
};

export interface ScreenNames {
  [key: string]: string;
  
  LoginScreen: string;
  Splash: string;
  
}

export const SCREEN_NAMES: ScreenNames = {
  ...SCREENS,
};
