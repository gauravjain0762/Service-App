import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {GeneralStyle} from '../../constants/GeneralStyle';
import {commonFontStyle, getFontSize} from '../../utils/responsiveFn';
import {IMAGES} from '../../assets/images';
import OTPHeader from '../../components/auth/OTPHeader';
import {Colors} from '../../constants/Colors';
import {SCREENS} from '../../navigation/screenNames';
import {navigateTo} from '../../components/common/commonFunction';
import CustomImage from '../../components/common/CustomImage';
import CustomButton from '../../components/common/CustomButton';

const CELL_COUNT = 4;

const OTPScreen = () => {
  const {params} = useRoute<any>();
  const {fcmToken, language} = useSelector((state: RootState) => state.auth);

  const {t, i18n} = useTranslation();
  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
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
    navigateTo(SCREENS.TabNavigation);
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
        <Text style={styles.topLabel}>{t('Verification code')}</Text>
        <Text style={styles.topSubLabel}>
          {t(
            `${
              t('Enter the verification code we’ve send to your') +
              ' ' +
              'muhammad.zuhri.com'
            }`,
          )}
        </Text>

        <View style={styles.otpContainer}>
          <CodeField
            ref={ref}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
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
            autoFocus
          />
        </View>

        <CustomButton
          title={t('Confirm')}
          btnStyle={{marginTop: getFontSize(5)}}
          onPress={onLoginSubmit}
        />
        {timer != 0 ? (
          <Text style={styles.accountText}>
            {t('Resend code in ')}
            <Text style={styles.accountText}>{timer != 0 ? timer : '0'}</Text>
            {t('s')}
          </Text>
        ) : (
          <Text
            suppressHighlighting={true}
            onPress={() => {
              onResendOtp();
            }}
            style={styles.accountText}>
            {t('Didn’t receive code?')}{' '}
            <Text style={styles.resendText}>{t('Resend')}</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

export default OTPScreen;

const getGlobalStyles = (language: string) =>
  StyleSheet.create({
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
      borderColor: Colors.black,
      borderWidth: 1.5,
      backgroundColor: Colors?.black,
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
      ...commonFontStyle(600, 2, Colors.black),
    },
  });
