import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CustomImage from './CustomImage';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {hp, wp, commonFontStyle} from '@/utils/responsiveFn';
import {useAppSelector} from '@/Hooks/hooks';
import {
  flipImage,
  marginRTLLeft,
  marginRTLRight,
  rowReverseRTL,
  textRTL,
} from '@/utils/arabicStyles';
import {IMAGES} from '@/assets/images';

type Props = {
  leftIcon: any;
  title: string;
  rightIcon?: any;
  onPress?: () => void;
  isDelete?: boolean;
  languageSection?: React.ReactNode;
  whatsappIcon?: boolean;
};

const ProfileActionItem: React.FC<Props> = ({
  leftIcon,
  title,
  rightIcon,
  onPress,
  isDelete = false,
  languageSection,
  whatsappIcon = false,
}) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <TouchableOpacity
      style={[styles.actionRow, isDelete && styles.deleteRow]}
      onPress={onPress}>
      <CustomImage source={leftIcon} size={hp(22)} />
      <CommonText text={title} style={styles.actionText} />
      {languageSection ? (
        languageSection
      ) : whatsappIcon ? (
        <CustomImage source={IMAGES.whatsapp} size={hp(25)} />
      ) : rightIcon ? (
        <CustomImage
          source={rightIcon}
          size={hp(16)}
          imageStyle={{...flipImage(language)}}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    actionRow: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      height: hp(60),
      backgroundColor: Colors._F9F9F9,
      borderRadius: hp(30),
      marginBottom: hp(15),
      paddingHorizontal: wp(16),
    },
    actionText: {
      flex: 1,
      ...marginRTLRight(_language, wp(12)),
      ...commonFontStyle(500, 2, Colors.black),
      ...textRTL(_language),
    },
    deleteRow: {
      backgroundColor: Colors._FFEAEA,
    },
  });
};

export default ProfileActionItem;
