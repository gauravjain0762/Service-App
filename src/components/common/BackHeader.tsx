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
import {useAppSelector} from '@/Hooks/hooks';
import {flipImage, rowReverseRTL} from '@/utils/arabicStyles';
import CustomImage from './CustomImage';

type Props = {
  text?: string;
  style?: ViewStyle;
  onPressBack?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  customBackArrow?: any;
  tintColor?: string;
};

const BackHeader = ({
  leftIcon,
  rightIcon,
  text,
  style,
  onPressBack,
  customBackArrow,
  tintColor = Colors.black,
}: Props) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <View style={[styles.headerContainer, style]}>
      <TouchableOpacity
        onPress={onPressBack ?? (() => goBack())}
        style={styles.headerLeft}>
        {leftIcon ? (
          leftIcon
        ) : (
          <CustomImage
            source={customBackArrow || IMAGES.backArrow2}
            containerStyle={styles.backArrow}
            imageStyle={{width: '100%', height: '100%', ...flipImage(language)}}
            tintColor={tintColor}
            resizeMode="contain"
          />
        )}
        <CommonText text={text} style={styles.headerTitle} />
      </TouchableOpacity>
      {rightIcon && rightIcon}
    </View>
  );
};

export default BackHeader;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    headerContainer: {
      marginTop: hp(20),
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerLeft: {
      gap: wp(16),
      ...rowReverseRTL(_language),
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
};
