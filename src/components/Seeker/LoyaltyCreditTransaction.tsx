import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import CommonText from '../common/CommonText';
import CustomImage from '../common/CustomImage';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {getLocalizedText} from '../common/commonFunction';
import {useAppSelector} from '@/Hooks/hooks';
import {rowReverseRTL, textRTL} from '@/utils/arabicStyles';

type Props = {
  item?: any;
  style?: ViewStyle;
};

const LoyaltyCreditTransaction = ({item, style}: Props) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        <View style={styles.textContainer}>
          <CommonText
            text={getLocalizedText(
              item?.job_id?.category_id?.title,
              item?.job_id?.category_id?.title_ar,
              language,
            )}
            style={styles.titleText}
          />
          <CommonText
            text={getLocalizedText(
              item?.job_id?.sub_category_id?.title,
              item?.job_id?.sub_category_id?.title_ar,
              language,
            )}
            style={styles.subtitleText}
          />
        </View>
      </View>

      <View style={styles.priceSection}>
        <CommonText
          text={`${item?.points_type === 'reward' ? '+' : '-'}${item?.points}`}
          style={[
            styles.priceText,
            item?.points_type === 'reward' && {color: Colors._03B463},
          ]}>
          <CustomImage
            source={IMAGES.currency}
            imageStyle={{width: '100%', height: '100%'}}
            containerStyle={{width: wp(18), height: wp(18)}}
            tintColor={Colors._03B463}
          />
        </CommonText>
      </View>
    </View>
  );
};

export default LoyaltyCreditTransaction;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSection: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: wp(13),
      flexShrink: 1,
    },
    imageContainer: {
      height: hp(68),
      width: wp(68),
      borderRadius: hp(10),
      backgroundColor: Colors._E5E5E5,
    },
    textContainer: {
      gap: hp(11),
    },
    titleText: {
      ...commonFontStyle(600, 1.9, Colors.black),
      ...textRTL(_language),
    },
    subtitleText: {
      ...commonFontStyle(400, 1.7, Colors._898989),
      ...textRTL(_language),
    },
    priceSection: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: wp(5),
    },
    priceText: {
      ...commonFontStyle(600, 2.7, Colors.red),
    },
    ptsText: {
      ...commonFontStyle(600, 2, Colors.red),
    },
  });
};
