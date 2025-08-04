import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '@/components/common/CustomTextInput';
import CustomButton from '@/components/common/CustomButton';
import CommonText from '@/components/common/CommonText';
import { IMAGES } from '@/assets/images';
import { Colors } from '@/constants/Colors';
import { hp, wp, commonFontStyle } from '@/utils/responsiveFn';
import { navigationRef } from '@/navigation/RootContainer';
import { resetNavigation } from '@/components/common/commonFunction';
import { SEEKER_SCREENS } from '@/navigation/screenNames';

const CreateNewPass = () => {
  const handleSubmit = () => {
    // Handle forgot password submission
    // You can add email validation and API call here
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={hp(20)}
      extraHeight={hp(100)}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigationRef?.current?.goBack()}
        >
          <Image
            source={IMAGES.backArrow2}
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <CommonText text="Create New Password" style={styles.headerText} />
        <CommonText
          text="And now, you can create the new password and confirm it"
          style={styles.description}
        />
        <View style={styles.textInput}>
            <CustomTextInput placeholder="New Password"/>
        </View>
        <View style={styles.textInput2}>
            <CustomTextInput placeholder="Confirm Password" />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            isPrimary="seeker"
            title="Send"
            onPress={()=>resetNavigation(SEEKER_SCREENS.SeekerTabNavigation)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateNewPass;

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
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
  },
  headerText: {
    ...commonFontStyle(700, 3.2, Colors.black),
    textAlign: 'center',
    marginBottom: hp(30),
    marginTop: hp(50),
  },
  description: {
    ...commonFontStyle(400, 2.2, Colors._5E5D5D),
    textAlign: 'center',
    lineHeight: hp(25),
    marginBottom: hp(45),
    paddingHorizontal: wp(10),
  },
  textInput: {
    marginBottom: hp(20),
  },
  textInput2: {
    marginBottom: hp(40),
  },
  inputContainer: {
    marginBottom: hp(40),
  },
  buttonContainer: {
    marginBottom: hp(10),
  },
  sendButton: {
    borderRadius: hp(50),
  },
});