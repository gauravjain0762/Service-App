import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

const ServiceDetails = () => {
  const ServiceDetail = [
    {'Payment Method': 'Apple Pay'},
    {'Service Type': 'Repair & Maintenance'},
    {
      'Service Subcategory': 'AC Repair Services ',
    },
    {
      'Services Address': 'Dubai Internet City',
    },
    {
      'Service Date & Time': '22-01-2025 - 12:00 am',
    },
    {
      'Service Status': 'Confirmed',
    },
  ];
  return (
    <>
      <FlatList
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{paddingBottom: hp(25), marginTop: hp(10)}}
        data={ServiceDetail}
        renderItem={({item, index}) => (
          <ShadowCard key={index} style={styles.paymentCard}>
            <View style={styles.paymentInfo}>
              <CommonText
                text={Object.keys(item)}
                style={styles.paymentLabel}
              />
              <CommonText
                text={Object.values(item)}
                style={styles.paymentValue}
              />
            </View>
          </ShadowCard>
        )}
      />
    </>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  paymentCard: {
    width: '95%',
    marginTop: hp(17),
    alignItems: 'flex-start',
    paddingHorizontal: wp(25),
  },
  paymentInfo: {
    gap: hp(13),
  },
  paymentLabel: {
    ...commonFontStyle(700, 2.2, Colors.black),
  },
  paymentValue: {
    ...commonFontStyle(400, 2.2, Colors._828282),
  },
});
