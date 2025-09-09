import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CustomImage from './CustomImage';

type props = {
  text1?: string;
  text2?: string;
  imageSource?: any;
  titleStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
  style?: StyleProp<ViewStyle>;
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
      <CustomImage
        source={imageSource ? {uri: imageSource} : IMAGES.dummy}
        imageStyle={{
          width: '100%',
          height: '100%',
        }}
        containerStyle={styles.imageContainer}
      />
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
    overflow: 'hidden',
  },
  textContainer: {
    flexShrink: 1,
    gap: hp(5),
  },
  title: {
    ...commonFontStyle(600, 2.1, Colors.white),
  },
  subtitle: {
    ...commonFontStyle(400, 1.8, Colors.white),
  },
});
