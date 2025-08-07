import {StyleSheet, View} from 'react-native';
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
  goBack,
  navigateTo,
  resetNavigation,
} from '@/components/common/commonFunction';
import {rowReverseRTL} from '@/utils/arabicStyles';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import SafeareaProvider from '@/components/common/SafeareaProvider';

const SignUpScreen = () => {
  const [callingCode, setCallingCode] = React.useState('971');
  const [userData, setUserData] = React.useState<any>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  return (
    <SafeareaProvider style={{backgroundColor: Colors.white}}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <CommonText text="Create New Account" style={styles.topLabel} />

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
          <CustomButton
            isPrimary="seeker"
            title={'Sign Up'}
            onPress={() => {
              navigateTo(SEEKER_SCREENS.OtpScreen);
            }}
          />
          <CustomButton
            isPrimary="seeker"
            title={'Login as a Guest'}
            type="outline"
            onPress={() => resetNavigation(SEEKER_SCREENS.SeekerTabNavigation)}
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
          />

          <CustomImage
            source={IMAGES.apple}
            size={getFontSize(2.5)}
            containerStyle={styles.socialBtn}
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getFontSize(2.2),
    paddingTop: getFontSize(3),
  },
  topLabel: {
    ...commonFontStyle(600, 3.4, Colors.black),
    textAlign: 'center',
  },

  dividerContainer: {
    ...rowReverseRTL(),
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
  accountText: {
    ...commonFontStyle(400, 2, Colors._909090),
    textAlign: 'center',
    paddingTop: hp(35),
  },

  signUpAccountText: {
    ...commonFontStyle(600, 2, Colors.seeker_primary),
  },
});
