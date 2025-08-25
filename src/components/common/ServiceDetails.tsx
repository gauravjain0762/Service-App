import React from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {getLocalizedText} from './commonFunction';
import {useAppSelector} from '@/Hooks/hooks';
import moment from 'moment';

type Props = {
  style?: ViewStyle;
  jobDetails?: any;
};

const ServiceDetails = ({style, jobDetails}: Props) => {
  const {language} = useAppSelector(state => state.auth);

  const ServiceDetail = [
    {'Payment Method': jobDetails?.pay_method},
    {
      'Service Type': getLocalizedText(
        jobDetails?.category_id?.title,
        jobDetails?.category_id?.title_ar,
        language,
      ),
    },
    {
      'Service Subcategory': getLocalizedText(
        jobDetails?.sub_category_id?.title,
        jobDetails?.sub_category_id?.title_ar,
        language,
      ),
    },
    {
      'Services Address': jobDetails?.address
        ? `${jobDetails?.address?.apt_villa_no} ${jobDetails?.address?.building_name} ${jobDetails?.address?.directions}`
        : '',
    },
    {
      'Service Date & Time': jobDetails?.date
        ? `${moment(jobDetails?.date)?.format('DD-MM-YYYY')} - ${
            jobDetails?.time
          }`
        : '',
    },
    {
      'Service Status': jobDetails?.status ?? '',
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
