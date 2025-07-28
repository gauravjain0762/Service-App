import React, {FC, ReactNode, memo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {rowReverseRTL} from '../../utils/arabicStyles';
import {Colors} from '../../constants/Colors';
import { commonFontStyle, getFontSize } from '../../utils/responsiveFn';

type Props = {
  disabled?: boolean;
  isFilled?: boolean;
  title: any;
  onPress?: () => void;
  btnStyle?: any;
  leftImg?: ReactNode;
  textStyle?: TextStyle;
  type?: 'fill' | 'outline';
  RightImg?: ReactNode;
  loading?: boolean;
};
const CustomButton: FC<Props> = ({
  title,
  btnStyle,
  isFilled,
  disabled,
  leftImg,
  textStyle,
  onPress = () => {},
  type = 'fill',
  RightImg,
  loading,
}) => {
  const {t, i18n} = useTranslation();
  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  return type == 'fill' ? (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[styles.buttonStyle, {opacity: disabled ? 0.7 : 1}, btnStyle]}>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <>
          {leftImg && leftImg}
          <Text style={[{...commonFontStyle(500, 2, Colors.white)}, textStyle]}>
            {title}
          </Text>
          {RightImg && RightImg}
        </>
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[styles.buttonStyle, styles.outline_buttonStyle, btnStyle]}>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <>
          {leftImg && leftImg}
          <Text
            style={[{...commonFontStyle(500, 2, Colors._484848)}, textStyle]}>
            {title}
          </Text>
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
      backgroundColor: Colors.black,
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
