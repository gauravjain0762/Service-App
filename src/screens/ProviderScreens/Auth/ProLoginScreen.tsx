import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomTextInput from '@/components/common/CustomTextInput';
import CustomButton from '@/components/common/CustomButton';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import {alignSelfRTL, flipImage, rowReverseRTL, textLTR} from '@/utils/arabicStyles';
import CommonText from '@/components/common/CommonText';
import {
  emailCheck,
  errorToast,
  goBack,
  navigateTo,
  resetNavigation,
  successToast,
} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS, SCREENS} from '@/navigation/screenNames';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {useRoute} from '@react-navigation/native';
import {useLoginMutation} from '@/api/Provider/authApi';
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';
import {getAsyncFCMToken, setAsyncFCMToken} from '@/Hooks/asyncStorage';
import {setFcmToken} from '@/features/authSlice';
import CustomImage from '@/components/common/CustomImage';
import {IMAGES} from '@/assets/images';

const ProLoginScreen = ({}: any) => {
  const {fcmToken,language}:any = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {params} = useRoute<any>();
  const isProvider = params?.isProvider;
  const [details, setDetails] = useState({
    email: __DEV__ ? 'company@devicebee.com' : '',
    password: __DEV__ ? '123456' : '',
  });

  const styles = React.useMemo(
      () => getGlobalStyles(language),
      [language],
    );
  const [login, {isLoading}] = useLoginMutation();

  React.useEffect(() => {
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    const oldFcmToken = await getAsyncFCMToken();
    setAsyncFCMToken(oldFcmToken);
    dispatch(setFcmToken(oldFcmToken));
  };
  const onLogin = async () => {
    try {
      if (!emailCheck(details.email)) {
        errorToast('Please enter valid email');
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
        // resetNavigation(PROVIDER_SCREENS.ProviderTabNavigation);
        resetNavigation(SCREENS.ProviderNavigator);
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

  return (
    <SafeareaProvider style={{backgroundColor: Colors.white}}>
      <CustomImage
        onPress={() => {
          goBack();
        }}
        source={IMAGES.backArrow}
        size={getFontSize(2.5)}
        containerStyle={{
          padding: getFontSize(2),
          ...alignSelfRTL(language),
        }}
        imageStyle={{...flipImage(language)}}
      />
      <KeyboardAwareScrollView
        nestedScrollEnabled
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(30), flexGrow: 1}}
        enableOnAndroid
        extraHeight={hp(200)}
        style={styles.container}>
        <CommonText text="Login to Your Account" style={styles.topLabel} />
        <View style={{gap: hp(20), marginTop: hp(60)}}>
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
            onPress={() =>
              navigateTo(PROVIDER_SCREENS.ForgotPassword, {
                isProvider: isProvider,
              })
            }
          />
          {/* <TermsCheckBox
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
            isPrimary="seeker"
            title={'Login'}
            btnStyle={{backgroundColor: Colors.provider_primary}}
            onPress={onLogin}
          />
        </View>

        <CommonText
          onPress={() => navigateTo(PROVIDER_SCREENS.ProSignupScreen)}
          text="Already have an account?"
          style={styles.accountText}>
          {' '}
          <CommonText text="Sign Up" style={styles.signUpAccountText} />
        </CommonText>
      </KeyboardAwareScrollView>
    </SafeareaProvider>
  );
};

export default ProLoginScreen;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getFontSize(10),
    backgroundColor: Colors.white,
    paddingHorizontal: getFontSize(2.2),
  },
  topLabel: {
    textAlign: 'center',
    ...commonFontStyle(600, 3.4, Colors.black),
  },

  midContainer: {
    ...rowReverseRTL(_language),
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
    ...commonFontStyle(600, 2, Colors.provider_primary),
  },
  checkBoxText: {
    ...commonFontStyle(400, 1.9, Colors._5E5D5D),
  },
  checkBoxText2: {
    ...commonFontStyle(400, 1.9, Colors.provider_primary),
  },

  dividerContainer: {
    ...rowReverseRTL(_language),
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
  forgotPasswordText: {
    marginTop: hp(4),
    ...textLTR(_language),
    ...commonFontStyle(400, 1.9, Colors.provider_primary),
  },
})}
