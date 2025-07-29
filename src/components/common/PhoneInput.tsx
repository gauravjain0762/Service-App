import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import {IMAGES} from '../../assets/images';
import {commonFontStyle, getFontSize} from '../../utils/responsiveFn';
import {rowReverseRTL} from '../../utils/arabicStyles';
import CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';
import CommonText from './CommonText';

interface PhoneInputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  callingCode?: any;
  setCallingCode?: any;
}

interface country {
  cca2: React.SetStateAction<string>;
  callingCode: React.SetStateAction<string>[];
}
const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  required = false,
  containerStyle,
  inputContainerStyle,
  callingCode,
  setCallingCode,
  ...rest
}) => {
  // const [callingCode, setCallingCode] = useState('971'); // Default calling code

  const [countryCode, setCountryCode] = useState<CountryCode>('AE');

  const onSelect = (country: country) => {
    setCountryCode(country.cca2 as CountryCode);
    setCallingCode(country.callingCode[0]);
  };
  return (
    <View style={[styles.container, {...containerStyle}]}>
      {label && (
        <CommonText text={label} style={styles.label}>
          {required && <Text style={styles.required}>*</Text>}
        </CommonText>
      )}
      <View style={[styles.inputContainer, {...inputContainerStyle}]}>
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCallingCode
          withEmoji
          onSelect={onSelect}
          renderFlagButton={(props: any) => {
            return (
              <TouchableOpacity
                onPress={props.onOpen}
                style={styles.customFlagButton}>
                <FastImage
                  source={{
                    uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
                  }}
                  style={styles.flagImage}
                  resizeMode="stretch"
                />
                <Text style={styles.callingCode}>+{callingCode}</Text>
                <FastImage
                  source={IMAGES.downArrow}
                  style={styles.downArrowImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          }}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors._5E5D5D}
          keyboardType="phone-pad"
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingLeft: getFontSize(2),
  },

  inputContainer: {
    backgroundColor: Colors._F9F9F9,
    borderRadius: getFontSize(100),
    paddingHorizontal: getFontSize(2),
    marginTop: getFontSize(0.5),
    height: getFontSize(7),
    ...rowReverseRTL(),
    alignItems: 'center',
  },
  customFlagButton: {
    ...rowReverseRTL(),
    alignItems: 'center',
    gap: getFontSize(0.8),
  },
  flagImage: {
    width: getFontSize(3.5),
    height: getFontSize(3.5),
    resizeMode: 'stretch',
    borderRadius: getFontSize(100),
  },
  downArrowImage: {
    width: getFontSize(1.8),
    height: getFontSize(1.8),
  },
  callingCode: {
    ...commonFontStyle(400, 1.9, Colors._5E5D5D),
  },
});

export default PhoneInput;
