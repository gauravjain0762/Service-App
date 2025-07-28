import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors} from '@/constants/Colors';
import {commonFontStyle} from '@/utils/responsiveFn';

interface CommonTextProps extends TextProps {
  text?: string;
  children?: React.ReactNode;
}

const CommonText = ({text, children, style, ...rest}: CommonTextProps) => {
  const {t, i18n} = useTranslation();

  const tStyles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );

  return (
    <Text style={[tStyles.commonText, style]} {...rest}>
      {text ? t(text) : null}
      {children}
    </Text>
  );
};

export default CommonText;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    commonText: {
      ...commonFontStyle(600, 3.4, Colors.black),
    },
  });
};
