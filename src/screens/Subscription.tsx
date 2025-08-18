import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import BackHeader from '@/components/common/BackHeader';
import CustomImage from '@/components/common/CustomImage';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';
import CustomButton from '@/components/common/CustomButton';
import {navigateTo, resetNavigation} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS, SCREENS} from '@/navigation/screenNames';

const Subscription = () => {
  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader
        text={'Subscription Plans'}
        onPressBack={() => resetNavigation(SCREENS.ProviderTabNavigation)}
      />

      <View style={styles.container}>
        <ImageBackground
          source={IMAGES.subs_bg2}
          style={styles.bgImage}
          resizeMode="cover"
          imageStyle={styles.backgroundImageStyle}>
          <View style={styles.content}>
            <View style={styles.priceRow}>
              <CustomImage
                size={hp(40)}
                source={IMAGES.currency}
                tintColor={Colors.white}
              />
              <CommonText text={'1000/Lifetime'} style={styles.priceText} />
            </View>

            <CommonText
              text={
                'Enjoy complete access to UnifiedHR shield features for a lifetime'
              }
              style={styles.description}
            />

            <View style={styles.benefitsWrapper}>
              <CommonText text={'Benefits'} style={styles.benefitsTitle} />

              <View style={styles.benefitItem}>
                <CustomImage source={IMAGES.true_mark} size={hp(24)} />
                <CommonText
                  text={'Unlimited view offers & get work.'}
                  style={styles.benefitText}
                />
              </View>
              <View style={styles.benefitItem}>
                <CustomImage source={IMAGES.true_mark} size={hp(24)} />
                <CommonText
                  text={'Review & rating upgrade your profile.'}
                  style={styles.benefitText}
                />
              </View>
              <View style={styles.benefitItem}>
                <CustomImage source={IMAGES.true_mark} size={hp(24)} />
                <CommonText
                  text={'Get earning & show your skills.'}
                  style={styles.benefitText}
                />
              </View>

              <CustomButton
                btnStyle={styles.btnStyle}
                title={'Get 7 Days Free Trail'}
              />
            </View>
          </View>
        </ImageBackground>

        <CustomButton
          title={'Subscription'}
          btnStyle={{marginTop: hp(40)}}
          onPress={() => navigateTo(PROVIDER_SCREENS.ProviderTabNavigation)}
        />
      </View>
    </SafeareaProvider>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: wp(24),
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    marginTop: hp(30),
  },
  bgImage: {
    width: '100%',
    height: hp(520),
    aspectRatio: 0.8,
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: hp(20),
  },
  backgroundImageStyle: {
    borderRadius: hp(20),
  },
  content: {
    padding: hp(35),
  },
  priceRow: {
    gap: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    ...commonFontStyle(500, 3.7, Colors._F6F6F6),
  },
  description: {
    marginTop: hp(12),
    ...commonFontStyle(500, 2, Colors.white),
  },
  benefitsWrapper: {
    gap: hp(22),
  },
  benefitsTitle: {
    marginVertical: hp(26),
    ...commonFontStyle(500, 2.2, Colors.white),
  },
  benefitItem: {
    gap: wp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    ...commonFontStyle(400, 1.9, Colors.white),
  },
  btnStyle: {
    marginTop: hp(30),
    borderWidth: hp(1.2),
    borderColor: Colors.white,
  },
});
