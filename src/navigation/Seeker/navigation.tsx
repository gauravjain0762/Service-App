import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from '../TabNavigation';
import OTPScreen from '@/screens/auth/OTPScreen';
import {SEEKER_SCREENS} from '../screenNames';
import LoginScreen from '@/screens/SeekerScreens/Auth/LoginScreen';

export type RootStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<any>();

const ProviderNavigator: FC = () => {
  let screens = [
    {name: SEEKER_SCREENS.Dashboard, component: LoginScreen},
    {name: SEEKER_SCREENS.TabNavigation, component: TabNavigation},
    {name: SEEKER_SCREENS.OtpVerifyScreen, component: OTPScreen},
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
export default ProviderNavigator;
