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
  errorToast,
  resetNavigation,
  successToast,
} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {useRoute} from '@react-navigation/native';
import {useResetPasswordMutation} from '@/api/Seeker/authApi';

const CreateNewPass = () => {
  const {params} = useRoute<any>();
  const {isProvider, userId, otp} = params || {};
  const [resetPassword, {isLoading}] = useResetPasswordMutation();

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onSubmit = async () => {
    try {
      let obj = {
        user_id: userId,
        otp: otp,
        password: password,
        confirm_password: confirmPassword,
      };

      const response = await resetPassword(obj).unwrap();

      if (response?.status) {
        resetNavigation(
          isProvider
            ? PROVIDER_SCREENS.ProLoginScreen
            : SEEKER_SCREENS.LoginScreen,
        );
        successToast(response?.message);
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
    <SafeareaProvider
      style={{
        flex: 1,
        paddingHorizontal: wp(30),
        backgroundColor: Colors.white,
      }}>
      <KeyboardAwareScrollView
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
          <CommonText text="Create New Password" style={styles.headerText} />
          <CommonText
            text="And now, you can create the new password and confirm it"
            style={styles.description}
          />
          <View style={styles.textInput}>
            <CustomTextInput
              placeholder="New Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.textInput2}>
            <CustomTextInput
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              loading={isLoading}
              disabled={password !== confirmPassword || !password}
              title="Submit"
              isPrimary={isProvider ? 'provider' : 'seeker'}
              btnStyle={{
                backgroundColor: isProvider
                  ? Colors.provider_primary
                  : Colors.seeker_primary,
              }}
              onPress={onSubmit}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeareaProvider>
  );
};

export default CreateNewPass;

const styles = StyleSheet.create({
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
    paddingHorizontal: wp(5),
    paddingBottom: hp(20),
  },
  backButton: {
    marginBottom: hp(10),
  },
  backArrow: {
    width: hp(24),
    height: hp(24),
    resizeMode: 'contain',
  },
  mainContent: {
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
    marginBottom: hp(20),
  },
  textInput2: {
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
