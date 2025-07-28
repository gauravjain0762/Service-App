import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {commonFontStyle, getFontSize} from '../../utils/responsiveFn';
import {Colors} from '../../constants/Colors';
import {GeneralStyle} from '../../constants/GeneralStyle';

const HomeScreen = () => {
  const {t, i18n} = useTranslation();

  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );
  return (
    <View style={GeneralStyle.container}>
      <View style={styles.subContainer}>
        <Text>HomeScreen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const getGlobalStyles = (language: any) => {
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
