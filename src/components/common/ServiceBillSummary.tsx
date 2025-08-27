import React from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';

import ShadowCard from './ShadowCard';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from './CommonText';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import Divider from './Divider';

type Props = {
  style?: ViewStyle;
  jobDetails?: any;
};

const ServiceBillSummary = ({style, jobDetails}: Props) => {
  const summaryDetails = [
    {label: 'Service Charges', amount: jobDetails?.service_charges ?? ''},
    {label: 'Sub Total', amount: jobDetails?.sub_total ?? ''},
  ];
  return (
    <ShadowCard style={[styles.card, style]}>
      {summaryDetails.map((item, index) => (
        <View
          key={index}
          style={[
            styles.rowWrapper,
            index < summaryDetails.length - 1 && styles.rowSpacing,
          ]}>
          <View style={styles.row}>
            <CommonText text={item.label} style={styles.label} />
            <View style={styles.amountRow}>
              <Image
                source={IMAGES.currency}
                tintColor={Colors._828282}
                style={styles.currencyIcon}
              />
              <CommonText text={item.amount} style={styles.amountText} />
            </View>
          </View>
        </View>
      ))}
      <Divider style={{marginTop: hp(27), width: '115%'}} />

      <View style={styles.totalRow}>
        <CommonText text="Total Bill" style={styles.totalLabel} />
        <View style={styles.totalAmountRow}>
          <Image
            source={IMAGES.currency}
            tintColor={Colors.black}
            style={styles.currencyIcon}
          />
          <CommonText
            text={jobDetails?.pay_amount ?? ''}
            style={styles.totalAmountText}
          />
        </View>
      </View>
    </ShadowCard>
  );
};

export default ServiceBillSummary;

const styles = StyleSheet.create({
  card: {
    // marginTop: hp(17),
    paddingVertical: hp(16),
    paddingHorizontal: wp(25),
  },
  rowWrapper: {
    width: '100%',
  },
  rowSpacing: {
    marginBottom: hp(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 3,
    ...commonFontStyle(400, 2.2, Colors._828282),
  },
  amountRow: {
    flex: 1,
    gap: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  totalAmountRow: {
    gap: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyIcon: {
    width: wp(20),
    height: hp(20),
  },
  amountText: {
    ...commonFontStyle(400, 2.2, Colors._828282),
  },
  totalRow: {
    width: '100%',
    marginTop: hp(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    ...commonFontStyle(700, 2.2, Colors.black),
  },
  totalAmountText: {
    ...commonFontStyle(700, 2.2, Colors.black),
  },
});
