export const SCREENS = {
  OnBoarding: 'OnBoarding',
  ProviderNavigator: 'ProviderNavigator',
  SeekerNavigator: 'SeekerNavigator',
  Dashboard: 'Dashboard',
  LoginScreen: 'LoginScreen',
  Splash: 'Splash',
  SignUpScreen: 'SignUpScreen',
  OtpVerifyScreen: 'OtpVerifyScreen',
  SeekerTabNavigation: 'SeekerTabNavigation',
  MyBookings: 'My Bookings',
  Offers: 'Offers',
  OffersDetail: 'Offers Detail',
  AddCard: "Add Card"
};

export const SEEKER_SCREENS = {
  Dashboard: 'Dashboard',
  LoginScreen: 'LoginScreen',
  Splash: 'Splash',
  SignUpScreen: 'SignUpScreen',
  OtpScreen: 'OtpScreen',
  SeekerTabNavigation: 'SeekerTabNavigation',
  MyBookings: 'My Bookings',
  Offers: 'Offers',
  OffersDetail: 'Offers Detail',
  AddCard: "Add Card"
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
