import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import CustomImage from '../common/CustomImage';
import {navigateTo} from '../common/commonFunction';
import {PROVIDER_SCREENS, SCREENS} from '@/navigation/screenNames';
import {useAppSelector} from '@/Hooks/hooks';
import { rowReverseRTL, textRTL } from '@/utils/arabicStyles';

type Props = {
  item?: any;
  index?: number;
};

const ProviderCards = ({item, index}: Props) => {
  const {language} = useAppSelector<any>(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const onPress = () => {
    if (index === 0) {
      navigateTo(PROVIDER_SCREENS.ProMyBookings);
    } else if (index === 1) {
      navigateTo(PROVIDER_SCREENS.TotalEarnings);
    } else if (index === 2) {
      navigateTo(PROVIDER_SCREENS.NewRequestScreen);
    } else if (index === 3) {
      navigateTo(PROVIDER_SCREENS.ProMyBookings, {status: 'Completed'});
    }
  };

  return (
    <TouchableOpacity
      key={index?.toString()}
      onPress={onPress}
      style={styles.cardContainer}>
      <View style={styles.row}>
        <CommonText text={item?.amount} style={styles.text} />
        <View style={styles.iconContainer}>
          <CustomImage source={item?.image} size={hp(17)} />
        </View>
      </View>

      <CommonText text={item?.desc} style={styles.subtext} />
    </TouchableOpacity>
  );
};

export default ProviderCards;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    cardContainer: {
      // flex: 1,
      gap: hp(16),
      width: '47.5%',
      borderWidth: hp(1.5),
      borderRadius: hp(15),
      paddingVertical: hp(16),
      paddingHorizontal: wp(21),
      borderColor: Colors._E6E6E6,
      backgroundColor: Colors.white,
    },
    row: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconContainer: {
      width: wp(37),
      height: hp(37),
      borderRadius: hp(37),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors._EDFAFF,
    },
    text: {
      ...commonFontStyle(600, 2.7, Colors._23B7F5),
      ...textRTL(_language)
    },
    subtext: {
      ...commonFontStyle(400, 2, Colors._8F8F8F),
       ...textRTL(_language)
    },
  });
};
