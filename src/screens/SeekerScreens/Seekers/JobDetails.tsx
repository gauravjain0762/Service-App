import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

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
import ServiceProvider from '@/components/common/ServiceProvider';
import ServiceDetails from '@/components/common/ServiceDetails';
import ServiceBillSummary from '@/components/common/ServiceBillSummary';

const JobDetails = () => {
  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader text={'Job Detail'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ShadowCard style={styles.jobCard}>
          <View style={styles.rowWithGap}>
            <Image source={IMAGES.dummy} />
            <View style={styles.jobInfoContainer}>
              <CommonText
                text={'Repair & Maintenance'}
                style={styles.jobTitle}
              />
              <CommonText
                text={'AC Regular Services'}
                style={styles.jobSubTitle}
              />
              <CommonText
                text={'Dubai Internet City UAE'}
                style={styles.jobLocation}
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

        <CommonText text={'Service Provider'} style={styles.sectionTitle} />

        <ServiceProvider />
        <ServiceDetails />
        <ServiceBillSummary />

        <CustomButton
          title={'Back To Home'}
          btnStyle={styles.backToHomeBtn}
          onPress={() =>
            resetNavigation(SCREENS.SeekerTabNavigation, SCREENS.Home, {
              openReviewModal: true,
            })
          }
        />
      </ScrollView>
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
  jobCard: {
    padding: wp(16),
    marginVertical: hp(27),
    alignItems: 'flex-start',
  },
  rowWithGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(20),
  },
  jobInfoContainer: {
    gap: hp(11),
  },
  jobTitle: {
    ...commonFontStyle(600, 1.9, Colors.black),
  },
  jobSubTitle: {
    ...commonFontStyle(400, 1.7, Colors._898989),
  },
  jobLocation: {
    ...commonFontStyle(400, 1.6, Colors._7D7D7D),
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
  sectionTitle: {
    marginTop: hp(30),
    ...commonFontStyle(600, 2.2, Colors.black),
  },

  backToHomeBtn: {
    marginTop: hp(40),
    backgroundColor: Colors.seeker_primary,
  },
});
