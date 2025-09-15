import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import CommonText from './CommonText';
import CustomButton from './CustomButton';
import Divider from './Divider';
import {getLocalizedText, navigateTo} from './commonFunction';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import CustomImage from './CustomImage';
import {useAppSelector} from '@/Hooks/hooks';
import moment from 'moment';
import {flipImage, rowReverseRTL} from '@/utils/arabicStyles';

type Props = {
  item?: any;
  onPress?: () => void;
};

const BookingCard = ({item, onPress}: Props) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <>
      <Pressable
        onPress={
          onPress
            ? onPress
            : () => {
                navigateTo(SEEKER_SCREENS.JobDetails, {job_id: item?._id});
              }
        }
        style={styles.container}>
        <View style={styles.contentContainer}>
          <CustomImage
            uri={item?.category_id?.image}
            containerStyle={styles.imageContainer}
            imageStyle={{width: '100%', height: '100%'}}
          />
          <View style={styles.detailsContainer}>
            <CommonText
              text={getLocalizedText(
                item?.category_id?.title,
                item?.category_id?.title_ar,
                language,
              )}
              style={styles.titleText}
            />
            <CommonText
              text={`Booking no: ${item?.job_code}`}
              style={styles.bookingText}
            />
            <CommonText
              text={`${moment(item?.date).format('MMM DD')} - ${item?.time}`}
              style={styles.dateText}
            />
            <CustomButton
              title={item?.status}
              btnStyle={styles.statusButton}
              textStyle={styles.statusButtonText}
            />
          </View>
        </View>

        <View style={styles.arrowContainer}>
          <Image
            source={IMAGES.rightArrow}
            tintColor={'grey'}
            style={styles.arrowIcon}
          />
        </View>
      </Pressable>
      <Divider style={styles.divider} />
    </>
  );
};

export default BookingCard;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    contentContainer: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: wp(20),
    },
    imageContainer: {
      width: wp(100),
      height: hp(100),
      borderRadius: hp(10),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors._E5E5E5,
    },
    detailsContainer: {
      gap: hp(8),
    },
    titleText: {
      ...commonFontStyle(700, 1.9, Colors.black),
    },
    bookingText: {
      ...commonFontStyle(400, 1.4, Colors._7F7F7F),
    },
    dateText: {
      ...commonFontStyle(500, 1.6, Colors._7F7F7F),
    },
    statusButton: {
      height: hp(30),
      width: wp(100),
      backgroundColor: Colors.seeker_primary,
    },
    statusButtonText: {
      ...commonFontStyle(600, 1.4, Colors.white),
    },
    arrowContainer: {
      width: wp(37),
      height: hp(37),
      borderRadius: hp(37),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors._F6F6F6,
    },
    arrowIcon: {
      width: wp(15),
      height: hp(15),
      ...flipImage(_language),
    },
    divider: {
      marginVertical: hp(24),
    },
  });
};
