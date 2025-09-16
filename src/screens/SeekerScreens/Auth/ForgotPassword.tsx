/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '@/components/common/CustomTextInput';
import CustomButton from '@/components/common/CustomButton';
import CommonText from '@/components/common/CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {hp, wp, commonFontStyle} from '@/utils/responsiveFn';
import {navigationRef} from '@/navigation/RootContainer';
import {
  emailCheck,
  errorToast,
  navigateTo,
  successToast,
} from '@/components/common/commonFunction';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {useRoute} from '@react-navigation/native';
import {useForgotPasswordMutation} from '@/api/Seeker/authApi';
import {useProForgotPasswordMutation} from '@/api/Provider/authApi';
import {useAppSelector} from '@/Hooks/hooks';
import { alignSelfRTL, flipImage } from '@/utils/arabicStyles';

const ForgotPassword = () => {
  const {params} = useRoute<any>();
  const isProvider = params?.isProvider;
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();
  const [proForgotPassword, {isLoading: isProLoading}] =
    useProForgotPasswordMutation();

  const [email, setEmail] = React.useState('');

  const onSend = async () => {
    try {
      if (!emailCheck(email)) {
        errorToast('Please enter valid email');
        return;
      }

      let obj = {
        email: email,
      };

      const response = await (isProvider
        ? proForgotPassword(obj) // Provider API
        : forgotPassword(obj)
      ).unwrap();

      if (response?.status) {
        navigateTo(SEEKER_SCREENS.EmailVerification, {
          userId: response?.data?.user?._id,
          email: email,
          isProvider: isProvider,
        });
        // successToast(response?.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.message || error?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <>
      <SafeareaProvider
        style={{
          flex: 1,
          paddingHorizontal: wp(20),
          backgroundColor: Colors.white,
        }}>
        <KeyboardAwareScrollView
          nestedScrollEnabled
          enableResetScrollToCoords={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          extraScrollHeight={hp(20)}
          extraHeight={hp(100)}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigationRef?.current?.goBack()}>
              <Image source={IMAGES.backArrow2} style={styles.backArrow} />
            </TouchableOpacity>
          </View>

          <View style={styles.mainContent}>
            <CommonText text="Forgot Password" style={styles.headerText} />
            <CommonText
              text="Please enter your email below and we will send you the OTP code"
              style={styles.description}
            />
            <View style={styles.textInput}>
              <CustomTextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
              />
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Send"
                loading={isLoading || isProLoading}
                disabled={isLoading || isProLoading}
                isPrimary={isProvider ? 'provider' : 'seeker'}
                onPress={onSend}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeareaProvider>
    </>
  );
};

export default ForgotPassword;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: hp(100),
    },
    headerContainer: {
      paddingTop: hp(10),
      paddingHorizontal: wp(10),
      paddingBottom: hp(20),
      ...alignSelfRTL(_language)
    },
    backButton: {
      marginBottom: hp(10),
    },
    backArrow: {
      width: hp(24),
      height: hp(24),
      resizeMode: 'contain',
      ...flipImage(_language)
    },
    mainContent: {
      paddingHorizontal: wp(20),
      paddingTop: hp(20),
    },
    headerText: {
      ...commonFontStyle(700, 3.2, Colors.black),
      textAlign: 'center',
      marginBottom: hp(30),
      marginTop: hp(50),
    },
    description: {
      ...commonFontStyle(400, 2.2, Colors._5E5D5D),
      textAlign: 'center',
      lineHeight: hp(25),
      marginBottom: hp(45),
      paddingHorizontal: wp(10),
    },
    textInput: {
      marginBottom: hp(40),
    },
    inputContainer: {
      marginBottom: hp(40),
    },
    buttonContainer: {
      marginBottom: hp(10),
    },
    sendButton: {
      borderRadius: hp(50),
    },
  });
};
