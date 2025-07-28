import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {commonFontStyle, getFontSize} from '../../utils/responsiveFn';
import {Colors} from '../../constants/Colors';
import {GeneralStyle} from '../../constants/GeneralStyle';
import AnimatedTabBar from '../../components/AnimatedTabBar';
import LoginFlow from '../../components/auth/LoginFlow';
import SignUpFlow from '../../components/auth/SignUpFlow';
import {useTranslation} from 'react-i18next';

const LoginScreen = () => {
  const {t, i18n} = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [t('Login'), t('Sign Up')];

  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  return (
    <View style={GeneralStyle.container}>
      <View style={styles.subContainer}>
        <Text style={styles.topLabel}>
          {activeTab == 0 ? t('Welcome Back') : t('Get Started Now')}
        </Text>
        <Text style={styles.topSubLabel}>
          {activeTab == 0
            ? t('Login to access your account')
            : t('Create an account')}
        </Text>
        <AnimatedTabBar
          tabs={tabs}
          activeIndex={activeTab}
          onTabPress={setActiveTab}
          containerStyle={{marginVertical: getFontSize(2)}}
        />
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {activeTab == 0 ? (
            <LoginFlow setActiveTab={setActiveTab} />
          ) : (
            <SignUpFlow />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    topLabel: {
      marginTop: getFontSize(2),
      ...commonFontStyle(600, 3.4, Colors.black),
      textAlign: 'center',
    },
    topSubLabel: {
      marginTop: getFontSize(0.5),
      ...commonFontStyle(400, 2, Colors._5E5D5D),
      textAlign: 'center',
    },
    subContainer: {
      flex: 1,
      paddingHorizontal: getFontSize(2.2),
      paddingVertical: getFontSize(1.8),
    },
  });
};
