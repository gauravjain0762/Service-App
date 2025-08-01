import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

const UploadBox = () => {
  return (
    <ShadowCard>
      <CommonText style={styles.title} text={'Upload Video/Image'} />

      <Image source={IMAGES.pdf} style={styles.icon} resizeMode="contain" />

      <CommonText
        style={styles.subText}
        text={'Upload video files and images here.'}
      />

      <TouchableOpacity style={styles.browseBtn}>
        <CommonText style={styles.browseText} text={'Browse Files'} />
      </TouchableOpacity>
    </ShadowCard>
  );
};

export default UploadBox;

const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  iconContainer: {
    width: wp(60),
    height: hp(60),
    marginTop: hp(16),
    borderRadius: hp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: wp(48),
    height: hp(48),
    marginTop: hp(20),
  },
  subText: {
    marginVertical: hp(20),
    ...commonFontStyle(400, 1.7, Colors._7D7D7D),
  },
  browseBtn: {
    borderRadius: hp(20),
    paddingVertical: hp(10),
    paddingHorizontal: wp(20),
    backgroundColor: Colors.seeker_primary,
  },
  browseText: {
    ...commonFontStyle(600, 1.6, Colors.white),
  },
});
