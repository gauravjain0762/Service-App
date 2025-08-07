import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomImage from '../common/CustomImage';
import {commonFontStyle, getFontSize, hp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import CommonText from '../common/CommonText';
import {IMAGES} from '@/assets/images';

type Props = {
  item: any;
  onPress?: () => void;
};
const ProfileListItem = ({item, onPress}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      key={item?.id}
      onPress={onPress}
      style={styles.container}>
      <CustomImage
        source={item?.icon}
        size={hp(22)}
        resizeMode="contain"
        tintColor={Colors._808080}
        disabled={true}
      />
      <CommonText text={item?.title} style={styles.title} />
      <CustomImage
        source={IMAGES.rightArrow}
        size={hp(22)}
        resizeMode="contain"
        tintColor={Colors._808080}
        disabled={true}
      />
    </TouchableOpacity>
  );
};

export default ProfileListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getFontSize(1.5),
  },
  title: {
    ...commonFontStyle(500, 2, Colors._616161),
    flex: 1,
  },
});
