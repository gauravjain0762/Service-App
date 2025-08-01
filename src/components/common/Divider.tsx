import React from 'react';
import {StyleSheet, View} from 'react-native';

import {hp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';

const Divider = () => {
  return <View style={styles.divider} />;
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
