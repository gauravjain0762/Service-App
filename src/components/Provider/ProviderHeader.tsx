import React from 'react';
import {StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import CustomImage from '../common/CustomImage';

const ProviderHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.avatarContainer}>
          <CustomImage source={IMAGES.profile_avatar} size={hp(35)} />
        </View>
        <View>
          <CommonText text="Service Provider" style={styles.title} />
          <CommonText text="Welcom back!" style={styles.subtitle} />
        </View>
      </View>

      <View style={styles.bellContainer}>
        <CustomImage source={IMAGES.bell} size={hp(20)} />
      </View>
    </View>
  );
};

export default ProviderHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(17),
  },
  avatarContainer: {
    width: wp(80),
    height: hp(80),
    borderRadius: hp(17),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors._f4f4fe,
  },
  title: {
    ...commonFontStyle(600, 2.4, Colors.black),
  },
  subtitle: {
    ...commonFontStyle(400, 2.1, Colors._848484),
  },
  bellContainer: {
    width: wp(37),
    height: hp(37),
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors._EDFAFF,
  },
});
