import React from 'react';
import {StyleSheet, View} from 'react-native';

import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import ShadowCard from '../common/ShadowCard';
import CommonText from '../common/CommonText';
import {Colors} from '@/constants/Colors';
import AttachmentCard from '../common/AttachmentCard';
import AdittionalNote from '../common/AdittionalNote';
import CustomButton from '../common/CustomButton';
import { navigateTo } from '../common/commonFunction';
import { PROVIDER_SCREENS } from '@/navigation/screenNames';

const ServiceDetailCard = () => {
  const serviceData = [
    {'Service Type': 'Repair & Maintenance'},
    {'Service Category': 'AC Regular Services'},
    {'Booking Date': 'Web, 18 Apr'},
    {'Booking Time': '09:00 - 12:00'},
    {Location: 'Dubai Internet City UAE'},
    {'No. of Hour': '2 Hours'},
    {'No. of Professional': '3 Person'},
  ];

  return (
    <ShadowCard style={styles.card}>
      {serviceData.map((item, index) => (
        <View key={index} style={styles.row}>
          <CommonText text={Object.keys(item)[0]} style={styles.labelText} />
          <CommonText text={Object.values(item)[0]} style={styles.valueText} />
        </View>
      ))}
      <AttachmentCard />
      <View style={{marginVertical: hp(29)}}>
        <AdittionalNote />
      </View>

      <CustomButton
        title={'Make an Offer'}
        onPress={() => {navigateTo(PROVIDER_SCREENS.MakeOffer)}}
        btnStyle={{alignSelf: 'center', width: '70%'}}
      />
    </ShadowCard>
  );
};

export default ServiceDetailCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: hp(20),
    paddingVertical: hp(30),
    paddingHorizontal: wp(24),
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(25),
  },
  labelText: {
    ...commonFontStyle(400, 1.9, Colors._919191),
  },
  valueText: {
    ...commonFontStyle(700, 1.9, Colors._2C2C2C),
  },
});
