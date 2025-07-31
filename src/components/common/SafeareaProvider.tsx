import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

type Props = {
  children: any;
  colors?: string[] | '';
  style?: ViewStyle[] | {};
  containerStyle?: ViewStyle[] | {};
  SafeAreaProps?: SafeAreaViewProps;
} & SafeAreaViewProps;

const SafeareaProvider = ({
  SafeAreaProps,
  children,
  style,
  containerStyle,
}: Props) => {
  return (
    <SafeAreaView
      {...SafeAreaProps}
      style={[styles.main, style]}
      edges={['top']}>
      <View style={[styles.containerStyle, containerStyle]}>{children}</View>
    </SafeAreaView>
  );
};

export default SafeareaProvider;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
  },
});
