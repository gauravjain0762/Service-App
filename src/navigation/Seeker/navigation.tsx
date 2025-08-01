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

export type RootStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<any>();

const SeekerNavigator: FC = () => {
  let screens = [
    {name: SEEKER_SCREENS.LoginScreen, component: LoginScreen},
    {name: SEEKER_SCREENS.SignUpScreen, component: SignUpScreen},
    {name: SEEKER_SCREENS.OtpScreen, component: OTPScreen},
    {name: SEEKER_SCREENS.MyBookings, component: MyBookings},
    {name: SEEKER_SCREENS.Offers, component: Offers},
    {name: SEEKER_SCREENS.OffersDetail, component: OffersDetails},
    {name: SEEKER_SCREENS.AddCard, component: AddCard},
    {name: SEEKER_SCREENS.SeekerTabNavigation, component: SeekerTabNavigation},
  ];
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SEEKER_SCREENS.MyBookings}>
      {/* initialRouteName={SEEKER_SCREENS.SeekerTabNavigation}> */}
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
