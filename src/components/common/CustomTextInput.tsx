import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Pressable,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import CustomImage from './CustomImage';
import {IMAGES} from '../../assets/images';
import {commonFontStyle, getFontSize, hp, wp} from '../../utils/responsiveFn';
import {rowReverseRTL, textRTL} from '../../utils/arabicStyles';
import CommonText from './CommonText';
import {useTranslation} from 'react-i18next';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
  leftIcon?: any;
  rightIcon?: any;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  mainStyle?: ViewStyle;
  onPressSearchBar?: () => void;
  isError?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  required = false,
  secureTextEntry = false,
  placeholder,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  mainStyle,
  onPressSearchBar,
  isError = false,
  ...rest
}) => {
  const {t, i18n} = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  return (
    <View style={[styles.container, mainStyle]}>
      {label && (
        <CommonText text={label} style={styles.label}>
          {required && <Text style={styles.required}>*</Text>}
        </CommonText>
      )}
      <Pressable
        onPress={onPressSearchBar}
        style={[
          styles.inputContainer,
          isError && {borderColor: Colors.red},
          containerStyle,
        ]}>
        {leftIcon}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder ? t(placeholder) : ''}
          placeholderTextColor={Colors._5E5D5D}
          secureTextEntry={secureTextEntry ? !showPassword : false}
          {...rest}
        />
        {rightIcon}
        {secureTextEntry && (
          <CustomImage
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            source={!showPassword ? IMAGES.hide : IMAGES.view}
            size={getFontSize(2.5)}
            tintColor={Colors._5E5D5D}
          />
        )}
      </Pressable>
    </View>
  );
};

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      // marginBottom: hp(10),
      // flex: 1,
    },
    label: {
      marginBottom: hp(5),
      ...commonFontStyle(400, 1.9, Colors._5E5D5D),
    },
    required: {
      color: 'red',
    },
    input: {
      backgroundColor: Colors._F9F9F9,
      height: '100%',
      ...commonFontStyle(400, 1.9, Colors.black),
      flex: 1,
      ...textRTL(_language),
      verticalAlign:'top'
    },
    inputContainer: {
      backgroundColor: Colors._F9F9F9,
      borderRadius: hp(100),
      paddingHorizontal: wp(30),
      // marginTop: hp(5),
      height: hp(55),
      alignItems: 'center',
      ...rowReverseRTL(_language),
      // flex: 1,
      borderWidth: 1,
      borderColor: Colors._F9F9F9,
    },
  });
};

export default CustomTextInput;
