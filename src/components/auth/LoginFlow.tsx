import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import {rowReverseRTL} from '../../utils/arabicStyles';
import {commonFontStyle, getFontSize} from '../../utils/responsiveFn';
import {Colors} from '../../constants/Colors';
import {IMAGES} from '../../assets/images';
import CheckBox from 'react-native-check-box';
import {navigateTo} from '../common/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import CustomImage from '../common/CustomImage';
import { useAppSelector } from '@/Hooks/hooks';
import { useGuestLoginMutation } from '@/api/Seeker/authApi';

const LoginFlow = ({setActiveTab}: any) => {
  const {t, i18n} = useTranslation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {fcmToken, language} = useAppSelector(state => state.auth);
    const [guestLogin, {isLoading: isGuestLoading}] = useGuestLoginMutation();

  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  const onGuestUser = async () => {
      let data = {
        device_token: fcmToken || 's',
        device_type: Platform.OS,
      };
      const response = await guestLogin(data).unwrap();
    };

  return (
    <View style={styles.container}>
      <CustomTextInput
        label={t('Email')}
        placeholder="muhammad.zuhri@gmail.com"
      />
      <CustomTextInput
        label={t('Password')}
        placeholder="*********"
        secureTextEntry={true}
      />
      <View style={styles.midContainer}>
        <CheckBox
          style={{gap: getFontSize(0.5), flex: 1}}
          onClick={() => {
            setToggleCheckBox(!toggleCheckBox);
          }}
          isChecked={toggleCheckBox}
          uncheckedCheckBoxColor="#878787"
          rightText={t('Remember me')}
          rightTextStyle={styles.checkBoxText}
        />
        <Text style={styles.checkBoxText}>{t('Forgot Password?')}</Text>
      </View>
      <CustomButton title={t('Login')} btnStyle={{marginTop: getFontSize(2)}} />
      <CustomButton
        title={t('Login as a Guest')}
        type="outline"
        onPress={onGuestUser}
      />
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.label}>{t('Or Sign In With')}</Text>
        <View style={styles.divider} />
      </View>
      {/* <View style={styles.socialContainer}>
        <CustomButton
          title={t('Google')}
          btnStyle={styles.socialButton}
          leftImg={
            <CustomImage source={IMAGES.google} size={getFontSize(2.5)} />
          }
          textStyle={styles.socialBtnText}
        />
        <CustomButton
          title={t('Apple')}
          btnStyle={styles.socialButton}
          leftImg={
            <CustomImage source={IMAGES.apple} size={getFontSize(2.5)} />
          }
          textStyle={styles.socialBtnText}
        />
      </View> */}
      <Text
        suppressHighlighting={true}
        onPress={() => {
          setActiveTab(1);
        }}
        style={styles.accountText}>
        {t('Don’t have an account?')}{' '}
        <Text style={styles.signUpAccountText}>{t('Sign Up')}</Text>
      </Text>
    </View>
  );
};

export default LoginFlow;

const getGlobalStyles = (language: any) => {
  return StyleSheet.create({
    container: {
      marginVertical: getFontSize(2),
    },
    label: {
      ...commonFontStyle(400, 1.9, Colors._6B6969),
      paddingHorizontal: getFontSize(1.4),
    },
    divider: {
      height: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      flex: 1,
    },
    midContainer: {
      ...rowReverseRTL(language),
      justifyContent: 'space-between',
      paddingTop: getFontSize(1),
      paddingBottom: getFontSize(2),
    },
    dividerContainer: {
      ...rowReverseRTL(language),
      alignItems: 'center',
      paddingVertical: getFontSize(3),
    },
    socialContainer: {
      ...rowReverseRTL(language),
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: getFontSize(1),
    },
    socialButton: {
      backgroundColor: Colors._F8F7FC,
      borderColor: Colors._F3F3F3,
      borderWidth: 1,
      width: '48%',
    },
    socialBtnText: {
      ...commonFontStyle(400, 2, Colors._0C0C0C),
    },
    accountText: {
      ...commonFontStyle(400, 2, Colors._909090),
      textAlign: 'center',
      paddingVertical: getFontSize(3),
    },
    signUpAccountText: {
      ...commonFontStyle(600, 2, Colors.black),
    },
    checkBoxText: {
      ...commonFontStyle(400, 1.9, Colors._5E5D5D),
    },
  });
};
