import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import ShadowCard from '@/components/common/ShadowCard';
import Divider from '@/components/common/Divider';
import {IMAGES} from '@/assets/images';
import CommonText from '@/components/common/CommonText';
import CustomButton from '@/components/common/CustomButton';
import {resetNavigation} from '@/components/common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';

const JobDetails = () => {
  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader text={'Job Detail'} />

      <ShadowCard
        style={{
          padding: wp(16),
          marginVertical: hp(27),
          alignItems: 'flex-start',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: wp(20)}}>
          <Image source={IMAGES.dummy} />
          <View style={{gap: hp(11)}}>
            <CommonText
              text={'Repair & Maintenance'}
              style={{
                ...commonFontStyle(600, 1.9, Colors.black),
              }}
            />
            <CommonText
              text={'AC Regular Services'}
              style={{
                ...commonFontStyle(400, 1.7, Colors._898989),
              }}
            />
            <CommonText
              text={'Dubai Internet City UAE'}
              style={{
                ...commonFontStyle(400, 1.6, Colors._7D7D7D),
              }}
            />
          </View>
        </View>

        <View style={styles.bookingContainer}>
          <View style={styles.bookingRow}>
            <CommonText text={'Booking Date'} style={styles.bookingLabel} />
            <CommonText text={'Web, 18 Apr'} style={styles.bookingValue} />
          </View>
          <View style={styles.bookingRow}>
            <CommonText text={'Booking Time'} style={styles.bookingLabel} />
            <CommonText text={'09:00 - 12:00'} style={styles.bookingValue} />
          </View>
        </View>
      </ShadowCard>

      <Divider />

      <CommonText
        text={'Service Provider'}
        style={{...commonFontStyle(600, 2.2, Colors.black), marginTop: hp(30)}}
      />

      <ShadowCard
        style={{
          marginTop: hp(25),
          alignItems: 'flex-start',
          paddingHorizontal: wp(25),
        }}>
        <View style={{gap: hp(13)}}>
          <CommonText
            text={'Payment Method'}
            style={{
              ...commonFontStyle(700, 2.2, Colors.black),
            }}
          />
          <CommonText
            text={'Apple Pay'}
            style={{
              ...commonFontStyle(400, 2.2, Colors._828282),
            }}
          />
        </View>
      </ShadowCard>

      <CustomButton
        title={'Back To Home'}
        onPress={() => {
          resetNavigation(SCREENS.SeekerNavigator);
        }}
        btnStyle={{backgroundColor: Colors.seeker_primary, marginTop: hp(40)}}
      />
    </SafeareaProvider>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: wp(24),
    backgroundColor: Colors.white,
  },
  bookingContainer: {
    gap: hp(22),
    width: '100%',
    marginVertical: hp(27),
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingLabel: {
    ...commonFontStyle(400, 1.9, Colors._5E5E5E),
  },
  bookingValue: {
    ...commonFontStyle(700, 1.9, Colors._2C2C2C),
  },
});
