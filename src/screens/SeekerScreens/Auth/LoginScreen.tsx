import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import CustomTextInput from '@/components/common/CustomTextInput';
import CheckBox from 'react-native-check-box';
import CustomButton from '@/components/common/CustomButton';
import {commonFontStyle, getFontSize} from '@/utils/responsiveFn';
import {navigateTo} from '@/components/common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';
import {Colors} from '@/constants/Colors';
import {rowReverseRTL} from '@/utils/arabicStyles';
import CommonText from '@/components/common/CommonText';

const LoginScreen = ({setActiveTab}: any) => {
  const {t, i18n} = useTranslation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );

  return (
    <ScrollView style={styles.container}>
      <CommonText text="Login to Your Account" style={styles.topLabel} />
      <CustomTextInput placeholder="Email" />
      <CustomTextInput placeholder="Password" secureTextEntry={true} />
      <View style={styles.midContainer}>
        <CheckBox
          onClick={() => {
            setToggleCheckBox(!toggleCheckBox);
          }}
          isChecked={toggleCheckBox}
          uncheckedCheckBoxColor="#878787"
        />
        <CommonText text="I agree to follow the" style={styles.checkBoxText}>
          <CommonText text="terms of use" style={styles.checkBoxText2} />
        </CommonText>
      </View>
      <CustomButton title={t('Login')} btnStyle={{marginTop: getFontSize(2)}} />

      <CommonText text="Don’t have an account?" style={styles.accountText}>
        <CommonText text="Sign Up" style={styles.signUpAccountText} />
      </CommonText>
    </ScrollView>
  );
};

export default LoginScreen;

const getGlobalStyles = (language: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      paddingHorizontal: getFontSize(2.2),
      paddingTop: getFontSize(10),
    },
    topLabel: {
      ...commonFontStyle(600, 3.4, Colors.black),
      textAlign: 'center',
      paddingBottom: getFontSize(10),
    },

    midContainer: {
      ...rowReverseRTL(language),
      alignItems: 'center',
      gap: 10,
    },

    accountText: {
      ...commonFontStyle(400, 2, Colors._909090),
      textAlign: 'center',
      paddingVertical: getFontSize(3),
    },
    signUpAccountText: {
      ...commonFontStyle(600, 2, Colors.provider_primary),
    },
    checkBoxText: {
      ...commonFontStyle(400, 1.9, Colors._5E5D5D),
    },
    checkBoxText2: {
      ...commonFontStyle(400, 1.9, Colors.provider_primary),
    },
  });
};
