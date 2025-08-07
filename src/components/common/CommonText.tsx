import React from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors} from '@/constants/Colors';
import {commonFontStyle} from '@/utils/responsiveFn';

interface CommonTextProps extends TextProps {
  children?: React.ReactNode;
  text?: string | any;
  style?: StyleProp<TextStyle>;
}

const CommonText = ({text, children, style, ...rest}: CommonTextProps) => {
  const {t} = useTranslation();

  return (
    <Text style={[styles.commonText, style]} {...rest}>
      {text ? t(text) : null}
      {children}
    </Text>
  );
};

export default CommonText;

const styles = StyleSheet.create({
  commonText: {
    ...commonFontStyle(600, 3.4, Colors.black),
  },
});
