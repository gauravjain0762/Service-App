import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import CustomImage from './CustomImage';

const UploadImage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.uploadBox}>
        <ImageBackground source={IMAGES.dashed_rec} style={styles.plusIconBox}>
          <Text style={styles.plusIconText}>+</Text>
        </ImageBackground>
        <CommonText
          text="Upload Your Picture"
          style={styles.uploadPictureText}
        />
      </View>

      <View style={styles.uploadRow}>
        <View style={styles.certificateBox}>
          <ImageBackground source={IMAGES.dashed_rec} style={styles.iconBox}>
            <CustomImage source={IMAGES.upload} size={hp(31)} />
          </ImageBackground>
          <CommonText
            text="Upload Certificate"
            style={styles.uploadCertificateText}
          />
        </View>
        <View style={styles.certificateBox}>
          <ImageBackground source={IMAGES.dashed_rec} style={styles.iconBox}>
            <CustomImage source={IMAGES.upload} size={hp(31)} />
          </ImageBackground>
          <CommonText text="License" style={styles.uploadCertificateText} />
        </View>
      </View>
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    gap: hp(35),
  },
  uploadBox: {
    gap: wp(21),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(15),
    paddingVertical: hp(24),
    paddingHorizontal: wp(30),
    backgroundColor: Colors._F9F9F9,
  },
  plusIconBox: {
    width: wp(37),
    height: hp(37),
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconText: {
    fontSize: 22,
    color: Colors._525252,
  },
  uploadPictureText: {
    ...commonFontStyle(500, 1.8, Colors._525252),
  },
  uploadRow: {
    gap: hp(23),
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificateBox: {
    width: '47%',
    gap: hp(16),
    height: hp(145),
    padding: hp(23),
    borderRadius: hp(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors._F9F9F9,
  },
  iconBox: {
    width: wp(51),
    height: hp(51),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadCertificateText: {
    ...commonFontStyle(500, 1.8, Colors._525252),
  },
});
