import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';
import Loader from './Loader';
import {Colors} from '@/constants/Colors';

type Props = {
  children: any;
  colors?: string[] | '';
  style?: ViewStyle[] | {};
  containerStyle?: ViewStyle[] | {};
  SafeAreaProps?: SafeAreaViewProps;
  loading?: boolean;
} & SafeAreaViewProps;

const SafeareaProvider = ({
  SafeAreaProps,
  children,
  style,
  containerStyle,
  loading,
}: Props) => {
  return (
    <SafeAreaView
      {...SafeAreaProps}
      style={[styles.main]}
      // edges={['top']}
    >
      <View style={[styles.containerStyle, style]}>{children}</View>

      {loading && <Loader />}
    </SafeAreaView>
  );
};

export default SafeareaProvider;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerStyle: {
    flex: 1,
  },
});
