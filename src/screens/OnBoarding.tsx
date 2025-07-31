import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import CustomButton from '@/components/common/CustomButton';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';
import {commonFontStyle} from '@/utils/responsiveFn';
import {navigateTo} from '@/components/common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';
import {IMAGES} from '@/assets/images';
import SafeareaProvider from '@/components/common/SafeareaProvider';

const OnBoarding = () => {
  return (
    <SafeareaProvider>
      <Image source={IMAGES.Welcome_bg} />
      <View style={styles.container}>
        <CommonText text="Choose your role" style={styles.heading} />
        <CustomButton
          isPrimary="seeker"
          title={'Job Seeker'}
          onPress={() => navigateTo(SCREENS.SeekerNavigator)}
        />
        <CustomButton
          title={'Service Provider'}
          onPress={() => navigateTo(SCREENS.ProviderNavigator)}
        />
      </View>
    </SafeareaProvider>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'capitalize',
    ...commonFontStyle(600, 3.4, Colors.black),
  },
});
