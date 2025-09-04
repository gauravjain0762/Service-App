import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import CommonText from '../common/CommonText';
import CustomImage from '../common/CustomImage';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

type Props = {
  style?: ViewStyle;
};

const LoyaltyCreditTransaction = ({style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        <View style={styles.imageContainer}>
          <CustomImage source={IMAGES.dummy} size={hp(68)} />
        </View>

        <View style={styles.textContainer}>
          <CommonText text="Repair & Maintena..." style={styles.titleText} />
          <CommonText text="AC Regular Services" style={styles.subtitleText} />
        </View>
      </View>

      <View style={styles.priceSection}>
        <CommonText text="-150" style={styles.priceText}>
          <CommonText text="pts" style={styles.ptsText} />
        </CommonText>
      </View>
    </View>
  );
};

export default LoyaltyCreditTransaction;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(13),
  },
  imageContainer: {
    height: hp(68),
    width: wp(68),
    borderRadius: hp(10),
    backgroundColor: Colors._E5E5E5,
  },
  textContainer: {
    gap: hp(11),
  },
  titleText: {
    ...commonFontStyle(600, 1.9, Colors.black),
  },
  subtitleText: {
    ...commonFontStyle(400, 1.7, Colors._898989),
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(5),
  },
  priceText: {
    ...commonFontStyle(600, 2.7, Colors.red),
  },
  ptsText: {
    ...commonFontStyle(600, 2, Colors.red),
  },
});
