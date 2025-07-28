import {FC} from 'react';
import TabNavigation from './TabNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from './screenNames';
import LoginScreen from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import OTPScreen from '../screens/auth/OTPScreen';

export type RootStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<any>();

const StackNavigator: FC = () => {
  let screens = [
    {name: SCREENS.Splash, component: SplashScreen},
    {name: SCREENS.LoginScreen, component: LoginScreen},
    {name: SCREENS.TabNavigation, component: TabNavigation},
    {name: SCREENS.OtpVerifyScreen, component: OTPScreen},
  ];
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREENS.Splash}>
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
export default StackNavigator;
