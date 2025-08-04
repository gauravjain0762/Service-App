import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {hp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';

type Props = {
  style?: ViewStyle;
};

const Divider = ({style}: Props) => {
  return <View style={[styles.divider, style]} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: hp(1),
    width: '150%',
    alignSelf: 'center',
    backgroundColor: Colors._EAEAEA,
  },
});
