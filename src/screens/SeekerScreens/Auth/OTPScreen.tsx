import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {PROVIDER_SCREENS, SCREENS} from '@/navigation/screenNames';
import {
  errorToast,
  resetNavigation,
  successToast,
} from '@/components/common/commonFunction';
import OTPHeader from '@/components/auth/OTPHeader';
import CustomImage from '@/components/common/CustomImage';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import CustomButton from '@/components/common/CustomButton';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {useResendOTPMutation, useVerifyOTPMutation} from '@/api/Seeker/authApi';
import Loader from '@/components/common/Loader';
import {
  useProResendOTPMutation,
  useProVerifyOTPMutation,
} from '@/api/Provider/authApi';
import { useAppSelector } from '@/Hooks/hooks';

const CELL_COUNT = 4;

const OTPScreen = () => {
  const {fcmToken} = useAppSelector(state => state.auth);
  const {params} = useRoute<any>();
  const isProvider = params?.isProvider;
  const {t} = useTranslation();
  const [verifyOTP, {isLoading}] = useVerifyOTPMutation();
  const [proVerifyOTP, {isLoading: isProLoading}] = useProVerifyOTPMutation();

  const [resendOTP, {isLoading: isResendLoading}] = useResendOTPMutation();
  const [proResendOTP, {isLoading: isProResendLoading}] =
    useProResendOTPMutation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [_props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let clear = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(clear);
  }, []);

  const onLoginSubmit = async () => {
    try {
      let obj: any = {
        otp: value,
        device_type: Platform.OS,
        deviceToken: fcmToken,
      };
      if (isProvider) {
        obj.company_id = params?.userId;
      } else {
        obj.user_id = params?.userId;
      }
      const response = await (isProvider
        ? proVerifyOTP(obj) // Provider API
        : verifyOTP(obj)
      ).unwrap();
      if (response?.status) {
        successToast(response?.message);
        resetNavigation(
          isProvider
            ? PROVIDER_SCREENS.Subscription
            : SCREENS.SeekerTabNavigation,
          {
            isProvider: isProvider,
          },
        );
      }
    } catch (error: any) {
      errorToast(
        error?.message || error?.data?.message || 'Something went wrong',
      );
    }
  };

  const onResendOtp = async () => {
    try {
      let obj: any = {};
      if (isProvider) {
        obj.company_id = params?.userId;
      } else {
        obj.user_id = params?.userId;
      }

      const response = await (isProvider
        ? proResendOTP(obj) // Provider API
        : resendOTP(obj)
      ).unwrap();

      if (response?.status) {
        successToast(response?.message);
        setTimer(60);
      }
    } catch (error: any) {
      errorToast(
        error?.message || error?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <SafeareaProvider style={GeneralStyle.container}>
      <View style={styles.subContainer}>
        <OTPHeader />

        <View style={styles.iconOuter}>
          <View
            style={[
              styles.iconInner,
              {
                backgroundColor: isProvider
                  ? Colors.provider_primary
                  : Colors.seeker_primary,
              },
            ]}>
            <CustomImage source={IMAGES.ic_otp} size={hp(60)} />
          </View>
        </View>

        <CommonText text={'Verification code'} style={styles.topLabel} />

        <CommonText
          text="Enter the verification code we’ve send to your"
          style={styles.topSubLabel}>
          {' '}
          <CommonText
            text={params?.email || '+' + params?.phone || 'muhammad.zuhri.com'}
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
                style={[
                  styles.cell,
                  isFocused && {
                    ...styles.focusCell,
                    borderColor: isProvider
                      ? Colors.provider_primary
                      : Colors.seeker_primary,
                    backgroundColor: isProvider
                      ? Colors.provider_primary
                      : Colors.seeker_primary,
                  },
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <CustomButton
          isPrimary="seeker"
          title={t('Confirm')}
          disabled={value.length < 4}
          loading={isLoading || isProLoading}
          btnStyle={[
            styles.confirmButton,
            {
              backgroundColor: isProvider
                ? Colors.provider_primary
                : Colors.seeker_primary,
            },
          ]}
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
            onPress={onResendOtp}
            text="Didn’t receive code?"
            style={styles.accountText}>
            {' '}
            <CommonText
              text={'Resend'}
              style={[
                styles.resendText,
                {
                  color: isProvider
                    ? Colors.provider_primary
                    : Colors.seeker_primary,
                },
              ]}
            />
          </CommonText>
        )}
        {(isResendLoading || isProResendLoading) && <Loader />}
      </View>
    </SafeareaProvider>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingHorizontal: getFontSize(2.2),
    paddingVertical: getFontSize(1.8),
  },
  iconOuter: {
    width: wp(160),
    height: hp(160),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: hp(160),
    justifyContent: 'center',
    backgroundColor: Colors._F3F3F3,
  },
  iconInner: {
    width: wp(132),
    height: hp(132),
    alignItems: 'center',
    borderRadius: hp(132),
    justifyContent: 'center',
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
  codeFieldRoot: {
    marginTop: 20,
  },
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
    backgroundColor: Colors.seeker_primary,
    borderWidth: 1.5,
    lineHeight: 60,
    ...commonFontStyle(400, 2.7, Colors.white),
  },
  otpContainer: {
    marginVertical: getFontSize(1.5),
    paddingHorizontal: getFontSize(2.5),
  },
  confirmButton: {
    marginTop: getFontSize(5),
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
