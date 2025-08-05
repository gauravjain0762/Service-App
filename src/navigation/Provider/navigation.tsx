import {FC} from 'react';
import {PROVIDER_SCREENS} from '../screenNames';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TermsWebScreen from '@/screens/SeekerScreens/Auth/TermsWebScreen';
import ProLoginScreen from '@/screens/ProviderScreens/Auth/ProLoginScreen';
import ProSignupScreen from '@/screens/ProviderScreens/Auth/ProSignupScreen';
import ProviderTabNavigation from './ProviderTabNavigation';

export type RootStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<any>();

const ProviderNavigator: FC = () => {
  let screens = [
    {name: PROVIDER_SCREENS.ProLoginScreen, component: ProLoginScreen},
    {name: PROVIDER_SCREENS.ProSignupScreen, component: ProSignupScreen},
    {name: PROVIDER_SCREENS.TermsWebScreen, component: TermsWebScreen},
    {name: PROVIDER_SCREENS.ProviderTabNavigation, component: ProviderTabNavigation},

  ];
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={PROVIDER_SCREENS.ProLoginScreen}>
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
