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
  UserProfile: 'UserProfile',
  HomeScreen: 'HomeScreen',
  SearchScreen: 'SearchScreen',
  ProfileDetail: 'ProfileDetail',
  ProRequestDetail: 'ProRequestDetail',
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
  Profile: 'Profile',
  UserProfile: 'UserProfile',
  ForgotPassword: 'ForgotPassword',
  EmailVerification: 'EmailVerification',
  CreateNewPass: 'CreateNewPass',
  HomeScreen: 'HomeScreen',
  SearchScreen: 'SearchScreen',
};

export const PROVIDER_SCREENS = {
  ProDashboard: 'ProDashboard',
  ProLoginScreen: 'ProLoginScreen',
  Splash: 'Splash',
  SignUpScreen: 'SignUpScreen',
  OtpVerifyScreen: 'OtpVerifyScreen',
  TabNavigation: 'TabNavigation',
  TermsWebScreen: 'TermsWebScreen',
  ProSignupScreen: 'ProSignupScreen',
  ProviderTabNavigation: 'ProviderTabNavigation',
  ProMyBookings: 'ProMyBookings',
  ProProfile: 'ProProfile',
  NewRequestScreen: 'NewRequestScreen',
  ProfileDetail: 'ProfileDetail',
  ProRequestDetail: 'ProRequestDetail',
};

export interface ScreenNames {
  [key: string]: string;

  LoginScreen: string;
  Splash: string;
}

export const SCREEN_NAMES: ScreenNames = {
  ...SCREENS,
};
