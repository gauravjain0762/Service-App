/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Image} from 'react-native';
import React, {useEffect} from 'react';
import {SCREENS} from '../navigation/screenNames';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {resetNavigation} from '../components/common/commonFunction';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {IMAGES} from '@/assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {hp} from '@/utils/responsiveFn';
import {setGuestLogin} from '@/features/authSlice';
import {setLanguages} from '@/Hooks/asyncStorage';

const SplashScreen = () => {
  const dispatch = useAppDispatch();
  const {
    token: authToken,
    isProvider,
    guestUser,
    language,
  } = useAppSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      getToken();
    }, 800);
  }, []);

  const getToken = async () => {
    try {
      await dispatch(setLanguages(language));
      if (authToken) {
        if (guestUser) {
          dispatch(setGuestLogin(true));
        }
        resetNavigation(
          isProvider === false
            ? SCREENS.SeekerNavigator
            : SCREENS.ProviderNavigator,
        );
      } else {
        resetNavigation(SCREENS.OnBoarding);
      }
    } catch (error) {
      console.log(error);
      resetNavigation(SCREENS.OnBoarding);
    }
  };

  return (
    <SafeAreaView edges={[]} style={GeneralStyle.flex}>
      <Image
        resizeMode="cover"
        source={IMAGES.service_splash}
        style={{height: hp(1100), width: '100%', bottom: '10%'}}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
