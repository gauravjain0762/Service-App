/* eslint-disable react-native/no-inline-styles */
import React, {FC, ReactNode, memo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {rowReverseRTL} from '@/utils/arabicStyles';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize} from '@/utils/responsiveFn';
import CommonText from './CommonText';

type Props = {
  disabled?: boolean;
  title: any;
  onPress?: () => void;
  btnStyle?: any;
  leftImg?: ReactNode;
  textStyle?: TextStyle;
  type?: 'fill' | 'outline';
  RightImg?: ReactNode;
  loading?: boolean;
  isPrimary?: 'seeker' | 'provider';
};

const CustomButton: FC<Props> = ({
  title,
  btnStyle,
  disabled,
  leftImg,
  textStyle,
  onPress = () => {},
  type = 'fill',
  RightImg,
  loading,
  isPrimary,
}) => {
  const {i18n} = useTranslation();
  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  return type === 'fill' ? (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[
        styles.buttonStyle,
        {
          opacity: disabled ? 0.7 : 1,
          backgroundColor:
            isPrimary === 'seeker'
              ? Colors.Seeker_primary
              : Colors.provider_primary,
        },
        btnStyle,
      ]}>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <>
          {leftImg && leftImg}
          <CommonText
            text={title}
            style={[{...commonFontStyle(500, 2, Colors.white)}, textStyle]}
          />
          {RightImg && RightImg}
        </>
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[
        styles.buttonStyle,
        styles.outline_buttonStyle,
        {
          borderColor:
            isPrimary === 'seeker'
              ? Colors.Seeker_primary
              : Colors.provider_primary,
        },
        btnStyle,
      ]}>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <>
          {leftImg && leftImg}
          <CommonText
            text={title}
            style={[
              {
                ...commonFontStyle(
                  500,
                  2,
                  isPrimary === 'seeker'
                    ? Colors.Seeker_primary
                    : Colors.provider_primary,
                ),
              },
              textStyle,
            ]}
          />
          {RightImg && RightImg}
        </>
      )}
    </TouchableOpacity>
  );
};
export default memo(CustomButton);

const getGlobalStyles = (language: any) => {
  return StyleSheet.create({
    buttonStyle: {
      backgroundColor: Colors.provider_primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      gap: getFontSize(1.5),
      height: getFontSize(7),
      marginVertical: getFontSize(1),
      ...rowReverseRTL(language),
    },
    outline_buttonStyle: {
      backgroundColor: Colors.white,
      borderWidth: 1.3,
      borderColor: Colors._878787,
    },
  });
};
