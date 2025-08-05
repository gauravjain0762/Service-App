import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {goBack} from './commonFunction';

type Props = {
  text: string;
  style?: ViewStyle;
  onPressBack?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  customBackArrow?: any;
};

const BackHeader = ({
  leftIcon,
  rightIcon,
  text,
  style,
  onPressBack,
  customBackArrow,
}: Props) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <TouchableOpacity
        onPress={onPressBack ?? (() => goBack())}
        style={styles.headerLeft}>
        {leftIcon ? (
          leftIcon
        ) : (
          <Image
            source={customBackArrow || IMAGES.backArrow2}
            style={styles.backArrow}
          />
        )}
        <CommonText text={text} style={styles.headerTitle} />
      </TouchableOpacity>
      {rightIcon && rightIcon}
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    gap: wp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    ...commonFontStyle(700, 2.4, Colors.black),
  },
  backArrow: {
    width: hp(24),
    height: hp(24),
    resizeMode: 'contain',
  },
});
