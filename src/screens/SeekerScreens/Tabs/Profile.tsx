import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import CustomImage from '@/components/common/CustomImage';
import CommonText from '@/components/common/CommonText';
import CustomButton from '@/components/common/CustomButton';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {hp, wp, getFontSize, commonFontStyle} from '@/utils/responsiveFn';
import {GeneralStyle} from '@/constants/GeneralStyle';
import { View, StyleSheet, ScrollView } from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import CustomImage from '@/components/common/CustomImage';
import CommonText from '@/components/common/CommonText';
import ProfileActionItem from '@/components/common/ProfileActionItem';
import { IMAGES } from '@/assets/images';
import { Colors } from '@/constants/Colors';
import { hp, wp, commonFontStyle } from '@/utils/responsiveFn';
import { GeneralStyle } from '@/constants/GeneralStyle';

const Profile = () => {

  return (
    <View style={GeneralStyle.container}>
      <BackHeader text="Profile" customBackArrow={IMAGES.backArrow} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.avatarSection}>
          <CustomImage
            source={IMAGES.new_profile}
            size={hp(80)}
            containerStyle={styles.avatar}
          />
          <CommonText text="Jason Wiliams" style={styles.name} />
        </View>

        <View style={styles.actionList}>
          <ProfileActionItem
            leftIcon={IMAGES.language}
            title="Language"
            languageSection={
              <View style={styles.languageSection}>
                <CustomImage source={IMAGES.flag} size={hp(20)} />
                <CustomImage
                  source={IMAGES.downArrow}
                  size={hp(20)}
                />
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
            leftIcon={IMAGES.logout}
            title="Logout"
          />
        </View>
      </ScrollView>
    </View>
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
  actionList: {
    marginHorizontal: wp(16),
  },
  languageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
});

export default Profile;