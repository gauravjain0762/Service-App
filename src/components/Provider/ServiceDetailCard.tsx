import React from 'react';
import {StyleSheet, View} from 'react-native';

import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import ShadowCard from '../common/ShadowCard';
import CommonText from '../common/CommonText';
import {Colors} from '@/constants/Colors';
import AttachmentCard from '../common/AttachmentCard';
import AdittionalNote from '../common/AdittionalNote';
import CustomButton from '../common/CustomButton';
import {getLocalizedText, navigateTo} from '../common/commonFunction';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import moment from 'moment';

const ServiceDetailCard = ({requestDetails, language}: any) => {
  const start = moment(
    `${moment(requestDetails?.date).format('YYYY-MM-DD')} ${
      requestDetails?.time
    }`,
    'YYYY-MM-DD hh:mm A',
  );
  const end = moment(start).add(
    Number(requestDetails?.meta_data?.no_hours),
    'hours',
  );
  console.log(requestDetails, 'requestDetails');

  const serviceData = [
    {
      'Service Type': `${getLocalizedText(
        requestDetails?.category_id?.title,
        requestDetails?.category_id?.title_ar,
        language,
      )}`,
    },
    {
      'Service Category': `${getLocalizedText(
        requestDetails?.sub_category_id?.title,
        requestDetails?.sub_category_id?.title_ar,
        language,
      )}`,
    },
    {'Booking Date': `${start.format('ddd, DD MMM')}`},
    {'Booking Time': requestDetails?.time},
    {
      Location: requestDetails?.address
        ? `${requestDetails?.address?.apt_villa_no} ${requestDetails?.address?.building_name} ${requestDetails?.address?.directions}`
        : requestDetails?.location,
    },
    ...(requestDetails?.meta_data?.no_hours
      ? [{'No. of Hour': `${requestDetails?.meta_data?.no_hours} Hours`}]
      : []),
    ...(requestDetails?.meta_data?.no_professionals
      ? [
          {
            'No. of Professional': `${requestDetails?.meta_data?.no_professionals} Person`,
          },
        ]
      : []),
  ];

  return (
    <ShadowCard style={styles.card}>
      {serviceData.map((item, index) => (
        <View key={index} style={styles.row}>
          <CommonText text={Object.keys(item)[0]} style={styles.labelText} />
          <CommonText
            numberOfLines={2}
            text={Object.values(item)[0]}
            style={styles.valueText}
          />
        </View>
      ))}
      {requestDetails?.media_files?.length > 0 && (
        <AttachmentCard requestImages={requestDetails?.media_files} />
      )}
      <View style={{marginVertical: hp(29), width: '100%'}}>
        <AdittionalNote additionalNotes={requestDetails?.notes} />
      </View>

      <CustomButton
        title={'Make an Offer'}
        onPress={() => {
          navigateTo(PROVIDER_SCREENS.MakeOffer, {
            requestDetails: requestDetails,
          });
        }}
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
    gap: wp(15),
  },
  labelText: {
    ...commonFontStyle(400, 1.9, Colors._919191),
  },
  valueText: {
    flexShrink: 1,
    ...commonFontStyle(700, 1.9, Colors._2C2C2C),
    textAlign: 'right',
  },
});
