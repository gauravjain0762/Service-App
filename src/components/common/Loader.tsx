import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Loader = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{...styles.modalContainer, top: -insets.top}}>
      <ActivityIndicator size={'large'} color={Colors.white} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 999,
  },
});
