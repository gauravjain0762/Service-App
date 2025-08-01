import React from 'react';
import {Image, Pressable, StyleSheet, View, ViewStyle} from 'react-native';

import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

type props = {
  text1?: string;
  text2?: string;
  style?: ViewStyle;
  imageSource?: any;
  titleStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
  handleCardPress?: () => void;
};

const RequestCard = ({
  style,
  text1,
  text2,
  titleStyle,
  imageSource,
  subtitleStyle,
  handleCardPress,
}: props) => {
  return (
    <Pressable onPress={handleCardPress} style={[styles.main, style]}>
      <View style={styles.imageContainer}>
        <Image source={imageSource ? imageSource : IMAGES.dummy} />
      </View>

      <View style={styles.textContainer}>
        <CommonText
          text={text1 ? text1 : 'AC Regular Services'}
          style={[styles.title, titleStyle]}
        />
        <CommonText
          text={text2 ? text2 : '1 Ton - 1.5 Ton x3'}
          style={[styles.subtitle, subtitleStyle]}
        />
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
