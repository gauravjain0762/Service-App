import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {getFontSize} from '../../utils/responsiveFn';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';

const SignUpFlow = () => {
  const {t, i18n} = useTranslation();
  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );

  return (
    <View style={styles.container}>
      <CustomTextInput label={t('Full name')} placeholder="Muhammad Zuhri" />
      <CustomTextInput
        label={t('Email')}
        placeholder="muhammad.zuhri@gmail.com"
      />
      <CustomTextInput
        label={t('Phone Number')}
        placeholder="muhammad.zuhri@gmail.com"
      />
      <CustomTextInput
        label={t('Password')}
        placeholder="*********"
        secureTextEntry={true}
      />
      <CustomButton title={t('Sign Up')} />
      <CustomButton title={t('Login as a Guest')} type="outline" />
    </View>
  );
};

export default SignUpFlow;

const getGlobalStyles = (language: any) => {
  return StyleSheet.create({
    container: {
      marginVertical: getFontSize(2),
    },
  });
};
