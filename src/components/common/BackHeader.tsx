import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {navigationRef} from '@/navigation/RootContainer';

type Props = {
  text: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  customBackArrow?: any;
};

const BackHeader = ({leftIcon, rightIcon, text, customBackArrow}: Props) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        {leftIcon ? (
          leftIcon
        ) : (
          <Pressable onPress={() => navigationRef?.current?.goBack()}>
            <Image 
              source={customBackArrow || IMAGES.backArrow2} 
              style={styles.backArrow}
            />
          </Pressable>
        )}
        <CommonText text={text} style={styles.headerTitle} />
      </View>
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
