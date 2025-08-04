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
  AddCard: 'Add Card',
  SetLocation: 'Set Location',
  Notifications: 'Notifications',
  JobDetails: 'JobDetails',
  TermsWebScreen: 'TermsWebScreen',
  Home: 'Home',
  MyRequest: 'My Request',
  MyBookingsTab: 'My BookingsTab',
  Profile: 'Profile',
};

export const SEEKER_SCREENS = {
  Dashboard: 'Dashboard',
  LoginScreen: 'LoginScreen',
  Splash: 'Splash',
  SignUpScreen: 'SignUpScreen',
  OtpScreen: 'OtpScreen',
  SeekerTabNavigation: 'SeekerTabNavigation',
  MyBookings: 'My Bookings',
  MyBookingsTab: 'My BookingsTab',
  Offers: 'Offers',
  OffersDetail: 'Offers Detail',
  AddCard: 'Add Card',
  SetLocation: 'Set Location',
  Notifications: 'Notifications',
  JobDetails: 'JobDetails',
  TermsWebScreen: 'TermsWebScreen',
  Home: 'Home',
  MyRequest: 'My Request',
  Profile: "Profile"
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
