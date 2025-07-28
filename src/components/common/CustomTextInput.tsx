import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useTranslation} from 'react-i18next';
import CustomImage from './CustomImage';
import {IMAGES} from '../../assets/images';
import {commonFontStyle, getFontSize} from '../../utils/responsiveFn';
import {rowReverseRTL} from '../../utils/arabicStyles';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  required?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  required = false,
  secureTextEntry = false,
  ...rest
}) => {
  const {t, i18n} = useTranslation();
  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
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

const getGlobalStyles = (language: any) => {
  return StyleSheet.create({
    container: {
      marginBottom: getFontSize(2),
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
      ...rowReverseRTL(language),
      alignItems: 'center',
    },
  });
};

export default CustomTextInput;
