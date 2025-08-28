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
import {
  onBackgroundNotificationPress,
  onMessage,
  onNotificationPress,
  openAppNotificationEvent,
  requestNotificationUserPermission,
} from '@/Hooks/notificationHandler';
import {useAppDispatch} from '@/Hooks/hooks';
import GuestModal from '@/components/modals/GuestModal';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

export const navigationRef = createNavigationContainerRef<any>();

const RootContainer: FC = () => {
  // const loginModal = useSelector((state: RootState) => state.auth?.loginModal);
  const guestUserModal = useSelector((state: RootState) => state.auth?.guestUserModal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    requestNotificationUserPermission(dispatch);
    onMessage();
    onBackgroundNotificationPress();
    openAppNotificationEvent();
    onNotificationPress();
  }, [dispatch]);

  return (
    <SafeAreaProvider style={GeneralStyle.flex}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
        <StackNavigator />
        {/* {isLoading && <Loader />} */}

        {/* {loginModal && <LoginModal isVisible={loginModal} />} */}
        {guestUserModal && <GuestModal visible={guestUserModal} />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootContainer;
