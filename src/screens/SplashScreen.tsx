/* eslint-disable react-hooks/exhaustive-deps */
import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SCREEN_NAMES} from '../navigation/screenNames';
import {getAsyncToken, getAsyncUserInfo} from '../Hooks/asyncStorage';
import {RootState} from '../store';
import {useSelector} from 'react-redux';
import {setAuthToken, setUserInfo} from '../features/authSlice';
import {useAppDispatch} from '../Hooks/hooks';
import {resetNavigation} from '../components/common/commonFunction';
import {GeneralStyle} from '@/constants/GeneralStyle';

const SplashScreen = () => {
  const {userInfo: userData, token: authToken} = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    setTimeout(() => {
      getToken();
    }, 200);
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
      resetNavigation(SCREEN_NAMES.OnBoarding);
    }
  };

  return (
    <View style={GeneralStyle.flex}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
