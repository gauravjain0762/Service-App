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

type Props = {
  source: string;
  text: string;
  containerStyle?: ViewStyle;
  handleCardPress?: () => void;
};

const ServiceCard = ({
  text,
  source,
  containerStyle,
  handleCardPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleCardPress}
      style={[styles.cardContainer, containerStyle]}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: source}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <CommonText text={text} style={styles.commonText} />
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  imageContainer: {
    height: hp(90),
    width: hp(115),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(20),
    padding: hp(14),
    backgroundColor: Colors._F5F4F9,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  commonText: {
    marginTop: hp(8),
    lineHeight: 18,
    textAlign: 'center',
    ...commonFontStyle(400, 1.6, Colors.black),
  },
});
