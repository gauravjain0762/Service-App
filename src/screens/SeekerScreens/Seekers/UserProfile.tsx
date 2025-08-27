import React, {use, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import CustomTextInput from '@/components/common/CustomTextInput';
import CustomButton from '@/components/common/CustomButton';
import CustomImage from '@/components/common/CustomImage';
import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '@/Hooks/hooks';
import {useUpdateProfileMutation} from '@/api/Seeker/profileApi';
import {
  errorToast,
  goBack,
  successToast,
} from '@/components/common/commonFunction';
import EditPicture from '@/components/common/EditPicture';

const UserProfile = () => {
  const {userInfo} = useAppSelector(state => state.auth);
  console.log(userInfo, 'userInfo');
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();

  const {bottom} = useSafeAreaInsets();
  const [userData, setUserData] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
    picture: userInfo?.picture,
    phone: `+${userInfo?.phone_code} ${userInfo?.phone}`,
    location: `${userInfo?.address?.apt_villa_no} ${userInfo?.address?.building_name} ${userInfo?.address?.directions}`,
  });
  const [userImage, setUserImage] = useState<any>(null);
  const [isOpenPicker, setIsOpenPicker] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  const onImagePick = (e: any) => {
    setUserImage(e);
    setUserData({...userData, picture: e?.sourceURL});
  };

  const handleUpdate = async () => {
    try {
      if (!userData?.name.trim()) {
        errorToast('Enter a full name');
      } else {
        const formData = new FormData();
        formData.append('name', userData?.name);
        if (userImage != null) {
          formData.append('picture', {
            uri: userImage?.sourceURL,
            type: userImage?.mime,
            name: userImage?.sourceURL.split('/').pop(),
          });
        }
        const response = await updateProfile(formData).unwrap();
        if (response?.status) {
          successToast(response?.message);
          goBack();
        } else {
          errorToast(response?.message);
        }
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.message || error?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <SafeareaProvider style={[styles.container, {paddingBottom: bottom}]}>
      <BackHeader text="Profile" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          <CustomImage
            uri={userData?.picture}
            size={hp(50)}
            tintColor={Colors.black}
            containerStyle={styles.avatar}
            imageStyle={{width: '100%', height: '100%'}}
            onPress={() => {
              setIsOpenPicker(true);
            }}
            resizeMode='stretch'
          />
        </View>

        <View style={styles.formContainer}>
          <CustomTextInput
            value={userData.name}
            onChangeText={text => handleInputChange('name', text)}
            placeholder="Full Name"
            containerStyle={styles.inputContainer}
          />

          {/* <CustomTextInput
            value={userData.dateOfBirth}
            onChangeText={text => handleInputChange('dateOfBirth', text)}
            placeholder="Date of Birth"
            containerStyle={styles.dateInput}
          />

          <CustomTextInput
            value={userData.gender}
            onChangeText={text => handleInputChange('gender', text)}
            placeholder="Gender"
            containerStyle={styles.inputContainer}
          /> */}

          <CustomTextInput
            value={userData.email}
            onChangeText={text => handleInputChange('email', text)}
            placeholder="Email"
            containerStyle={styles.inputContainer}
            keyboardType="email-address"
            editable={false}
          />

          <CustomTextInput
            value={userData.phone}
            onChangeText={text => handleInputChange('phone', text)}
            placeholder="Phone Number"
            containerStyle={styles.inputContainer}
            keyboardType="phone-pad"
            editable={false}
          />

          <CustomTextInput
            value={userData.location}
            onChangeText={text => handleInputChange('location', text)}
            placeholder="Location"
            containerStyle={styles.inputContainer}
            editable={false}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Update"
            onPress={handleUpdate}
            btnStyle={styles.updateButton}
            isPrimary="seeker"
            loading={isLoading}
            disabled={isLoading}
          />
        </View>

        <EditPicture
          visible={isOpenPicker}
          setVisible={setIsOpenPicker}
          onChangeText={(e: any) => onImagePick(e)}
        />
      </ScrollView>
    </SafeareaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(24),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(40),
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: hp(40),
    marginBottom: hp(40),
  },
  avatar: {
    width: hp(120),
    height: hp(120),
    borderRadius: hp(100),
    backgroundColor: '#F4F4FE',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  formContainer: {
    gap: hp(20),
  },
  inputContainer: {
    backgroundColor: Colors._F9F9F9,
    borderRadius: hp(12),
    height: hp(55),
    paddingHorizontal: wp(20),
  },
  dateInput: {
    backgroundColor: Colors._F9F9F9,
    borderRadius: hp(12),
    height: hp(55),
    paddingHorizontal: wp(20),
  },
  buttonContainer: {
    marginTop: hp(40),
    paddingHorizontal: wp(10),
  },
  updateButton: {
    height: hp(55),
    borderRadius: hp(100),
  },
});

export default UserProfile;
