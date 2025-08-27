import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from './screenNames';
import OnBoarding from '@/screens/OnBoarding';
import ProviderNavigator from './Provider/navigation';
import SplashScreen from '@/screens/SplashScreen';
import SeekerNavigator from './Seeker/navigation';
import Subscription from '@/screens/Subscription';
import ProviderTabNavigation from './Provider/ProviderTabNavigation';
import SeekerTabNavigation from './Seeker/SeekerTabNavigation';
import WebViewScreen from '@/components/common/WebViewScreen';

export type RootStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<any>();

const StackNavigator: FC = () => {
  let screens = [
    {name: SCREENS.Splash, component: SplashScreen},
    {name: SCREENS.OnBoarding, component: OnBoarding},
    {name: SCREENS.ProviderNavigator, component: ProviderNavigator},
    {name: SCREENS.SeekerNavigator, component: SeekerNavigator},
    {
      name: SCREENS.ProviderTabNavigation,
      component: ProviderTabNavigation,
    },
    {name: SCREENS.SeekerTabNavigation, component: SeekerTabNavigation},
    {name: SCREENS.Subscription, component: Subscription},
    {name: SCREENS.WebViewScreen, component: WebViewScreen},
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
