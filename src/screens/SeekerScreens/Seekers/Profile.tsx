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

const Profile = () => {
  return (
    <View style={GeneralStyle.container}>
      <BackHeader text="Profile" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <CustomImage
            source={IMAGES.new_profile}
            size={hp(80)}
            containerStyle={styles.avatar}
          />
          <CommonText text="Jason Wiliams" style={styles.name} />
        </View>

        <View style={styles.actionList}>
          <TouchableOpacity style={styles.actionRow}>
            <CustomImage source={IMAGES.language} size={hp(22)} />
            <CommonText text="Language" style={styles.actionText} />
            <View style={styles.languageSection}>
              <CustomImage source={IMAGES.flag} size={hp(20)} />
              <CustomImage source={IMAGES.downArrow} size={hp(20)} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow}>
            <CustomImage source={IMAGES.phone} size={hp(22)} />
            <CommonText text="Contact us" style={styles.actionText} />
            <CustomImage source={IMAGES.rightArrow} size={hp(16)} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow}>
            <CustomImage source={IMAGES.iBtn} size={hp(22)} />
            <CommonText text="About us" style={styles.actionText} />
            <CustomImage source={IMAGES.rightArrow} size={hp(16)} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow}>
            <CustomImage source={IMAGES.privacy} size={hp(22)} />
            <CommonText text="Privacy Policy" style={styles.actionText} />
            <CustomImage source={IMAGES.rightArrow} size={hp(16)} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow}>
            <CustomImage source={IMAGES.file} size={hp(22)} />
            <CommonText text="Terms & Conditions" style={styles.actionText} />
            <CustomImage source={IMAGES.rightArrow} size={hp(16)} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow}>
            <CustomImage source={IMAGES.logout} size={hp(22)} />
            <CommonText text="Logout" style={styles.actionText} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionRow, styles.deleteRow]}>
            <CustomImage source={IMAGES.delete} size={hp(22)} />
            <CommonText text="Delete Account" style={styles.actionText} />
          </TouchableOpacity>
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
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(16),
    backgroundColor: Colors._F9F9F9,
    borderRadius: hp(30),
    marginBottom: hp(8),
    paddingHorizontal: wp(16),
  },
  actionText: {
    flex: 1,
    marginLeft: wp(12),
    ...commonFontStyle(500, 2, Colors.black),
  },
  languageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  flagIcon: {
    width: hp(20),
    height: hp(15),
    backgroundColor: Colors._039B55,
    borderRadius: hp(2),
  },
  deleteRow: {
    backgroundColor: Colors._F2EDED,
  },
});

export default Profile;
