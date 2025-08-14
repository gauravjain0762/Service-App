/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CustomButton from '@/components/common/CustomButton';
import CommonText from '@/components/common/CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {hp, wp, commonFontStyle} from '@/utils/responsiveFn';
import {navigationRef} from '@/navigation/RootContainer';
import {navigateTo} from '@/components/common/commonFunction';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {useRoute} from '@react-navigation/native';

const CELL_COUNT = 4;

const EmailVerification = () => {
  const {params} = useRoute<any>();
  const {isProvider, userId} = params || {};

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [_props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onSend = async () => {
    navigateTo(SEEKER_SCREENS.CreateNewPass, {
      isProvider: isProvider,
      otp: value,
      userId: userId,
    });
  };

  return (
    <SafeareaProvider
      style={{
        flex: 1,
        paddingHorizontal: wp(20),
        backgroundColor: Colors.white,
      }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={hp(20)}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigationRef?.current?.goBack()}>
            <Image source={IMAGES.backArrow2} style={styles.backArrow} />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          <CommonText text="Email Verification" style={styles.headerText} />
          <CommonText
            text="We sent the OTP code to your email, please check it and enter below"
            style={styles.description}
          />

          <View style={styles.otpContainer}>
            <CodeField
              ref={ref}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={[
                    styles.cell,
                    isFocused && !isProvider && styles.focusCell,
                    isFocused && isProvider && styles.providerFocusCell,
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  <CommonText
                    text={symbol || ''}
                    style={[styles.cellText, isFocused && styles.focusCellText]}
                  />
                  {isFocused && !symbol && <Cursor />}
                </View>
              )}
              autoFocus
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              isPrimary={isProvider ? 'provider' : 'seeker'}
              title="Send"
              disabled={value.length < 4}
              btnStyle={styles.sendButton}
              onPress={onSend}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeareaProvider>
  );
};

export default EmailVerification;

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
    flex: 1,
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
  },
  headerText: {
    ...commonFontStyle(700, 3.2, Colors.black),
    textAlign: 'center',
    marginBottom: hp(20),
    marginTop: hp(50),
  },
  description: {
    ...commonFontStyle(400, 2.2, Colors._5E5D5D),
    textAlign: 'center',
    lineHeight: hp(25),
    marginBottom: hp(50),
    paddingHorizontal: wp(10),
  },
  otpContainer: {
    marginBottom: hp(50),
    alignItems: 'center',
  },
  codeFieldRoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(10),
  },
  cell: {
    width: hp(60),
    height: hp(60),
    borderRadius: hp(30),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors._CDCDCD,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(5),
  },
  focusCell: {
    borderWidth: hp(2),
    borderColor: Colors.seeker_primary,
    backgroundColor: Colors.seeker_primary,
  },
  providerFocusCell: {
    borderWidth: hp(2),
    borderColor: Colors.provider_primary,
    backgroundColor: Colors.provider_primary,
  },
  cellText: {
    ...commonFontStyle(400, 2.5, Colors.black),
    textAlign: 'center',
  },
  focusCellText: {
    color: Colors.white,
  },
  buttonContainer: {
    marginBottom: hp(20),
  },
  sendButton: {
    borderRadius: hp(50),
    height: hp(55),
  },
});
