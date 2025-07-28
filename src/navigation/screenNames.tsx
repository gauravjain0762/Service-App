export const SCREENS = {
  OnBoarding: 'OnBoarding',
  ProviderNavigator: 'ProviderNavigator',
  SeekerStackNavigator: 'SeekerStackNavigator',
  Dashboard: 'Dashboard',
  LoginScreen: 'LoginScreen',
  Splash: 'Splash',
  SignUpScreen: 'SignUpScreen',
  OtpVerifyScreen: 'OtpVerifyScreen',
  TabNavigation: 'TabNavigation',
};

export const SEEKER_SCREENS = {
  Dashboard: 'Dashboard',
  LoginScreen: 'LoginScreen',
  Splash: 'Splash',
  SignUpScreen: 'SignUpScreen',
  OtpVerifyScreen: 'OtpVerifyScreen',
  TabNavigation: 'TabNavigation',
};

export const PROVIDER_SCREENS = {
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
