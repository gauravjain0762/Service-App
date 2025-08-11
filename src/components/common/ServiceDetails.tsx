import React from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

type Props = {
  style?: ViewStyle;
};

const ServiceDetails = ({style}: Props) => {
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
        contentContainerStyle={{
          marginTop: hp(10),
          paddingBottom: hp(25),
          paddingHorizontal: wp(24),
        }}
        data={ServiceDetail}
        renderItem={({item, index}) => (
          <ShadowCard key={index} style={[styles.paymentCard, style]}>
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
