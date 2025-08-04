import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '@/components/common/CustomTextInput';
import CheckBox from 'react-native-check-box';
import CustomButton from '@/components/common/CustomButton';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';

import {Colors} from '@/constants/Colors';
import {rowReverseRTL} from '@/utils/arabicStyles';
import CommonText from '@/components/common/CommonText';
import CustomImage from '@/components/common/CustomImage';
import {IMAGES} from '@/assets/images';
import {navigateTo} from '@/components/common/commonFunction';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({}: any) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <CommonText text="Login to Your Account" style={styles.topLabel} />
      <View style={{gap: hp(20)}}>
        <CustomTextInput placeholder="Email" />
        <CustomTextInput placeholder="Password" secureTextEntry={true} />
        <CommonText
          text="Forgot Password?"
          style={styles.forgotPasswordText}
          onPress={() => navigateTo(SEEKER_SCREENS.ForgotPassword)}
        />
        <View style={styles.midContainer}>
          <CheckBox
            onClick={() => {
              setToggleCheckBox(!toggleCheckBox);
            }}
            isChecked={toggleCheckBox}
            uncheckedCheckBoxColor="#878787"
            checkedCheckBoxColor={Colors.seeker_primary}
          />
          <CommonText text="I agree to follow the" style={styles.checkBoxText}>
            {' '}
            <CommonText
              onPress={() => navigateTo(SEEKER_SCREENS.TermsWebScreen)}
              text="terms of use"
              style={styles.checkBoxText2}
            />
          </CommonText>
        </View>
      </View>

      <View style={{marginTop: hp(50), gap: hp(30)}}>
        <CustomButton
          isPrimary="seeker"
          title={'Login'}
          onPress={() => navigateTo(SEEKER_SCREENS.SeekerTabNavigation)}
        />
        <CustomButton
          isPrimary="seeker"
          title={'Login as a Guest'}
          type="outline"
          onPress={() => navigateTo(SEEKER_SCREENS.SeekerTabNavigation)}
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
        onPress={() => navigateTo(SEEKER_SCREENS.SignUpScreen)}
        text="Don't have an account?"
        style={styles.accountText}>
        {' '}
        <CommonText text="Sign Up" style={styles.signUpAccountText} />
      </CommonText>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getFontSize(2.2),
    paddingTop: getFontSize(10),
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
    marginTop: hp(-15)
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
    marginTop: hp(-20),
  },
});
