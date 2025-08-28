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
  subCategory: string[] | number[] | any;
  license: any;
  certificate: any;
  picture: any;
  about: string | any;
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
    name: '',
    email: '',
    phone: '',
    password: '',
    service: '',
    category: '',
    subCategory: [],
    license: null,
    certificate: null,
    picture: null,
    about: '',
  });

  useEffect(() => {
    if (userData.category) {
      subCatTrigger({category_id: userData.category});
    }
  }, [subCatTrigger, userData.category]);

  const getSelectedSubCategoryLabels = () => {
    if (!userData.subCategory || userData.subCategory.length === 0) return '';

    const selectedLabels = dropDownSubCategories
      .filter(item => userData.subCategory.includes(item.value))
      .map(item => item.label);

    return selectedLabels.join(', ');
  };

  const onSignUp = async () => {
    try {
      if (!userData?.name.trim()) {
        errorToast('Enter a full name');
      } else if (!userData?.email.trim()) {
        errorToast('Enter a Email');
      } else if (!emailCheck(userData?.email.trim().toLocaleLowerCase())) {
        errorToast('Please enter a valid email');
      } else if (!userData?.phone.trim()) {
        errorToast('Enter a phone number');
      } else if (userData?.phone.length < 9 || userData?.phone.length > 12) {
        errorToast('Enter a valid phone number');
        return;
      } else if (userData?.password === '') {
        errorToast('Please enter password');
      } else if (!userData.subCategory || userData.subCategory.length === 0) {
        errorToast('Please select at least one subcategory');
      } else if (!userData.service) {
        errorToast('Please select service type');
      } else if (!userData.category) {
        errorToast('Please select category');
      } else if (!userData.picture) {
        errorToast('Please upload profile picture');
      } else if (!userData.certificate) {
        errorToast('Please upload certificate');
      } else if (!userData.license) {
        errorToast('Please upload license');
      } else if (!userData.about) {
        errorToast('Please enter about your self');
      } else {
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email.toLowerCase());
        formData.append('password', userData.password);
        formData.append('phone_code', callingCode);
        formData.append('phone', userData.phone);
        formData.append('category_id', userData.category);
        formData.append('sub_categories', userData.subCategory.join(','));
        formData.append('service_type', userData.service);
        formData.append('about', userData.about);

        formData.append('picture', {
          uri: userData?.picture?.sourceURL,
          type: userData?.picture?.mime,
          name: userData?.picture?.name,
        });
        formData.append('certificate', {
          uri: userData?.certificate?.sourceURL,
          type: userData?.certificate?.mime,
          name: userData?.certificate?.name,
        });
        formData.append('license', {
          uri: userData?.license?.sourceURL,
          type: userData?.license?.mime,
          name: userData?.license?.name,
        });

        const response = await signUp(formData).unwrap();
        console.log('response-----', response);

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
            placeholder="Business Type"
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
            onChange={selectedItems => {
              setUserData({...userData, subCategory: selectedItems});
            }}
            multiSelect
          />
        </View>

        <UploadImage
          style={{marginVertical: getFontSize(2)}}
          value={userData.picture}
          onSelect={res => setUserData({...userData, picture: res})}
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
          value={userData.about}
          onChangeText={e => setUserData({...userData, about: e})}
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
