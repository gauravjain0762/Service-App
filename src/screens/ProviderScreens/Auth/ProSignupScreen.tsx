import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import CustomTextInput from '@/components/common/CustomTextInput';
import PhoneInput from '@/components/common/PhoneInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '@/components/common/CustomButton';
import CustomImage from '@/components/common/CustomImage';
import {IMAGES} from '@/assets/images';
import {goBack, navigateTo} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import CustomDropdown from '@/components/common/CustomDropdown';
import UploadImage from '@/components/common/UploadImage';

const ProSignupScreen = () => {
  const [callingCode, setCallingCode] = useState('971');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <SafeareaProvider style={styles.safeArea}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.headerRow}>
          <CustomImage
            size={hp(20)}
            disabled={false}
            onPress={() => goBack()}
            source={IMAGES.backArrow2}
          />
          <CommonText text="Create New Account" style={styles.topLabel} />
        </View>

        <View style={styles.inputSection}>
          <CustomTextInput
            placeholder="Full name"
            value={userData.name}
            onChangeText={e => setUserData({...userData, name: e})}
          />
          <CustomTextInput
            placeholder="Email"
            value={userData.email}
            onChangeText={e => setUserData({...userData, email: e})}
            keyboardType="email-address"
          />
          <PhoneInput
            placeholder="00 000 0000"
            value={userData.phone}
            onChangeText={e => setUserData({...userData, phone: e})}
            callingCode={callingCode}
            setCallingCode={setCallingCode}
            maxLength={9}
            containerStyle={styles.phoneInput}
          />
          <CustomTextInput
            placeholder="Password"
            value={userData.password}
            onChangeText={e => setUserData({...userData, password: e})}
            secureTextEntry
          />
          <CustomDropdown
            data={[
              {label: 'Option 1', value: '1'},
              {label: 'Option 2', value: '2'},
            ]}
            value={selectedOption}
            placeholder="Type of Service"
            onChange={item => setSelectedOption(item.label)}
          />
          <CustomDropdown
            data={[
              {label: 'Option 1', value: '1'},
              {label: 'Option 2', value: '2'},
            ]}
            value={selectedOption}
            placeholder="Type of Category"
            onChange={item => console.log('Selected:', item)}
          />
          <CustomDropdown
            data={[
              {label: 'Option 1', value: '1'},
              {label: 'Option 2', value: '2'},
            ]}
            value={selectedOption}
            placeholder="Type of Subcategory"
            onChange={item => console.log('Selected:', item)}
          />
        </View>

        <View style={styles.uploadSection}>
          <UploadImage />
        </View>

        <CustomTextInput
          multiline
          containerStyle={styles.aboutInput}
          placeholder="About Your Self"
        />

        <View style={styles.buttonSection}>
          <CustomButton
            isPrimary="seeker"
            title={'Create Account'}
            btnStyle={styles.createBtn}
            onPress={() =>
              navigateTo(PROVIDER_SCREENS.OtpVerifyScreen, {isProvider: true})
            }
          />
        </View>

        <CommonText
          onPress={() => goBack()}
          text="Already have an account?"
          style={styles.accountText}>
          <CommonText text="Sign In" style={styles.signUpAccountText} />
        </CommonText>
      </KeyboardAwareScrollView>
    </SafeareaProvider>
  );
};

export default ProSignupScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getFontSize(2.2),
    paddingTop: getFontSize(3),
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLabel: {
    flex: 3,
    textAlign: 'center',
    ...commonFontStyle(600, 3.4, Colors.black),
  },
  inputSection: {
    gap: hp(20),
    marginTop: hp(45),
  },
  phoneInput: {
    marginBottom: 0,
  },
  uploadSection: {
    marginTop: hp(52),
    marginBottom: hp(35),
  },
  aboutInput: {
    height: hp(120),
    borderRadius: hp(14),
    paddingVertical: hp(12),
  },
  buttonSection: {
    marginTop: hp(52),
    gap: hp(20),
  },
  createBtn: {
    backgroundColor: Colors.provider_primary,
  },
  accountText: {
    textAlign: 'center',
    paddingTop: hp(35),
    ...commonFontStyle(400, 2, Colors._909090),
  },
  signUpAccountText: {
    ...commonFontStyle(600, 2, Colors.provider_primary),
  },
});
