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
  data?: any;
  totalAmount?: any;
};

const ServiceBillSummary = ({style, jobDetails, data, totalAmount}: Props) => {
  const summaryDetails = [
    {label: 'Platform Fees', amount: jobDetails?.service_charges ?? ''},
    {label: 'Sub Total', amount: jobDetails?.sub_total ?? ''},
  ];

  const billData = data ? data : summaryDetails;
  return (
    <ShadowCard style={[styles.card, style]}>
      {billData.map((item, index) => (
        <View
          key={index}
          style={[
            styles.rowWrapper,
            index < billData.length - 1 && styles.rowSpacing,
          ]}>
          <View style={styles.row}>
            <CommonText
              text={item.label}
              style={[
                styles.label,
                item?.isGreen && {color: Colors.seeker_primary},
              ]}
            />
            <View style={styles.amountRow}>
              <Image
                source={IMAGES.currency}
                tintColor={
                  item?.isGreen ? Colors.seeker_primary : Colors._828282
                }
                style={styles.currencyIcon}
              />
              <CommonText
                text={item.amount}
                style={[
                  styles.amountText,
                  item?.isGreen && {color: Colors.seeker_primary},
                ]}
              />
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
            text={jobDetails?.pay_amount ?? totalAmount ?? ''}
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
