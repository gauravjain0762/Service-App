import React from 'react';
import {Image, StyleSheet, View, StatusBar, Platform} from 'react-native';

import CustomButton from '@/components/common/CustomButton';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';
import {commonFontStyle, hp} from '@/utils/responsiveFn';
import {navigateTo} from '@/components/common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import CustomCarousel from '@/components/common/CustomCarousel';

const OnBoarding = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <SafeareaProvider
        SafeAreaProps={{edges: ['top']}}
        style={{backgroundColor: Colors.seeker_primary}}>
        <View style={styles.wrapper}>
          <CustomCarousel />

          <View style={styles.bottomSection}>
            <CommonText
              text="Welcome to Home Services"
              style={styles.heading1}
            />
            <CommonText
              text="Our services is to help you to clean your house as quick as possible."
              style={styles.description}
            />

            <View style={{gap: hp(23)}}>
              <CustomButton
                isPrimary="seeker"
                title={'Job Seeker'}
                onPress={() => navigateTo(SCREENS.SeekerNavigator)}
                textStyle={styles.btnText}
              />
              <CustomButton
                title={'Service Provider'}
                btnStyle={{backgroundColor: Colors._2B2B2B}}
                onPress={() => navigateTo(SCREENS.ProviderNavigator)}
                textStyle={styles.btnText}
              />
            </View>
          </View>
        </View>
      </SafeareaProvider>
    </>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bottomSection: {
    flex: 1,
    padding: hp(20),
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  heading1: {
    width: '60%',
    lineHeight: 43,
    textAlign: 'left',
    marginBottom: hp(22),
    ...commonFontStyle(600, 3.4, Colors.black),
  },
  description: {
    marginBottom: hp(40),
    ...commonFontStyle(400, 2, Colors._888888),
  },
  btnText: {...commonFontStyle(600, 2, Colors.white)},
});
