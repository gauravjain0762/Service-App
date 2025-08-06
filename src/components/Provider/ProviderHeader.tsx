import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import CustomImage from '../common/CustomImage';

type Props = {
  item?: any;
  isBell?: boolean;
  style?: ViewStyle;
  isStarVisible?: boolean;
  avatarContainerStyle?: ViewStyle;
};

const ProviderHeader = ({
  item,
  style,
  isBell = true,
  avatarContainerStyle,
  isStarVisible = false,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        <View style={[styles.avatarContainer, avatarContainerStyle]}>
          <CustomImage
            source={item?.image ? {uri: item?.image} : IMAGES.profile_avatar}
            size={hp(35)}
          />
        </View>
        <View style={styles.infoContainer}>
          <CommonText
            text={item?.name || 'Service Provider'}
            style={styles.title}
          />

          {isStarVisible && (
            <View style={styles.starRow}>
              {Array.from({length: 5}).map((_, index) => (
                <CustomImage
                  key={index}
                  size={hp(25)}
                  source={
                    index < item?.rating ? IMAGES.star : IMAGES.empty_star
                  }
                />
              ))}
            </View>
          )}

          <CommonText
            numberOfLines={3}
            style={styles.subtitle}
            text={item?.review_desc || 'Welcome back!'}
          />
        </View>
      </View>

      {isBell && (
        <View style={styles.bellContainer}>
          <CustomImage source={IMAGES.bell} size={hp(20)} />
        </View>
      )}
    </View>
  );
};

export default ProviderHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: hp(20),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(17),
    flex: 1,
  },
  avatarContainer: {
    width: wp(80),
    height: hp(80),
    borderRadius: hp(17),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors._f4f4fe,
  },
  infoContainer: {
    flex: 1,
    gap: hp(8),
  },
  title: {
    ...commonFontStyle(600, 2.4, Colors.black),
  },
  subtitle: {
    flexShrink: 1,
    ...commonFontStyle(400, 2.1, Colors._848484),
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(5),
  },
  bellContainer: {
    width: wp(37),
    height: hp(37),
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors._EDFAFF,
  },
});
