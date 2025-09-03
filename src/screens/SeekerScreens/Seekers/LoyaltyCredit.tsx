import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {GeneralStyle} from '@/constants/GeneralStyle';
import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import CustomImage from '@/components/common/CustomImage';
import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, SCREEN_WIDTH} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';
import AnimatedCircleProgress from '@/components/common/AnimatedCircleProgress';

const LoyaltyCredit = () => {
  return (
    <SafeareaProvider>
      <BackHeader text={'Loyalty Credit'} style={GeneralStyle.back} />
      <View style={GeneralStyle.flex}>
        <ImageBackground
          source={IMAGES.loyalty_credit_card}
          style={styles.imageStyle}
          resizeMode="stretch">
          <CommonText text={'Loyalty Credit'} style={styles.headingText} />
          <View style={styles.creditView}>
            {/* <AnimatedCircleProgress total={25} value={20}> */}
            <CustomImage size={hp(40)} source={IMAGES.loyalty_credit} />
            {/* </AnimatedCircleProgress> */}
            <View>
              <CommonText text={'250pts'} style={styles.creditPoint} />
              <CommonText
                text={'these points earned in 20 orders'}
                style={styles.creditText}
              />
            </View>
          </View>
          <View style={styles.cardBgView}>
            <CommonText
              numberOfLines={1}
              text={'After 10 order you have get full loyalty credit'}
              style={styles.cardBottomText}
            />
          </View>
        </ImageBackground>
      </View>
    </SafeareaProvider>
  );
};

export default LoyaltyCredit;

const styles = StyleSheet.create({
  mainContainer: {},
  imageStyle: {
    width: SCREEN_WIDTH - hp(40),
    height: hp(200),
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: hp(20),
    justifyContent: 'space-between',
  },
  cardBgView: {
    backgroundColor: Colors._FBC943,
    width: '100%',
  },
  cardBottomText: {
    ...commonFontStyle(500, 1.9, Colors.black),
    padding: hp(10),
    color: Colors.black,
    textAlign: 'center',
  },
  headingText: {
    ...commonFontStyle(700, 2.8, Colors.white),
    paddingHorizontal: hp(25),
    paddingTop: hp(20),
  },
  creditView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: hp(10),
  },
  creditPoint: {
    ...commonFontStyle(600, 3.6, Colors.white),
  },
  creditText: {
    ...commonFontStyle(400, 1.9, Colors.white),
  },
});
