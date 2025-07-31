import React from 'react';
import {
  View,
  Image,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp} from '@/utils/responsiveFn';

type props = {
  source: any;
  text: string;
  containerStyle?: ViewStyle;
  handleCardPress?: () => void;
};

const ServiceCard = ({
  text,
  source,
  containerStyle,
  handleCardPress,
}: props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleCardPress}
      style={[styles.space, containerStyle]}>
      <View style={styles.imageContainer}>
        <Image
          source={source}
          resizeMode="contain"
          style={{height: '100%', width: '100%'}}
        />
      </View>
      <CommonText text={text} style={[styles.commonText]} />
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  space: {
    flex: 1,
    gap: hp(13),
  },
  imageContainer: {
    height: hp(95),
    alignItems: 'center',
    borderRadius: hp(20),
    paddingVertical: hp(14),
    justifyContent: 'center',
    backgroundColor: Colors._F5F4F9,
  },
  commonText: {
    lineHeight: 18,
    textAlign: 'center',
    ...commonFontStyle(400, 1.6, Colors.black),
  },
});
