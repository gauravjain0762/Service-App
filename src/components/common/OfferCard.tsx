import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import CustomButton from './CustomButton';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';

type Props = {
  item?: any;
  index?: any;
  onPressOffer: () => void;
  onCardPress?: () => void;
  onPressAcceptOffer?: () => void;
  onPressEdit?: () => void;
};

const OfferCard = ({
  item,
  index,
  onPressOffer,
  onCardPress,
  onPressAcceptOffer,
  onPressEdit,
}: Props) => {
  
  return (
    <ShadowCard onCardPress={onCardPress} style={styles.card}>
      <View style={styles.offerBadge}>
        <CommonText text={`Offer ${index + 1}`} style={styles.offerText} />
      </View>

      <View style={styles.titleRow}>
        <CommonText
          text={item?.company_id?.category_id?.title}
          style={styles.titleText}
        />
        <View style={styles.ratingRow}>
          <Image source={IMAGES.star} />
          <CommonText
            text={item?.company_id?.avg_rating?.toString()}
            style={styles.ratingText}
          />
        </View>
      </View>

      <View style={styles.featuresRow}>
        {item?.company_id?.sub_categories.map((item: any, index: any) => (
          <View
            key={index}
            style={[styles.featureBadge, index !== 2 && styles.featureSpacing]}>
            <CommonText text={item?.title} style={styles.featureText} />
          </View>
        ))}
      </View>

      {item?.notes && (
        <View style={{marginTop: getFontSize(1.5)}}>
          <CommonText
            text={`Additional Note:- `}
            style={[
              styles.description,
              {...commonFontStyle(600, 1.6, Colors._676767)},
            ]}
          />
          <CommonText text={`${item?.notes}`} style={styles.description} />
        </View>
      )}
      {item?.request_change?.note && (
        <View style={{marginTop: getFontSize(1.5)}}>
          <CommonText
            text={`Change Request Note:-`}
            style={[
              styles.description,
              {...commonFontStyle(600, 1.6, Colors._676767)},
            ]}
          />
          <CommonText
            text={`${item?.request_change?.note}`}
            style={styles.description}
          />
        </View>
      )}

      <View style={styles.bottomRow}>
        <View style={styles.buttonContainer}>
          {!item?.request_change?.requested ? (
            <>
              <CustomButton
                isPrimary="seeker"
                title={'Edit'}
                type="fill"
                btnStyle={[styles.acceptBtn, {backgroundColor: Colors.black}]}
                style={{margin: 0}}
                textStyle={styles.acceptText}
                onPress={onPressEdit}
              />

              <CustomButton
                title={'Accept'}
                textStyle={styles.acceptText}
                btnStyle={styles.acceptBtn}
                onPress={onPressAcceptOffer}
              />
            </>
          ) : (
            <CustomButton
              title={'Change Requested'}
              textStyle={styles.acceptText}
              btnStyle={styles.acceptBtn}
              disabled
            />
          )}
        </View>
        <View style={styles.priceRow}>
          <Image source={IMAGES.currency} style={styles.currencyIcon} />
          <CommonText text={item?.offer_price} style={styles.priceText} />
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(20),
    gap: wp(10),
  },
  featureBadge: {
    borderRadius: hp(50),
    paddingVertical: hp(10),
    paddingHorizontal: wp(18),
    backgroundColor: Colors._F5F5F5,
  },
  featureSpacing: {
    // marginRight: wp(10),
  },
  featureText: {
    ...commonFontStyle(500, 1.3, Colors.black),
  },
  description: {
    // marginTop: getFontSize(1.5),
    ...commonFontStyle(400, 1.6, Colors._676767),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: getFontSize(1.5),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getFontSize(1),
  },
  acceptBtn: {
    height: hp(50),
    paddingHorizontal: wp(27),
    backgroundColor: Colors.seeker_primary,
  },
  acceptText: {
    ...commonFontStyle(600, 1.5, Colors.white),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(7),
  },
  currencyIcon: {
    height: hp(25),
    width: wp(25),
  },
  priceText: {
    ...commonFontStyle(700, 2.7, Colors.black),
  },
});
