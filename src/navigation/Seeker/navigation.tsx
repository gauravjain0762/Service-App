import {FC} from 'react';

import {SEEKER_SCREENS} from '../screenNames';
import SeekerTabNavigation from './SeekerTabNavigation';
import OTPScreen from '@/screens/SeekerScreens/Auth/OTPScreen';
import LoginScreen from '@/screens/SeekerScreens/Auth/LoginScreen';
import MyBookings from '@/screens/SeekerScreens/Seekers/MyBookings';
import SignUpScreen from '@/screens/SeekerScreens/Auth/SignUpScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Offers from '@/screens/SeekerScreens/Seekers/Offers';
import OffersDetails from '@/screens/SeekerScreens/Seekers/OffersDetails';
import AddCard from '@/screens/SeekerScreens/Seekers/AddCard';
import SetLocation from '@/screens/SeekerScreens/Seekers/SetLocation';
import Notifications from '@/screens/SeekerScreens/Seekers/Notifications';
import JobDetails from '@/screens/SeekerScreens/Seekers/JobDetails';
import TermsWebScreen from '@/screens/SeekerScreens/Auth/TermsWebScreen';
import UserProfile from '@/screens/SeekerScreens/Seekers/UserProfile';
import ForgotPassword from '@/screens/SeekerScreens/Auth/ForgotPassword';
import EmailVerification from '@/screens/SeekerScreens/Auth/EmailVerification';
import CreateNewPass from '@/screens/SeekerScreens/Auth/CreateNewPass';
import SearchScreen from '@/screens/SeekerScreens/Seekers/SearchScreen';
import HomeScreen from '@/screens/SeekerScreens/Tabs/HomeScreen';
import Subscription from '@/screens/Subscription';

export type RootStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<any>();

const SeekerNavigator: FC = () => {
  let screens = [
    {name: SEEKER_SCREENS.LoginScreen, component: LoginScreen},
    {name: SEEKER_SCREENS.SignUpScreen, component: SignUpScreen},
    {name: SEEKER_SCREENS.OtpScreen, component: OTPScreen},
    {name: SEEKER_SCREENS.TermsWebScreen, component: TermsWebScreen},
    {name: SEEKER_SCREENS.ForgotPassword, component: ForgotPassword},
    {name: SEEKER_SCREENS.EmailVerification, component: EmailVerification},
    {name: SEEKER_SCREENS.MyBookings, component: MyBookings},
    {name: SEEKER_SCREENS.Offers, component: Offers},
    {name: SEEKER_SCREENS.OffersDetail, component: OffersDetails},
    {name: SEEKER_SCREENS.AddCard, component: AddCard},
    {name: SEEKER_SCREENS.SetLocation, component: SetLocation},
    {name: SEEKER_SCREENS.Notifications, component: Notifications},
    {name: SEEKER_SCREENS.JobDetails, component: JobDetails},
    {name: SEEKER_SCREENS.SeekerTabNavigation, component: SeekerTabNavigation},
    {name: SEEKER_SCREENS.UserProfile, component: UserProfile},
    {name: SEEKER_SCREENS.CreateNewPass, component: CreateNewPass},
    {name: SEEKER_SCREENS.SearchScreen, component: SearchScreen},
    {name: SEEKER_SCREENS.HomeScreen, component: HomeScreen},
    {name: SEEKER_SCREENS.Subscription, component: Subscription},
  ];
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SEEKER_SCREENS.LoginScreen}>
      {screens.map((item: any, index: any) => {
        return (
          <Stack.Screen
            name={item.name}
            key={index.toString()}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};
export default SeekerNavigator;
