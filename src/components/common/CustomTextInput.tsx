import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Colors} from '../../constants/Colors';
import CustomImage from './CustomImage';
import {IMAGES} from '../../assets/images';
import {commonFontStyle, getFontSize} from '../../utils/responsiveFn';
import {rowReverseRTL} from '../../utils/arabicStyles';
import CommonText from './CommonText';
import {useTranslation} from 'react-i18next';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  required = false,
  secureTextEntry = false,
  placeholder,
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
        <TextInput
          style={styles.input}
          placeholder={placeholder ? t(placeholder) : ''}
          placeholderTextColor={Colors._5E5D5D}
          secureTextEntry={secureTextEntry ? !showPassword : false}
          {...rest}
        />
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
    marginBottom: getFontSize(2),
    flex: 1,
  },
  label: {
    marginBottom: getFontSize(1.3),
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
    borderRadius: getFontSize(100),
    paddingHorizontal: getFontSize(2),
    marginTop: getFontSize(0.5),
    height: getFontSize(7),
    alignItems: 'center',
    ...rowReverseRTL(),
    flex: 1,
  },
});

export default CustomTextInput;
