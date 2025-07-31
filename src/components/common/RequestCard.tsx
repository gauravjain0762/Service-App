import React from 'react';
import {Image, Pressable, StyleSheet, View, ViewStyle} from 'react-native';

import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

type props = {
  style?: ViewStyle;
  handleCardPress?: () => void;
};

const RequestCard = ({style, handleCardPress}: props) => {
  return (
    <Pressable onPress={handleCardPress} style={[styles.main, style]}>
      <View style={styles.imageContainer}>
        <Image source={IMAGES.dummy} />
      </View>

      <View style={styles.textContainer}>
        <CommonText text={'AC Regular Services'} style={styles.title} />
        <CommonText text={'1 Ton - 1.5 Ton x3'} style={styles.subtitle} />
      </View>
    </Pressable>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  main: {
    gap: wp(14),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(30),
    paddingVertical: hp(13),
    paddingHorizontal: hp(18),
    backgroundColor: Colors.seeker_primary,
  },
  imageContainer: {
    width: wp(72),
    height: hp(72),
    borderRadius: hp(72),
    backgroundColor: Colors.white,
  },
  textContainer: {
    gap: hp(5),
  },
  title: {
    ...commonFontStyle(600, 2.1, Colors.white),
  },
  subtitle: {
    ...commonFontStyle(600, 1.9, Colors.white),
  },
});
