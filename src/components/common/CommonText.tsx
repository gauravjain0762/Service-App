import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors} from '@/constants/Colors';
import {commonFontStyle} from '@/utils/responsiveFn';

interface CommonTextProps extends TextProps {
  text?: string | any;
  children?: React.ReactNode;
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
