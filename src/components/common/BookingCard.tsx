import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import CommonText from './CommonText';
import CustomButton from './CustomButton';
import Divider from './Divider';
import {navigateTo} from './commonFunction';
import {SEEKER_SCREENS} from '@/navigation/screenNames';

type Props = {
  onPress?: () => void;
};

const BookingCard = ({onPress}: Props) => {
  return (
    <>
      <Pressable
        onPress={
          onPress
            ? onPress
            : () => {
                navigateTo(SEEKER_SCREENS.JobDetails);
              }
        }
        style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={IMAGES.battery} />
          </View>
          <View style={styles.detailsContainer}>
            <CommonText
              text={'Car Batter Change'}
              style={styles.titleText}
            />
            <CommonText
              text={'Booking no: #6982'}
              style={styles.bookingText}
            />
            <CommonText
              text={'Jul 3 - 01:45 PM'}
              style={styles.dateText}
            />
            <CustomButton
              title={'Confirmed'}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
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
  },
  divider: {
    marginVertical: hp(24),
  },
});