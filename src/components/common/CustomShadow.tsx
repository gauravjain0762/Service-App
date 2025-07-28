import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {Colors} from '../../constants/Colors';

interface CustomShadowProps {
  children: React.ReactNode;
  shadowStyle?: StyleProp<ViewStyle>;
}

const CustomShadow: React.FC<CustomShadowProps> = ({children, shadowStyle}) => {
  return (
    <DropShadow style={[styles.shadowStyle, shadowStyle]}>
      {children}
    </DropShadow>
  );
};

export default CustomShadow;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
});
