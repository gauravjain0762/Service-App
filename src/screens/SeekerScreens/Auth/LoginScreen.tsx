import {Platform, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '@/components/common/CustomTextInput';
import CustomButton from '@/components/common/CustomButton';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';

import {Colors} from '@/constants/Colors';
import {
  alignSelfLTR,
  alignSelfRTL,
  flipImage,
  rowReverseRTL,
} from '@/utils/arabicStyles';
import CommonText from '@/components/common/CommonText';
import CustomImage from '@/components/common/CustomImage';
import {IMAGES} from '@/assets/images';
import {
  emailCheck,
  errorToast,
  goBack,
  navigateTo,
  resetNavigation,
  successToast,
} from '@/components/common/commonFunction';
import {SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import TermsCheckBox from '@/components/common/TermsCheckBox';
import {
  useAppleSignInMutation,
  useGoogleSignInMutation,
  useGuestLoginMutation,
  useLoginMutation,
} from '@/api/Seeker/authApi';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {jwtDecode} from 'jwt-decode';

import {appleAuth} from '@invertase/react-native-apple-authentication';
import {WEB_CLIENT_ID} from '@/utils/constants/api';
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';
import {getAsyncFCMToken, setAsyncFCMToken} from '@/Hooks/asyncStorage';
import {setFcmToken} from '@/features/authSlice';

const LoginScreen = ({}: any) => {
  const {fcmToken} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const [details, setDetails] = useState({
    email: __DEV__ ? 'test@gmail.com' : '',
    password: __DEV__ ? 'Test@123' : '',
  });
  const [login, {isLoading}] = useLoginMutation();
  const [guestLogin, {isLoading: isGuestLoading}] = useGuestLoginMutation();
  const [appleLogin] = useAppleSignInMutation();
  const [googleLogin] = useGoogleSignInMutation();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    const oldFcmToken = await getAsyncFCMToken();
    setAsyncFCMToken(oldFcmToken);
    dispatch(setFcmToken(oldFcmToken));
  };
  const onGuestUser = async () => {
    let data = {
      device_token: fcmToken || 's',
      device_type: Platform.OS,
    };
    const response = await guestLogin(data).unwrap();
  };
  const onLogin = async () => {
    try {
      if (!emailCheck(details.email)) {
        errorToast('Please enter valid email');
        return;
      }
      if (!details.password.trim()) {
        errorToast('Enter a password');
        return;
      }
      if (details.password.length < 6) {
        errorToast('Password must be at least 6 characters');
        return;
      }

      let obj = {
        email: details.email.toLowerCase(),
        password: details.password,
        device_token: fcmToken,
      };
      const response = await login(obj).unwrap();
      console.log('response', response);

      if (response?.status) {
        // successToast(response?.message);
        // resetNavigation(SEEKER_SCREENS.SeekerTabNavigation);
        resetNavigation(SCREENS.SeekerNavigator);
      } else {
        errorToast(response?.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.message || error?.data?.message || 'Something went wrong',
      );
    }
  };

  const onGoogleButtonPress = async () => {
    setLoading(true);
    GoogleSignin.configure({webClientId: WEB_CLIENT_ID});
    try {
      await GoogleSignin.hasPlayServices();

      const {data: userInfo} = await GoogleSignin.signIn();

      let data = {
        name: userInfo?.user?.name,
        email: userInfo?.user.email,
        googleId: userInfo?.user?.id,
        device_token: fcmToken,
        device_type: Platform.OS.toUpperCase(),
      };
      console.log('data', data);

      const response = await googleLogin(data).unwrap();

      if (response?.status) {
        setLoading(false);
        // successToast(response?.message);
        // resetNavigation(SEEKER_SCREENS.SeekerTabNavigation);
        resetNavigation(SCREENS.SeekerNavigator);
      }
    } catch (error: any) {
      setLoading(false);
      console.log('onGoogleButtonPress => error => ', error);
      errorToast(error?.message || 'Google sign-in failed');
    }
  };
  const onAppleButtonPress = async () => {
    try {
      // Start the sign-in request
      setLoading(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }
      // Create a Firebase credential from the response
      const {identityToken, fullName, email} = appleAuthRequestResponse;

      if (identityToken) {
        const decoded: any = jwtDecode(identityToken);

        var str = decoded?.email || '';
        str = str.split('@');
        let data = {
          name: fullName?.givenName || str[0],
          email: email || decoded?.email,
          appleId: appleAuthRequestResponse.user,
          device_token: fcmToken,
        };

        const response = await appleLogin(data).unwrap();
        if (response?.status) {
          setLoading(false);

          // successToast(response?.message);
          // resetNavigation(SEEKER_SCREENS.SeekerTabNavigation);
          resetNavigation(SCREENS.SeekerNavigator);
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.log('onAppleButtonPress => error => ', error);
      errorToast(
        error?.message || error?.data?.message || 'Apple Sign-In failed',
      );
    }
  };

  return (
    <SafeareaProvider loading={loading} style={{backgroundColor: Colors.white}}>
      <CustomImage
        onPress={() => {
          goBack();
        }}
        source={IMAGES.backArrow}
        size={getFontSize(2.5)}
        containerStyle={{
          padding: getFontSize(2),
          ...alignSelfLTR(),
        }}
        imageStyle={{...flipImage()}}
      />
      <KeyboardAwareScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(30), flexGrow: 1}}
        enableOnAndroid
        extraHeight={hp(200)}
        style={styles.container}>
        <CommonText text="Login to Your Account" style={styles.topLabel} />
        <View style={{gap: hp(20)}}>
          <CustomTextInput
            placeholder="Email"
            value={details.email}
            onChangeText={e => setDetails({...details, email: e})}
          />
          <CustomTextInput
            placeholder="Password"
            secureTextEntry={true}
            value={details.password}
            onChangeText={e => setDetails({...details, password: e})}
          />
          <CommonText
            text="Forgot Password?"
            style={styles.forgotPasswordText}
            onPress={() => navigateTo(SEEKER_SCREENS.ForgotPassword)}
          />
          {/* <TermsCheckBox
            isSeeker={true}
            toggleCheckBox={toggleCheckBox}
            setToggleCheckBox={setToggleCheckBox}
            checkedCheckBoxColor={Colors.seeker_primary}
            isChecked={toggleCheckBox}
            onClick={() => setToggleCheckBox(!toggleCheckBox)}
          /> */}
        </View>

        <View style={{marginTop: hp(50), gap: hp(30)}}>
          <CustomButton
            loading={isLoading}
            disabled={details.email && details.password ? false : true}
            isPrimary="seeker"
            title={'Login'}
            onPress={onLogin}
          />
          <CustomButton
            isPrimary="seeker"
            title={'Login as a Guest'}
            type="outline"
            loading={isGuestLoading}
            onPress={onGuestUser}
          />
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <CommonText text="or continue with" style={styles.label} />
          <View style={styles.divider} />
        </View>

        <View style={styles.socialContainer}>
          <CustomImage
            source={IMAGES.google}
            size={getFontSize(2.5)}
            containerStyle={styles.socialBtn}
            onPress={onGoogleButtonPress}
          />

          <CustomImage
            source={IMAGES.apple}
            size={getFontSize(2.5)}
            containerStyle={styles.socialBtn}
            onPress={onAppleButtonPress}
          />
        </View>

        <CommonText
          onPress={() => navigateTo(SEEKER_SCREENS.SignUpScreen)}
          text="Don't have an account?"
          style={styles.accountText}>
          {' '}
          <CommonText text="Sign Up" style={styles.signUpAccountText} />
        </CommonText>
      </KeyboardAwareScrollView>
    </SafeareaProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getFontSize(2.2),
    paddingTop: getFontSize(7),
  },
  topLabel: {
    ...commonFontStyle(600, 3.4, Colors.black),
    textAlign: 'center',
    paddingBottom: getFontSize(5),
  },

  midContainer: {
    ...rowReverseRTL(),
    alignItems: 'center',
    gap: 10,
    marginLeft: getFontSize(0.5),
    marginTop: hp(10),
  },

  accountText: {
    ...commonFontStyle(400, 2, Colors._909090),
    textAlign: 'center',
    paddingTop: hp(35),
  },

  signUpAccountText: {
    ...commonFontStyle(600, 2, Colors.seeker_primary),
  },
  checkBoxText: {
    ...commonFontStyle(400, 1.9, Colors._5E5D5D),
  },
  checkBoxText2: {
    ...commonFontStyle(400, 1.9, Colors.seeker_primary),
  },

  dividerContainer: {
    ...rowReverseRTL(),
    alignItems: 'center',
    paddingVertical: hp(30),
    marginHorizontal: wp(23),
  },
  label: {
    ...commonFontStyle(400, 1.9, Colors._6B6969),
    paddingHorizontal: wp(15),
  },
  divider: {
    flex: 1,
    height: hp(1),
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  socialContainer: {
    ...rowReverseRTL(),
    alignItems: 'center',
    alignSelf: 'center',
    gap: getFontSize(3),
  },

  socialBtn: {
    borderWidth: 1.5,
    borderColor: Colors._F3F3F3,
    borderRadius: getFontSize(2),
    height: getFontSize(6),
    width: getFontSize(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    ...commonFontStyle(400, 1.9, Colors.seeker_primary),
    textAlign: 'right',
    paddingRight: getFontSize(0.5),
    marginTop: hp(4),
  },
});
