import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {useTranslation} from 'react-i18next';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CustomImage from './CustomImage';
import {IMAGES} from '@/assets/images';
import { useAppSelector } from '@/Hooks/hooks';
import { alignItemsRTL, rowReverseRTL, textRTL } from '@/utils/arabicStyles';

type Props = {
  title?: string;
  style?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  textInputStyle?: TextInputProps['style'];
  isLeftImage?: boolean;
  placeholder?: string;
} & TextInputProps &
  TextProps;

const AddSpecialNote = ({
  style,
  title,
  cardStyle,
  textInputStyle,
  placeholder='Describe here...',
  isLeftImage = false,
  ...rest
}: Props) => {
  const {t} = useTranslation();
  const {language} = useAppSelector(state => state.auth);
      const styles = React.useMemo(() => getGlobalStyles(language), [language]);

  return (
    <View style={[styles.card, cardStyle]}>
      {isLeftImage ? (
        <ShadowCard style={[styles.shadowCard, style]}>
          {title && <CommonText text={title} style={styles.specialNoteTitle} />}
          <View
            style={[
              styles.textInput,
              {...rowReverseRTL(language), alignItems: 'center',borderWidth:0,marginTop: hp(0)},
              // textInputStyle,
            ]}>
            <CustomImage
              source={IMAGES.currency}
              size={hp(25)}
              tintColor={Colors.provider_primary}
            />
            <TextInput
              multiline
              placeholder={t(`${placeholder}`)}
              style={[{flex:1,height:'100%'},textInputStyle]}
              scrollEnabled
              {...rest}
            />
          </View>
        </ShadowCard>
      ) : (
        <ShadowCard style={[styles.shadowCard, style]}>
          {title && <CommonText text={title} style={styles.specialNoteTitle} />}
          {/* <TextInput
          multiline
          placeholder={t('Describe here...')}
          style={[styles.textInput, textInputStyle]}
          {...rest}
        /> */}
          <TextInput
            multiline
             placeholder={t(`${placeholder}`)}
            style={[styles.textInput, textInputStyle]}
            scrollEnabled
            // textAlignVertical="top"
            {...rest}
          />
        </ShadowCard>
      )}
    </View>
  );
};

export default AddSpecialNote;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  card: {
    paddingHorizontal: wp(22),
  },
  shadowCard: {
    padding: hp(20),
    // alignItems: 'flex-start',
    ...alignItemsRTL(_language),
    height: hp(125),
    minHeight: hp(60),
    
  },
  specialNoteTitle: {
    ...commonFontStyle(600, 2.2, Colors.black),
    ...textRTL(_language)
  },
  textInput: {
    width: '100%',
    height: '100%',
    padding: hp(16),
    marginTop: hp(18),
    // minHeight: hp(60),
    borderWidth: hp(1),
    borderRadius: hp(10),
    textAlignVertical: 'top',
    borderColor: Colors._BFC2C1,
    ...textRTL(_language),
     ...(Platform.OS === 'android' && {
        includeFontPadding: false,
      }),
  },
})}
