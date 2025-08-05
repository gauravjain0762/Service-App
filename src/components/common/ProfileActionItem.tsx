import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CustomImage from './CustomImage';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {hp, wp, commonFontStyle} from '@/utils/responsiveFn';

type Props = {
  leftIcon: any;
  title: string;
  rightIcon?: any;
  onPress?: () => void;
  isDelete?: boolean;
  languageSection?: React.ReactNode;
};

const ProfileActionItem: React.FC<Props> = ({
  leftIcon,
  title,
  rightIcon,
  onPress,
  isDelete = false,
  languageSection,
}) => {
  return (
    <TouchableOpacity
      style={[styles.actionRow, isDelete && styles.deleteRow]}
      onPress={onPress}>
      <CustomImage source={leftIcon} size={hp(22)} />
      <CommonText text={title} style={styles.actionText} />
      {languageSection ? (
        languageSection
      ) : rightIcon ? (
        <CustomImage source={rightIcon} size={hp(16)} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: hp(16),
    height: hp(60),
    backgroundColor: Colors._F9F9F9,
    borderRadius: hp(30),
    marginBottom: hp(15),
    paddingHorizontal: wp(16),
  },
  actionText: {
    flex: 1,
    marginLeft: wp(12),
    ...commonFontStyle(500, 2, Colors.black),
  },
  deleteRow: {
    backgroundColor: Colors._F2EDED,
  },
});

export default ProfileActionItem;
