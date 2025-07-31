import {Colors} from '@/constants/Colors';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

type Props = {
  children: any;
  containerStyle?: ViewStyle[] | {};
  colors?: string[] | '';
  SafeAreaProps?: SafeAreaViewProps;
};

const SafeareaProvider = ({SafeAreaProps, children, containerStyle}: Props) => {
  return (
    <SafeAreaView
      {...SafeAreaProps}
      style={[styles.main]}
      edges={SafeAreaProps?.edges ?? ['top']}>
      <View style={[styles.containerStyle, containerStyle]}>{children}</View>
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
