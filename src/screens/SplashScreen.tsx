/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {SCREENS} from '../navigation/screenNames';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {resetNavigation} from '../components/common/commonFunction';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {Animation, IMAGES} from '@/assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {hp, SCREEN_HEIGHT, SCREEN_WIDTH} from '@/utils/responsiveFn';
import {setGuestLogin} from '@/features/authSlice';
import {setLanguages} from '@/Hooks/asyncStorage';
import LottieView from 'lottie-react-native';
import {Colors} from '@/constants/Colors';
import { useGetAppDataQuery } from '@/api/Seeker/homeApi';

const SplashScreen = () => {
  const dispatch = useAppDispatch();
  const {} = useGetAppDataQuery({});

  const {
    token: authToken,
    isProvider,
    guestUser,
    language,
  } = useAppSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      getToken();
    }, 3500);
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
    <SafeAreaView edges={[]} style={[GeneralStyle.flex,{backgroundColor: Colors.seeker_primary,}]}>
      <View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: Colors.seeker_primary,
        }}>
        <LottieView
          autoPlay
          loop={false}
          source={Animation.splash_animation}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: Colors.seeker_primary,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
