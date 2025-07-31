import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Image,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import CustomImage from './CustomImage';
import {IMAGES} from '../../assets/images';
import {commonFontStyle, getFontSize, hp, wp} from '../../utils/responsiveFn';
import {rowReverseRTL} from '../../utils/arabicStyles';
import CommonText from './CommonText';
import {useTranslation} from 'react-i18next';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
  leftIcon?: any;
  rightIcon?: any;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  required = false,
  secureTextEntry = false,
  placeholder,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const {t} = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <CommonText text={label} style={styles.label}>
          {required && <Text style={styles.required}>*</Text>}
        </CommonText>
      )}
      <View style={styles.inputContainer}>
        {leftIcon && leftIcon}
        <TextInput
          style={styles.input}
          placeholder={placeholder ? t(placeholder) : ''}
          placeholderTextColor={Colors._5E5D5D}
          secureTextEntry={secureTextEntry ? !showPassword : false}
          {...rest}
        />
        {rightIcon && rightIcon}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  inputContainer: {
    backgroundColor: Colors._F9F9F9,
    borderRadius: hp(100),
    paddingHorizontal: wp(30),
    // marginTop: hp(5),
    height: getFontSize(7),
    alignItems: 'center',
    ...rowReverseRTL(),
    // flex: 1,
  },
});

export default CustomTextInput;
