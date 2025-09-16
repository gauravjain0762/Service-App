/* eslint-disable react-native/no-inline-styles */
import React, {FC, ReactNode, memo} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {rowReverseRTL} from '@/utils/arabicStyles';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp} from '@/utils/responsiveFn';
import CommonText from './CommonText';
import { useAppSelector } from '@/Hooks/hooks';

type Props = {
  disabled?: boolean;
  title: any;
  onPress?: (event: GestureResponderEvent) => void;
  btnStyle?: StyleProp<ViewStyle>;
  leftImg?: ReactNode;
  textStyle?: TextStyle;
  type?: 'fill' | 'outline';
  RightImg?: ReactNode;
  loading?: boolean;
  isPrimary?: 'seeker' | 'provider';
} & TouchableOpacityProps;

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
   const {language} = useAppSelector(state => state.auth);
    const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return type === 'fill' ? (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      style={[
        styles.buttonStyle,
        {
          opacity: disabled ? 0.7 : 1,
          backgroundColor:
            isPrimary === 'seeker'
              ? Colors.seeker_primary
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
            style={{...commonFontStyle(500, 2, Colors.white), ...textStyle}}
          />
          {RightImg && RightImg}
        </>
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.buttonStyle,
        styles.outline_buttonStyle,
        {
          borderColor:
            isPrimary === 'seeker'
              ? Colors.seeker_primary
              : Colors.provider_primary,
        },
        btnStyle,
      ]}>
      {loading ? (
        <ActivityIndicator color={isPrimary === 'seeker' ?Colors.seeker_primary :Colors.white} />
      ) : (
        <>
          {leftImg && leftImg}
          <CommonText
            text={title}
            style={{
              ...commonFontStyle(
                500,
                2,
                isPrimary === 'seeker'
                  ? Colors.seeker_primary
                  : Colors.provider_primary,
              ),
              ...textStyle,
            }}
          />
          {RightImg && RightImg}
        </>
      )}
    </TouchableOpacity>
  );
};
export default memo(CustomButton);

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.provider_primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(100),
    gap: getFontSize(1.5),
    height: hp(55),
    ...rowReverseRTL(_language),
  },
  outline_buttonStyle: {
    backgroundColor: Colors.white,
    borderWidth: 1.3,
    borderColor: Colors._878787,
  },
})}
