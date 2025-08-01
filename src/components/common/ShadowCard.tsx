import React from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';

import {hp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';

type props = {
  children: any;
  style?: ViewStyle;
  onCardPress?: () => void;
};

const ShadowCard = ({children, style, onCardPress}: props) => {
  return (
    <Pressable onPress={onCardPress} style={[styles.container, style]}>
      {children}{' '}
    </Pressable>
  );
};

export default ShadowCard;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: hp(16),
    paddingVertical: hp(20),
    shadowColor: Colors.black,
    backgroundColor: Colors.white,
    elevation: 6,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
  },
});
