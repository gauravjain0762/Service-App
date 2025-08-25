import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CustomImage from './CustomImage';

type Props = {
  color?: string;
  service?: string;
  providerName?: string;
  isViewProfile?: boolean;
  source?: any;
  onCallPress?: any;
  onMessagePress?: any;
};

const ServiceProvider = ({
  providerName,
  service,
  color,
  isViewProfile = true,
  source,
  onCallPress,
  onMessagePress,
}: Props) => {
  return (
    <View style={[styles.providerCard, {backgroundColor: color}]}>
      {/* <View style={styles.providerAvatarWrapper}>
        <Image
          resizeMode="contain"
          source={IMAGES.profile}
          style={styles.providerAvatar}
        />
      </View> */}
      <CustomImage
        uri={source}
        source={IMAGES.profile}
        containerStyle={styles.providerAvatarWrapper}
        imageStyle={styles.providerAvatar}
        resizeMode="contain"
      />
      <View style={styles.providerInfo}>
        <View style={styles.providerTopRow}>
          <CommonText
            text={providerName || 'Royal Santary Store'}
            style={styles.providerName}
          />
          {isViewProfile && (
            <View style={styles.ratingRow}>
              <Image source={IMAGES.star} />
              <CommonText text={'4.9'} style={styles.ratingText} />
            </View>
          )}
        </View>
        {service && (
          <CommonText
            text={service || 'AC Regular Services'}
            style={styles.providerService}
          />
        )}
        <View style={styles.actionRow}>
          <View style={styles.actionIconGroup}>
            <CustomImage
              onPress={onCallPress}
              source={IMAGES.call}
              containerStyle={styles.iconContainer}
              imageStyle={{width: '60%', height: '60%'}}
              tintColor={color}
            />
            <CustomImage
              onPress={onMessagePress}
              source={IMAGES.message}
              containerStyle={styles.iconContainer}
              imageStyle={{width: '60%', height: '60%'}}
              tintColor={color}
            />
          </View>

          {isViewProfile && (
            <View style={styles.viewProfileBtn}>
              <CommonText
                text={'View Profile'}
                style={styles.viewProfileText}
              />
            </View>
          )}
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
    borderRadius: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors._F4F4FE,
    height: hp(80),
    width: wp(80),
    overflow: 'hidden',
  },
  providerAvatar: {
    height: '100%',
    width: '100%',
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
