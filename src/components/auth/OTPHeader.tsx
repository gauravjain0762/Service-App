/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../assets/images';
import {commonFontStyle, getFontSize} from '../../utils/responsiveFn';
import {useTranslation} from 'react-i18next';
import {flipImage, rowReverseRTL} from '../../utils/arabicStyles';
import {Colors} from '../../constants/Colors';
import CustomImage from '../common/CustomImage';
import {goBack} from '../common/commonFunction';
import {useAppSelector} from '@/Hooks/hooks';

const OTPHeader = () => {
  const {t} = useTranslation();
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <View style={styles.headerContainer}>
      <CustomImage
        onPress={() => {
          goBack();
        }}
        source={IMAGES.backArrow}
        size={getFontSize(2.5)}
        containerStyle={{alignSelf: 'center'}}
        imageStyle={{...flipImage(language)}}
      />
      <Text style={styles.headerText}>{t('Verification')}</Text>
      <CustomImage
        source={IMAGES.backArrow}
        size={getFontSize(2.5)}
        containerStyle={{alignSelf: 'center'}}
        imageStyle={{}}
        tintColor={'transparent'}
      />
    </View>
  );
};

export default OTPHeader;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    headerContainer: {
      paddingVertical: getFontSize(1.8),
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      ...commonFontStyle(600, 3.4, Colors.black),
    },
  });
};
