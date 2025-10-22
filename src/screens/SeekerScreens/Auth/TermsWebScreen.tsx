import React from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from '@/constants/Colors';
import WebView from 'react-native-webview';
import {hp, wp} from '@/utils/responsiveFn';
import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {useAppSelector} from '@/Hooks/hooks';

const TermsWebScreen = () => {
  const {language} = useAppSelector(state => state.auth);
  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader text="Terms" style={styles.headerStyle} />
      <WebView
        source={{
          uri:
            language === 'en'
              ? 'https://helpio.ae/terms'
              : 'https://helpio.ae/terms?lang=ar',
        }}
        style={{flex: 1}}
      />
    </SafeareaProvider>
  );
};

export default TermsWebScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: wp(20),
    backgroundColor: Colors.white,
  },
  headerStyle: {
    marginBottom: hp(20),
  },
});
