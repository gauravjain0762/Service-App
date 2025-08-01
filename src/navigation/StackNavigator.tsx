import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from './screenNames';
import OnBoarding from '@/screens/OnBoarding';
import ProviderNavigator from './Provider/navigation';
import SplashScreen from '@/screens/SplashScreen';
import SeekerNavigator from './Seeker/navigation';

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
  ];
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      //  initialRouteName={SCREENS.Splash}>
      initialRouteName={SCREENS.SeekerNavigator}>
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
