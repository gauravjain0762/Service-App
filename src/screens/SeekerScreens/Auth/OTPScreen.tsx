/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {SCREENS} from '@/navigation/screenNames';
import {navigateTo, resetNavigation} from '@/components/common/commonFunction';
import OTPHeader from '@/components/auth/OTPHeader';
import CustomImage from '@/components/common/CustomImage';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {commonFontStyle, getFontSize} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import CustomButton from '@/components/common/CustomButton';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';

const CELL_COUNT = 4;

const OTPScreen = () => {
  const {params} = useRoute<any>();

  const {t} = useTranslation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [_props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  //   const [otpVerify, {isLoading: otpLoading}] = useOtpVerifyMutation();
  //   const [resendOtp, {isLoading: resendOtpLoading}] = useResendOtpMutation();

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let clear = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(clear);
  }, []);

  const onLoginSubmit = async () => {
    resetNavigation(SCREENS.SeekerTabNavigation);
    // let data = {
    //   otp: value,
    //   user_id: params?.userData?._id,
    //   deviceToken: fcmToken,
    //   deviceType: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
    //   language: 'en',
    // };
    // const response = await otpVerify(data).unwrap();
    // console.log('Login Response', response);
    // if (response?.status) {
    //   if (params?.isSignup) {
    //     navigateTo(SCREEN_NAMES.FaceRecognition);
    //   } else {
    //     resetNavigation(SCREEN_NAMES.TabNavigation);
    //   }
    // } else {
    //   errorToast(response?.message);
    // }
  };

  const onResendOtp = async () => {
    // let data = {
    //   phone_code: params?.numInfo?.callingCode[0],
    //   phone: params?.num,
    //   language: language,
    // };
    // const response = await resendOtp(data).unwrap();
    // if (response?.status) {
    //   console.log(response, 'response--');
    // }
  };

  return (
    <View style={GeneralStyle.container}>
      <View style={styles.subContainer}>
        <OTPHeader />
        <CustomImage
          source={IMAGES.otpImage}
          size={getFontSize(20)}
          containerStyle={{alignSelf: 'center', marginTop: getFontSize(3.5)}}
        />
        <CommonText text={'Verification code'} style={styles.topLabel} />

        <CommonText
          text="Enter the verification code we’ve send to your"
          style={styles.topSubLabel}>
          {' '}
          <CommonText
            text={params?.email || 'muhammad.zuhri.com'}
            style={styles.topSubLabel}
          />
        </CommonText>

        <View style={styles.otpContainer}>
          <CodeField
            ref={ref}
            value={value}
            autoFocus={false}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <CustomButton
          isPrimary="seeker"
          title={t('Confirm')}
          btnStyle={{marginTop: getFontSize(5)}}
          onPress={onLoginSubmit}
        />
        {timer !== 0 ? (
          <CommonText text="Resend code in" style={styles.accountText}>
            {' '}
            <CommonText
              text={timer !== 0 ? timer : '0'}
              style={styles.accountText}
            />
            <CommonText text={'s'} style={styles.accountText} />
          </CommonText>
        ) : (
          <CommonText
            onPress={() => {
              onResendOtp();
            }}
            text="Didn’t receive code?"
            style={styles.accountText}>
            {' '}
            <CommonText text={'Resend'} style={styles.resendText} />
          </CommonText>
        )}
      </View>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingHorizontal: getFontSize(2.2),
    paddingVertical: getFontSize(1.8),
  },
  topLabel: {
    marginVertical: getFontSize(2),
    ...commonFontStyle(600, 2.5, Colors.black),
    textAlign: 'center',
  },
  topSubLabel: {
    ...commonFontStyle(400, 2, Colors._5C5C5C),
    textAlign: 'center',
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: getFontSize(8),
    height: getFontSize(8),
    textAlign: 'center',
    ...commonFontStyle(400, 2.7, Colors.black),
    backgroundColor: Colors.white,
    borderRadius: getFontSize(100),
    lineHeight: 60,
    borderWidth: 1.5,
    borderColor: Colors._CDCDCD,
  },
  focusCell: {
    borderColor: Colors.seeker_primary,
    borderWidth: 1.5,
    backgroundColor: Colors?.seeker_primary,
    lineHeight: 60,
    ...commonFontStyle(400, 2.7, Colors.white),
  },
  otpContainer: {
    marginVertical: getFontSize(1.5),
    paddingHorizontal: getFontSize(2.5),
  },
  accountText: {
    ...commonFontStyle(400, 2, Colors._909090),
    textAlign: 'center',
    paddingVertical: getFontSize(3),
  },
  resendText: {
    ...commonFontStyle(600, 2, Colors.seeker_primary),
  },
});
