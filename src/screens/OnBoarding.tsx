import {Alert, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomButton from '@/components/common/CustomButton';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';
import {commonFontStyle} from '@/utils/responsiveFn';
import {navigateTo} from '@/components/common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';

const OnBoarding = () => {
  return (
    <View style={styles.container}>
      <CommonText text="Choose your role" style={styles.heading} />
      <CustomButton
        isPrimary="seeker"
        title={'Job Seeker'}
        onPress={() => Alert.alert('Under Development')}
      />
      <CustomButton
        title={'Service Provider'}
        onPress={() => navigateTo(SCREENS.ProviderNavigator)}
      />
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'capitalize',
    ...commonFontStyle(600, 3.4, Colors.black),
  },
});
