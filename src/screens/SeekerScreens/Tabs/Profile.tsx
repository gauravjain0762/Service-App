import React from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import CustomImage from '@/components/common/CustomImage';
import CommonText from '@/components/common/CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {hp, wp, commonFontStyle} from '@/utils/responsiveFn';
import ProfileActionItem from '@/components/common/ProfileActionItem';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {navigateTo, resetNavigation} from '@/components/common/commonFunction';
import {SCREEN_NAMES} from '@/navigation/screenNames';

const Profile = () => {
  return (
    <SafeareaProvider
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: wp(20),
      }}>
      <BackHeader text="Profile"  />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Pressable
          onPress={() => navigateTo(SCREEN_NAMES.UserProfile)}
          style={styles.avatarSection}>
          <CustomImage
            source={IMAGES.user_profile}
            size={hp(80)}
            disabled={true}
            containerStyle={styles.avatar}
          />
          <CommonText text="Jason Wiliams" style={styles.name} />
        </Pressable>

        <View style={styles.actionList}>
          <ProfileActionItem
            leftIcon={IMAGES.language}
            title="Language"
            languageSection={
              <View style={styles.languageSection}>
                <CustomImage source={IMAGES.flag} size={hp(20)} />
                <CustomImage source={IMAGES.downArrow} size={hp(20)} />
              </View>
            }
          />

          <ProfileActionItem
            leftIcon={IMAGES.phone}
            title="Contact us"
            rightIcon={IMAGES.rightArrow}
          />

          <ProfileActionItem
            leftIcon={IMAGES.iBtn}
            title="About us"
            rightIcon={IMAGES.rightArrow}
          />

          <ProfileActionItem
            leftIcon={IMAGES.privacy}
            title="Privacy Policy"
            rightIcon={IMAGES.rightArrow}
          />

          <ProfileActionItem
            leftIcon={IMAGES.file}
            title="Terms & Conditions"
            rightIcon={IMAGES.rightArrow}
          />

          <ProfileActionItem
            leftIcon={IMAGES.delete}
            title="Delete Account"
            isDelete={true}
          />

          <ProfileActionItem
            leftIcon={IMAGES.newlogout}
            title="Logout"
            onPress={() => resetNavigation(SCREEN_NAMES.LoginScreen)}
          />
        </View>
      </ScrollView>
    </SafeareaProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(100),
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: hp(24),
    marginBottom: hp(32),
  },
  avatar: {
    borderRadius: hp(40),
    backgroundColor: Colors._EBFCF4,
    marginBottom: hp(12),
  },
  name: {
    ...commonFontStyle(700, 2.4, Colors.black),
  },
  actionList: {},
  languageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
});

export default Profile;
