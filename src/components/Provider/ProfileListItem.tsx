import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomImage from '../common/CustomImage';
import {commonFontStyle, getFontSize, hp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import CommonText from '../common/CommonText';
import {IMAGES} from '@/assets/images';
import { useAppSelector } from '@/Hooks/hooks';
import { flipImage, rowReverseRTL, textRTL } from '@/utils/arabicStyles';

type Props = {
  item: any;
  onPress?: () => void;
};
const ProfileListItem = ({item, onPress}: Props) => {
  const {language} = useAppSelector<any>(state => state.auth);
    const styles = React.useMemo(() => getGlobalStyles(language), [language]);
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
        containerStyle={{...flipImage(language)}}
      />
    </TouchableOpacity>
  );
};

export default ProfileListItem;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  container: {
    ...rowReverseRTL(_language),
    alignItems: 'center',
    gap: getFontSize(1.5),
  },
  title: {
    ...commonFontStyle(500, 2, Colors._616161),
    flex: 1,
    ...textRTL(_language)
  },
})}
