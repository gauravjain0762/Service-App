import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {IMAGES} from '@/assets/images';
import CommonText from '@/components/common/CommonText';
import RequestCard from '@/components/common/RequestCard';
import CustomDates from '@/components/common/CustomDates';

const MyBookings = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);

  return (
    <SafeareaProvider style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Image source={IMAGES.backArrow2} />
          <CommonText text={'Create Request'} style={styles.headerTitle} />
        </View>
        <Image source={IMAGES.search} style={styles.searchIcon} />
      </View>

      <RequestCard style={styles.requestCard} />

      <View style={styles.locationContainer}>
        <Image source={IMAGES.dummy_map} />
        <View style={styles.locationDetails}>
          <CommonText text={'Add Location'} style={styles.locationTitle} />
          <CommonText
            text={'Dubai Internet City UAE'}
            style={styles.locationSubtitle}
          />
        </View>
        <View style={styles.changeBtn}>
          <CommonText text={'Change'} style={styles.changeBtnText} />
        </View>
      </View>

      <View style={{marginTop: hp(40)}}>
        <CustomDates
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </View>
    </SafeareaProvider>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: wp(24),
    backgroundColor: Colors.white,
  },
  headerContainer: {
    marginTop: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(16),
  },
  headerTitle: {
    ...commonFontStyle(700, 2.4, Colors.black),
  },
  searchIcon: {
    height: hp(40),
    width: wp(40),
  },
  requestCard: {
    marginVertical: hp(40),
  },
  locationContainer: {
    gap: wp(20),
    elevation: 5,
    padding: hp(12),
    borderRadius: hp(20),
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDetails: {
    gap: hp(10),
  },
  locationTitle: {
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  locationSubtitle: {
    ...commonFontStyle(400, 1.7, Colors._7D7D7D),
  },
  changeBtn: {
    borderRadius: hp(50),
    paddingVertical: hp(6),
    paddingHorizontal: wp(12),
    backgroundColor: Colors._EBFCF4,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBtnText: {
    ...commonFontStyle(500, 1.4, Colors._039B55),
  },
});
