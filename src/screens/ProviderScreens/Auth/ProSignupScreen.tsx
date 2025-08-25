import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import CustomTextInput from '@/components/common/CustomTextInput';
import PhoneInput from '@/components/common/PhoneInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '@/components/common/CustomButton';
import CustomImage from '@/components/common/CustomImage';
import {IMAGES} from '@/assets/images';
import {
  emailCheck,
  errorToast,
  goBack,
  navigateTo,
  successToast,
} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import CustomDropdown from '@/components/common/CustomDropdown';
import UploadImage from '@/components/common/UploadImage';
import UploadDocument from '@/components/common/UploadDocument';
import {
  useCategoryQuery,
  useLazySubCategoryQuery,
  useSignUpMutation,
} from '@/api/Provider/authApi';
import {useAppSelector} from '@/Hooks/hooks';

const ServiceList = [
  {label: 'Company', value: 'Company'},
  {label: 'Individual', value: 'Individual'},
];
type UserProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  service: string;
  category: string | any;
  subCategory: string | any;
  license: any;
  certificate: any;
  photo: any;
};

const ProSignupScreen = () => {
  const {dropDownCategories, dropDownSubCategories, fcmToken} = useAppSelector(
    state => state.auth,
  );
  const [signUp, {isLoading}] = useSignUpMutation();

  const {} = useCategoryQuery({});
  const [subCatTrigger] = useLazySubCategoryQuery();
  const [callingCode, setCallingCode] = useState('971');
  const [userData, setUserData] = useState<UserProps>({
    name: __DEV__ ? 'user' : '',
    email: __DEV__ ? 'user@gmail.com' : '',
    phone: __DEV__ ? '9555454' : '',
    password: __DEV__ ? 'user@123' : '',
    service: '',
    category: '',
    subCategory: '',
    license: null,
    certificate: null,
    photo: null,
  });

  useEffect(() => {
    if (userData.category) {
      subCatTrigger({category_id: userData.category});
    }
  }, [subCatTrigger, userData.category]);

  const onSignUp = async () => {
    try {
      if (!emailCheck(userData.email)) {
        errorToast('Please enter valid email');
        return;
      }

      let obj = {
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: userData.password,
        phone_code: callingCode,
        phone: userData.phone,
        category_id: userData.category,
        sub_categories: userData.subCategory,
        service_type: userData.service,
        deviceToken: fcmToken,
      };

      const response = await signUp(obj).unwrap();
      console.log('response', response);

      if (response?.status) {
        navigateTo(PROVIDER_SCREENS.OtpScreen, {
          userId: response?.data?.company?._id,
          phone: callingCode + userData.phone,
          isProvider: true,
        });
        // navigateTo(PROVIDER_SCREENS.OtpScreen, {isProvider: true});
        successToast(response?.message);
      } else {
        errorToast(response?.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.data?.message || error?.message || 'Something went wrong',
      );
    }
  };

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
            data={ServiceList}
            value={userData?.service}
            placeholder="Type of Service"
            onChange={item => setUserData({...userData, service: item.label})}
          />
          <CustomDropdown
            data={dropDownCategories}
            value={userData?.category}
            placeholder="Type of Category"
            onChange={item => setUserData({...userData, category: item.value})}
          />
          <CustomDropdown
            data={dropDownSubCategories}
            value={userData?.subCategory}
            placeholder="Type of Subcategory"
            onChange={item =>
              setUserData({...userData, subCategory: item.value})
            }
          />
        </View>

        <UploadImage
          style={{marginVertical: getFontSize(2)}}
          value={userData.photo}
          onSelect={res => setUserData({...userData, photo: res})}
        />

        <View style={styles.uploadSection}>
          <UploadDocument
            value={userData.certificate}
            onSelect={res => setUserData({...userData, certificate: res})}
            title={'Upload Certificate'}
          />
          <UploadDocument
            value={userData.license}
            onSelect={res => setUserData({...userData, license: res})}
            title={'License'}
          />
        </View>

        <CustomTextInput
          multiline
          containerStyle={styles.aboutInput}
          placeholder="About Your Self"
        />

        <View style={styles.buttonSection}>
          <CustomButton
            loading={isLoading}
            isPrimary="seeker"
            title={'Create Account'}
            btnStyle={styles.createBtn}
            onPress={() => onSignUp()}
          />
        </View>

        <CommonText
          onPress={() => goBack()}
          text="Already have an account?"
          style={styles.accountText}>
          {' '}
          <CommonText text={'Sign In'} style={styles.signUpAccountText} />
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
    marginTop: hp(0),
    marginBottom: hp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
