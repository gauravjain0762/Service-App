import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import BackHeader from '@/components/common/BackHeader';
import RequestCard from '@/components/common/RequestCard';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import Divider from '@/components/common/Divider';
import {IMAGES} from '@/assets/images';
import ShadowCard from '@/components/common/ShadowCard';
import CustomButton from '@/components/common/CustomButton';
import { navigateTo } from '@/components/common/commonFunction';
import { SCREENS } from '@/navigation/screenNames';

const images = [IMAGES.dummy2, IMAGES.dummy2, IMAGES.dummy2, IMAGES.dummy2]

const OffersDetails = () => {
  return (
    <SafeareaProvider style={styles.safeArea}>
      <View style={styles.topContainer}>
        <BackHeader
          text={'Create Request'}
          rightIcon={
            <View style={styles.rightIcon}>
              <CommonText text={'Offer 1'} style={styles.offerLabel} />
            </View>
          }
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <RequestCard
          style={styles.requestCard}
          text1={'Repair & Maintenance'}
          titleStyle={styles.titleStyle}
          text2={'AC Regular Services'}
          subtitleStyle={styles.subtitleStyle}
        />

        <Divider />

        <View style={styles.titleRow}>
          <CommonText text={'Repair & Maintenance'} style={styles.titleText} />
          <View style={styles.ratingRow}>
            <Image source={IMAGES.star} />
            <CommonText text={'4.9'} style={styles.ratingText} />
          </View>
        </View>

        <View style={styles.referenceRow}>
          <CommonText text={'Reference Code: '} style={styles.refLabel} />
          <CommonText text={'#D-698321'} style={styles.refValue} />
        </View>

        <View style={styles.featuresRow}>
          {['Expert Mechanic', 'Free Oil Change', 'Fair Price'].map(
            (item, index) => (
              <View
                key={index}
                style={[
                  styles.featureBadge,
                  index !== 2 && styles.featureSpacing,
                ]}>
                <CommonText text={item} style={styles.featureText} />
              </View>
            ),
          )}
        </View>

        <CommonText
          text={
            'A new battery has to be bought before the battery replacement. Here, the recommendations.'
          }
          style={styles.description}
        />

        <Divider />

        <View style={styles.bookingContainer}>
          <View style={styles.bookingRow}>
            <CommonText text={'Booking Date'} style={styles.bookingLabel} />
            <CommonText text={'Web, 18 Apr'} style={styles.bookingValue} />
          </View>
          <View style={styles.bookingRow}>
            <CommonText text={'Booking Time'} style={styles.bookingLabel} />
            <CommonText text={'09:00 - 12:00'} style={styles.bookingValue} />
          </View>
        </View>

        <ShadowCard style={styles.shadowCard}>
          <CommonText text={'Watch My Work'} style={styles.watchTitle} />

          <View style={styles.imageRow}>
            <Image source={images[0]} style={styles.imageBox} />

            <View style={styles.secondImageWrapper}>
              <Image
                source={images[1]}
                style={[styles.imageBox, styles.blurredImage]}
                blurRadius={images.length > 2 ? 5 : 0}
              />
              {images.length > 2 && (
                <View style={styles.overlay}>
                  <CommonText
                    text={`+${images.length - 2}`}
                    style={styles.overlayText}
                  />
                </View>
              )}
            </View>
          </View>
        </ShadowCard>

        <View style={styles.bottomRow}>
          <CustomButton
            title={'Accept Offer'}
            btnStyle={styles.acceptBtn}
            textStyle={styles.acceptText}
            onPress={() => navigateTo(SCREENS.AddCard)}
          />
          <View style={styles.priceRow}>
            <Image source={IMAGES.currency} style={styles.currencyIcon} />
            <CommonText text={'50.00'} style={styles.priceText} />
          </View>
        </View>
      </ScrollView>
    </SafeareaProvider>
  );
};

export default OffersDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    paddingHorizontal: wp(24),
  },
  scrollContainer: {
    paddingBottom: '5%',
    paddingHorizontal: wp(24),
  },
  requestCard: {
    marginVertical: hp(27),
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleStyle: {
    ...commonFontStyle(600, 2.1, Colors.black),
  },
  subtitleStyle: {
    ...commonFontStyle(600, 1.9, Colors._898989),
  },
  rightIcon: {
    borderRadius: hp(50),
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    backgroundColor: Colors.black,
  },
  offerLabel: {
    ...commonFontStyle(600, 1.3, Colors.white),
  },
  titleRow: {
    gap: wp(40),
    marginTop: hp(35),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...commonFontStyle(500, 2.2, Colors.black),
  },
  ratingRow: {
    gap: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...commonFontStyle(500, 2, Colors.black),
  },
  referenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(11),
  },
  refLabel: {
    ...commonFontStyle(400, 1.9, Colors._868686),
  },
  refValue: {
    ...commonFontStyle(400, 1.9, Colors.black),
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(20),
  },
  featureBadge: {
    borderRadius: hp(50),
    paddingVertical: hp(10),
    paddingHorizontal: wp(18),
    backgroundColor: Colors._F5F5F5,
  },
  featureSpacing: {
    marginRight: wp(10),
  },
  featureText: {
    ...commonFontStyle(500, 1.3, Colors.black),
  },
  description: {
    marginVertical: hp(20),
    ...commonFontStyle(400, 1.6, Colors._676767),
  },
  bookingContainer: {
    marginVertical: hp(27),
    gap: hp(22),
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingLabel: {
    ...commonFontStyle(400, 1.9, Colors._5E5E5E),
  },
  bookingValue: {
    ...commonFontStyle(700, 1.9, Colors._2C2C2C),
  },
  shadowCard: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: wp(17),
    paddingVertical: hp(20),
  },
  watchTitle: {
    paddingBottom: hp(17),
    ...commonFontStyle(600, 1.7, Colors._202020),
  },
  imageRow: {
    gap: wp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBox: {
    width: '48%',
    height: hp(150),
    borderRadius: hp(10),
  },
  bottomRow: {
    width: '100%',
    marginTop: hp(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acceptBtn: {
    height: hp(50),
    paddingHorizontal: wp(27),
    backgroundColor: Colors.seeker_primary,
  },
  acceptText: {
    ...commonFontStyle(600, 1.7, Colors.white),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(7),
  },
  currencyIcon: {
    height: hp(30),
    width: wp(30),
  },
  priceText: {
    ...commonFontStyle(700, 3.7, Colors.black),
  },
  secondImageWrapper: {
    position: 'relative',
    width: '48%',
    height: hp(150),
  },
  blurredImage: {
    width: '100%',
    height: '100%',
    borderRadius: hp(10),
  },
  overlay: {
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    ...commonFontStyle(700, 2.5, Colors.white),
  },
});
