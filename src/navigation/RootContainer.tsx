import {StatusBar} from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';
import StackNavigator from './StackNavigator';
import {Colors} from '../constants/Colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GeneralStyle} from '../constants/GeneralStyle';

export const navigationRef = createNavigationContainerRef<any>();

const RootContainer: FC = () => {
  // const loginModal = useSelector((state: RootState) => state.auth?.loginModal);
  useEffect(() => {
    // requestNotificationUserPermission(dispatch);
    // onMessage();
    // onBackgroundNotificationPress();
    // openAppNotificationEvent();
    // onNotificationPress();
  }, []);

  return (
    <SafeAreaProvider style={GeneralStyle.flex}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
        <StackNavigator />
        {/* {isLoading && <Loader />} */}

        {/* {loginModal && <LoginModal isVisible={loginModal} />} */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootContainer;
