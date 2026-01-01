import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import CustomTextInput from '@/components/common/CustomTextInput';
import PhoneInput from '@/components/common/PhoneInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '@/components/common/CustomButton';
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
import {flipImage, rowReverseRTL} from '@/utils/arabicStyles';
import {SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {
  useAppleSignInMutation,
  useGoogleSignInMutation,
  useGuestLoginMutation,
  useSignUpMutation,
} from '@/api/Seeker/authApi';
import {useAppSelector} from '@/Hooks/hooks';
import {jwtDecode} from 'jwt-decode';
import appleAuth from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '@/utils/constants/api';
import TermsCheckBox from '@/components/common/TermsCheckBox';

const SignUpScreen = () => {
  const [signUp, {isLoading}] = useSignUpMutation();
  const {fcmToken, language} = useAppSelector(state => state.auth);
  const [guestLogin, {isLoading: isGuestLoading}] = useGuestLoginMutation();
  const [appleLogin] = useAppleSignInMutation();
  const [googleLogin] = useGoogleSignInMutation();
  const [loading, setLoading] = React.useState(false);

  const [callingCode, setCallingCode] = React.useState('971');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const [userData, setUserData] = React.useState<any>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const onSignUp = async () => {
    try {
      if (!toggleCheckBox) {
        errorToast('Please check the terms of use');
        return;
      } else if (!userData?.name.trim()) {
        errorToast('Enter a full name');
      } else if (!userData?.email.trim()) {
        errorToast('Enter a Email');
      } else if (!emailCheck(userData?.email.trim().toLocaleLowerCase())) {
        errorToast('Please enter a valid email');
      } else if (!userData?.phone.trim()) {
        errorToast('Enter a phone number');
      } else if (userData?.phone.length < 9 || userData?.phone.length > 12) {
        errorToast('Enter a valid phone number');
        return;
      } else if (!userData?.password.trim()) {
        errorToast('Please enter password');
      } else if (userData?.password.length < 6) {
        errorToast('Password must be at least 6 characters');
        return;
      } else {
        let obj = {
          name: userData?.name.trim(),
          email: userData?.email.trim().toLowerCase(),
          password: userData?.password.trim(),
          phone_code: callingCode,
          phone: userData.phone,
          device_token: fcmToken,
        };

        const response = await signUp(obj).unwrap();

        if (response?.status) {
          navigateTo(SEEKER_SCREENS.OtpScreen, {
            userId: response?.data?.user?._id,
            phone: callingCode + userData.phone,
            isProvider: false,
            email: userData?.email.trim().toLowerCase(),
          });
          // successToast(response?.message);
        } else {
          errorToast(response?.message);
        }
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

  const onGuestUser = async () => {
    let data = {
      device_token: fcmToken || 's',
      device_type: Platform.OS,
    };
    const response = await guestLogin(data).unwrap();
  };
  return (
    <SafeareaProvider loading={loading} style={{backgroundColor: Colors.white}}>
      <KeyboardAwareScrollView
        nestedScrollEnabled
        enableResetScrollToCoords={false}
        style={styles.container}
        contentContainerStyle={{paddingBottom: hp(30), flexGrow: 1}}
        enableOnAndroid
        extraHeight={hp(200)}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <CustomImage
            size={hp(20)}
            disabled={false}
            onPress={() => goBack()}
            source={IMAGES.backArrow2}
            imageStyle={{...flipImage(language)}}
          />
          <CommonText text="Create New Account" style={styles.topLabel} />
        </View>
        <View style={{gap: hp(20), marginTop: hp(45)}}>
          <CustomTextInput
            placeholder="Full name"
            value={userData?.name}
            onChangeText={e => {
              setUserData({...userData, name: e});
            }}
          />
          <CustomTextInput
            placeholder="Email"
            value={userData?.email}
            onChangeText={e => {
              setUserData({...userData, email: e});
            }}
            keyboardType="email-address"
          />
          <PhoneInput
            placeholder="00 000 0000"
            value={userData?.phone}
            onChangeText={e => {
              setUserData({...userData, phone: e});
            }}
            callingCode={callingCode}
            setCallingCode={setCallingCode}
            maxLength={9}
            containerStyle={{marginBottom: 0}}
          />
          <CustomTextInput
            placeholder="Password"
            value={userData?.password}
            onChangeText={e => {
              setUserData({...userData, password: e});
            }}
            secureTextEntry={true}
          />
        </View>

        <View style={{marginTop: hp(52), gap: hp(20)}}>
          <TermsCheckBox
            toggleCheckBox={toggleCheckBox}
            setToggleCheckBox={setToggleCheckBox}
            checkedCheckBoxColor={Colors.seeker_primary}
            isChecked={toggleCheckBox}
            isSeeker={true}
            onClick={() => setToggleCheckBox(!toggleCheckBox)}
          />
          <CustomButton
            isPrimary="seeker"
            loading={isLoading}
            title={'Sign Up'}
            onPress={onSignUp}
          />
          <CustomButton
            isPrimary="seeker"
            title={'Login as a Guest'}
            type="outline"
            // onPress={() => resetNavigation(SEEKER_SCREENS.SeekerTabNavigation)}
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

          {Platform.OS === 'ios' && (
            <CustomImage
              source={IMAGES.apple}
              size={getFontSize(2.5)}
              containerStyle={styles.socialBtn}
              onPress={onAppleButtonPress}
            />
          )}
        </View>

        <CommonText
          onPress={() => goBack()}
          text="Already have an account?"
          style={styles.accountText}>
          {' '}
          <CommonText text="Sign In" style={styles.signUpAccountText} />
        </CommonText>
      </KeyboardAwareScrollView>
    </SafeareaProvider>
  );
};

export default SignUpScreen;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      paddingHorizontal: getFontSize(2.2),
      paddingTop: getFontSize(3),
    },
    headerRow: {
      alignItems: 'center',
      ...rowReverseRTL(_language),
      justifyContent: 'space-between',
    },
    topLabel: {
      flex: 3,
      ...commonFontStyle(600, 3.4, Colors.black),
      textAlign: 'center',
    },

    dividerContainer: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      marginHorizontal: wp(23),
      paddingVertical: getFontSize(3),
    },
    label: {
      ...commonFontStyle(400, 1.9, Colors._6B6969),
      paddingHorizontal: getFontSize(1.4),
    },
    divider: {
      height: hp(1),
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      flex: 1,
    },

    socialContainer: {
      ...rowReverseRTL(_language),
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
    accountText: {
      ...commonFontStyle(400, 2, Colors._909090),
      textAlign: 'center',
      paddingTop: hp(35),
    },

    signUpAccountText: {
      ...commonFontStyle(600, 2, Colors.seeker_primary),
    },
  });
};
