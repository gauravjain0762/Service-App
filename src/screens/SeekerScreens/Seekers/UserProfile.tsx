import React, {useState} from 'react';
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

const UserProfile = () => {
  const {bottom} = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    name: 'Jofra Williamson',
    dateOfBirth: '12/27/1995',
    gender: 'Male',
    email: 'jofra@williamson.gmail.com',
    phone: '+974 259 3886 58',
    location: 'Dubai',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    console.log('Update profile:', formData);
  };

  return (
    <SafeareaProvider style={[styles.container, {paddingBottom: bottom}]}>
      <BackHeader text="Profile" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <CustomImage
              source={IMAGES.profile}
              size={hp(50)}
              tintColor={Colors.black}
            />
          </View>
        </View>

        <View style={styles.formContainer}>
          <CustomTextInput
            value={formData.name}
            onChangeText={text => handleInputChange('name', text)}
            placeholder="Full Name"
            containerStyle={styles.inputContainer}
          />

          <CustomTextInput
            value={formData.dateOfBirth}
            onChangeText={text => handleInputChange('dateOfBirth', text)}
            placeholder="Date of Birth"
            containerStyle={styles.dateInput}
          />

          <CustomTextInput
            value={formData.gender}
            onChangeText={text => handleInputChange('gender', text)}
            placeholder="Gender"
            containerStyle={styles.inputContainer}
          />

          <CustomTextInput
            value={formData.email}
            onChangeText={text => handleInputChange('email', text)}
            placeholder="Email"
            containerStyle={styles.inputContainer}
            keyboardType="email-address"
          />

          <CustomTextInput
            value={formData.phone}
            onChangeText={text => handleInputChange('phone', text)}
            placeholder="Phone Number"
            containerStyle={styles.inputContainer}
            keyboardType="phone-pad"
          />

          <CustomTextInput
            value={formData.location}
            onChangeText={text => handleInputChange('location', text)}
            placeholder="Location"
            containerStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Update"
            onPress={handleUpdate}
            btnStyle={styles.updateButton}
            isPrimary="seeker"
          />
        </View>
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
