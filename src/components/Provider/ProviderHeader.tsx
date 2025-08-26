import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import CommonText from '../common/CommonText';
import CustomImage from '../common/CustomImage';
import {getLocalizedText, navigateTo} from '../common/commonFunction';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {useAppSelector} from '@/Hooks/hooks';

type Props = {
  item?: any;
  size?: number;
  isBell?: boolean;
  style?: ViewStyle;
  titleStyle?: ViewStyle;
  isStarVisible?: boolean;
  subtitleStyle?: ViewStyle;
  onPressProfile?: () => void;
  avatarContainerStyle?: ViewStyle;
};

const ProviderHeader = ({
  size,
  item,
  style,
  titleStyle,
  isBell = true,
  subtitleStyle,
  onPressProfile,
  avatarContainerStyle,
  isStarVisible = false,
}: Props) => {
  const {userInfo, dropDownCategories, language} = useAppSelector(
    state => state.auth,
  );
  const categoryData = dropDownCategories?.find(
    val => val?._id === userInfo?.category_id,
  );
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        <View style={[styles.avatarContainer, avatarContainerStyle]}>
          <CustomImage
            onPress={onPressProfile}
            imageStyle={{height: '100%', width: '100%'}}
            source={!item?.image && IMAGES.profile_avatar}
            uri={item?.image}
            containerStyle={{height: '100%', width: '100%'}}
          />
        </View>
        <View style={styles.infoContainer}>
          <CommonText
            text={item?.name || userInfo?.name || 'Service Provider'}
            style={[styles.title, titleStyle]}
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
            style={[styles.subtitle, subtitleStyle]}
            text={
              getLocalizedText(
                categoryData?.title,
                categoryData?.title_ar,
                language,
              ) || 'Welcome back!'
            }
          />
        </View>
      </View>

      {isBell && (
        <View style={styles.bellContainer}>
          <CustomImage
            size={hp(20)}
            source={IMAGES.bell}
            onPress={() =>
              navigateTo(PROVIDER_SCREENS.Notifications, {isProvider: true})
            }
          />
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
    overflow: 'hidden',
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
    width: wp(38),
    height: hp(38),
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors._EDFAFF,
  },
});
