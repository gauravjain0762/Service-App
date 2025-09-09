import React from 'react';
import {
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

type Props = {
  title?: string;
  style?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  textInputStyle?: TextInputProps['style'];
  isLeftImage?: boolean;
} & TextInputProps &
  TextProps;

const AddSpecialNote = ({
  style,
  title,
  cardStyle,
  textInputStyle,
  isLeftImage = false,
  ...rest
}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.card, cardStyle]}>
      {isLeftImage ? (
        <ShadowCard style={[styles.shadowCard, style]}>
          {title && <CommonText text={title} style={styles.specialNoteTitle} />}
          <View
            style={[
              styles.textInput,
              {flexDirection: 'row', alignItems: 'center'},
              textInputStyle,
            ]}>
            <CustomImage
              source={IMAGES.currency}
              size={hp(25)}
              tintColor={Colors.provider_primary}
            />
            <TextInput
              multiline
              placeholder={t('Describe here...')}
              style={[textInputStyle]}
              scrollEnabled
              // textAlignVertical="top"
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
            placeholder={t('Describe here...')}
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

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: wp(22),
  },
  shadowCard: {
    padding: hp(20),
    alignItems: 'flex-start',
    height: hp(125),
    minHeight: hp(60),
  },
  specialNoteTitle: {
    ...commonFontStyle(600, 2.2, Colors.black),
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
  },
});
