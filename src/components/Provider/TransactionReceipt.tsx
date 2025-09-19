import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import CommonText from '../common/CommonText';
import CustomImage from '../common/CustomImage';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {useAppSelector} from '@/Hooks/hooks';
import {rowReverseRTL} from '@/utils/arabicStyles';
import {formatPriceIN, getLocalizedText} from '../common/commonFunction';

type Props = {
  item?: any;
  style?: ViewStyle;
};

const TransactionReceipt = ({style, item}: Props) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        <View style={styles.imageContainer}>
          <CustomImage source={IMAGES.dummy} size={hp(68)} />
        </View>

        <View style={styles.textContainer}>
          <CommonText
            text={getLocalizedText(
              item?.category?.title,
              item?.category?.title_ar,
              language,
            )}
            style={styles.titleText}
          />
          <CommonText
            text={getLocalizedText(
              item?.sub_category?.title,
              item?.sub_category?.title_ar,
              language,
            )}
            style={styles.subtitleText}
          />
        </View>
      </View>

      <View style={styles.priceSection}>
        <CustomImage
          source={IMAGES.currency}
          size={hp(28)}
          tintColor={Colors.seeker_primary}
        />
        <CommonText
          text={formatPriceIN(item?.amount)}
          style={styles.priceText}
        />
      </View>
    </View>
  );
};

export default TransactionReceipt;

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
    },
    subtitleText: {
      ...commonFontStyle(400, 1.7, Colors._898989),
    },
    priceSection: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: wp(5),
    },
    priceText: {
      ...commonFontStyle(600, 2.7, Colors.seeker_primary),
    },
  });
};
