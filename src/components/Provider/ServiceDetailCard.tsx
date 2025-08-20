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
    {'Booking Time': `${start.format('hh:mm')} - ${end.format('hh:mm')}`},
    {Location: requestDetails?.address},
    {'No. of Hour': `${requestDetails?.meta_data?.no_hours} Hours`},
    {
      'No. of Professional': `${requestDetails?.meta_data?.no_professionals} Person`,
    },
  ];

  return (
    <ShadowCard style={styles.card}>
      {serviceData.map((item, index) => (
        <View key={index} style={styles.row}>
          <CommonText text={Object.keys(item)[0]} style={styles.labelText} />
          <CommonText text={Object.values(item)[0]} style={styles.valueText} />
        </View>
      ))}
      <AttachmentCard requestImages={requestDetails?.media_files}/>
      <View style={{marginVertical: hp(29)}}>
        <AdittionalNote additionalNotes={requestDetails?.notes}/>
      </View>

      <CustomButton
        title={'Make an Offer'}
        onPress={() => {
          navigateTo(PROVIDER_SCREENS.MakeOffer,{request_id:requestDetails?._id});
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
  },
  labelText: {
    ...commonFontStyle(400, 1.9, Colors._919191),
  },
  valueText: {
    ...commonFontStyle(700, 1.9, Colors._2C2C2C),
  },
});
