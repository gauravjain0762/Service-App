import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

type Props = {
  color?: string;
  service?: string;
  providerName?: string;
  isViewProfile?: boolean;
};

const ServiceProvider = ({providerName, service, color, isViewProfile=true}: Props) => {
  return (
    <View style={[styles.providerCard, {backgroundColor: color}]}>
      <View style={styles.providerAvatarWrapper}>
        <Image
          resizeMode="contain"
          source={IMAGES.profile}
          style={styles.providerAvatar}
        />
      </View>
      <View style={styles.providerInfo}>
        <View style={styles.providerTopRow}>
          <CommonText
            text={providerName || 'Royal Santary Store'}
            style={styles.providerName}
          />
         {isViewProfile && <View style={styles.ratingRow}>
            <Image source={IMAGES.star} />
            <CommonText text={'4.9'} style={styles.ratingText} />
          </View>}
        </View>
        <CommonText
          text={service || 'AC Regular Services'}
          style={styles.providerService}
        />
        <View style={styles.actionRow}>
          <View style={styles.actionIconGroup}>
            <View style={styles.iconContainer}>
              <Image source={IMAGES.call} tintColor={color} />
            </View>
            <View style={styles.iconContainer}>
              <Image source={IMAGES.message} tintColor={color} />
            </View>
          </View>

        {isViewProfile &&  <View style={styles.viewProfileBtn}>
            <CommonText text={'View Profile'} style={styles.viewProfileText} />
          </View>}
        </View>
      </View>
    </View>
  );
};

export default ServiceProvider;

const styles = StyleSheet.create({
  providerCard: {
    gap: wp(20),
    padding: hp(16),
    marginTop: hp(16),
    borderRadius: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.seeker_primary,
  },
  providerAvatarWrapper: {
    padding: hp(22),
    borderRadius: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors._F4F4FE,
  },
  providerAvatar: {
    height: hp(40),
    width: wp(40),
  },
  providerInfo: {
    flex: 1,
  },
  providerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  providerName: {
    width: '70%',
    ...commonFontStyle(600, 1.9, Colors.white),
  },

  ratingRow: {
    gap: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...commonFontStyle(500, 2, Colors.white),
  },
  providerService: {
    ...commonFontStyle(400, 1.7, Colors.white),
    marginTop: hp(11),
  },
  actionRow: {
    gap: wp(14),
    marginTop: hp(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionIconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(14),
  },
  iconContainer: {
    width: wp(33),
    height: hp(33),
    borderRadius: hp(33),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  viewProfileBtn: {
    borderRadius: hp(20),
    paddingVertical: hp(10),
    paddingHorizontal: wp(15),
    backgroundColor: Colors.white,
  },
  viewProfileText: {
    ...commonFontStyle(600, 1.2, Colors.seeker_primary),
  },
});
