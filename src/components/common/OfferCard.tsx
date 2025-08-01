import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import CustomButton from './CustomButton';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

type Props = {
  onPressOffer: () => void;
  onCardPress?: () => void;
  onPressAcceptOffer?: () => void;
};

const OfferCard = ({onPressOffer, onCardPress, onPressAcceptOffer}: Props) => {
  return (
    <ShadowCard onCardPress={onCardPress} style={styles.card}>
      <View style={styles.offerBadge}>
        <CommonText text={'Offer 1'} style={styles.offerText} />
      </View>

      <View style={styles.titleRow}>
        <CommonText text={'Car Battery Replacement'} style={styles.titleText} />
        <View style={styles.ratingRow}>
          <Image source={IMAGES.star} />
          <CommonText text={'4.9'} style={styles.ratingText} />
        </View>
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

      <View style={styles.bottomRow}>
        <CustomButton
          title={'Accept Offer'}
          textStyle={styles.acceptText}
          btnStyle={styles.acceptBtn}
          onPress={onPressAcceptOffer}
        />
        <View style={styles.priceRow}>
          <Image source={IMAGES.currency} style={styles.currencyIcon} />
          <CommonText text={'50.00'} style={styles.priceText} />
        </View>
      </View>
    </ShadowCard>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: wp(24),
  },
  offerBadge: {
    borderRadius: hp(50),
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    backgroundColor: Colors.black,
  },
  offerText: {
    ...commonFontStyle(600, 1.3, Colors.white),
  },
  titleRow: {
    gap: wp(10),
    marginTop: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    ...commonFontStyle(400, 2.2, Colors.black),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(5),
  },
  ratingText: {
    ...commonFontStyle(500, 2, Colors.black),
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
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
});
