import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { IMAGES } from '../../assets/Images';
import { SCREEN_NAMES } from '../../navigation/screenNames';
import { getAsyncToken, getAsyncUserInfo } from '../../Hooks/asyncStorage';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { setAuthToken, setUserInfo } from '../../features/authSlice';
import { useAppDispatch } from '../../Hooks/hooks';
import { resetNavigation } from '../../components/common/commonFunction';

const SplashScreen = () => {
  const { userInfo: userData, token: authToken } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    setTimeout(() => {
      // SplashScreen.hide();
      getToken();
    }, 2300);
  }, []);

  const dispatch = useAppDispatch();
  const getToken = async () => {
    let token = await getAsyncToken();
    if (authToken || token) {
      let tempUserData = await getAsyncUserInfo();
      // await setAuthorization(token?.split(' ')[1]);
      dispatch(setAuthToken(authToken || token));

      if (userData && Object.keys(userData).length !== 0) {
        dispatch(setUserInfo(userData));
      } else if (tempUserData && Object.keys(tempUserData).length !== 0) {
        dispatch(setUserInfo(tempUserData));
      }
      resetNavigation(SCREEN_NAMES.TabNavigation);
    } else {
      resetNavigation(SCREEN_NAMES.LoginScreen);
    }
  };

  const onError = () => {};
  const onBuffer = () => {};

  return (
    <View style={{ flex: 1 }}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
