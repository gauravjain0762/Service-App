import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from '../TabNavigation';
import {SEEKER_SCREENS} from '../screenNames';
import LoginScreen from '@/screens/SeekerScreens/Auth/LoginScreen';
import SignUpScreen from '@/screens/SeekerScreens/Auth/SignUpScreen';
import OTPScreen from '@/screens/SeekerScreens/Auth/OTPScreen';

export type RootStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<any>();

const SeekerNavigator: FC = () => {
  let screens = [
    {name: SEEKER_SCREENS.LoginScreen, component: LoginScreen},
    {name: SEEKER_SCREENS.SignUpScreen, component: SignUpScreen},
    {name: SEEKER_SCREENS.OtpScreen, component: OTPScreen},
    {name: SEEKER_SCREENS.TabNavigation, component: TabNavigation},
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
