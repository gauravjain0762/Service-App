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

const BookingCard = () => {
  return (
    <>
      <Pressable
        onPress={() => {
          navigateTo(SEEKER_SCREENS.Offers);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: wp(20)}}>
          <View
            style={{
              width: wp(100),
              height: hp(100),
              borderRadius: hp(10),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors._E5E5E5,
            }}>
            <Image source={IMAGES.battery} />
          </View>
          <View style={{gap: hp(8)}}>
            <CommonText
              text={'Car Batter Change'}
              style={{
                ...commonFontStyle(700, 1.9, Colors.black),
              }}
            />
            <CommonText
              text={'Booking no: #6982'}
              style={{
                ...commonFontStyle(400, 1.4, Colors._7F7F7F),
              }}
            />
            <CommonText
              text={'Jul 3 - 01:45 PM'}
              style={{
                ...commonFontStyle(500, 1.6, Colors._7F7F7F),
              }}
            />
            <CustomButton
              title={'Confirmed'}
              btnStyle={{
                height: hp(30),
                width: wp(100),
                backgroundColor: Colors.seeker_primary,
              }}
              textStyle={{
                ...commonFontStyle(600, 1.4, Colors.white),
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: wp(37),
            height: hp(37),
            borderRadius: hp(37),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors._F6F6F6,
          }}>
          <Image
            source={IMAGES.rightArrow}
            tintColor={'grey'}
            style={{
              width: wp(15),
              height: hp(15),
            }}
          />
        </View>
      </Pressable>
      <Divider style={{marginVertical: hp(24)}} />
    </>
  );
};

export default BookingCard;

const styles = StyleSheet.create({});
