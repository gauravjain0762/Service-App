import React from 'react';
import {
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {getLocalizedText} from './commonFunction';
import {useAppSelector} from '@/Hooks/hooks';
import moment from 'moment';
import CustomButton from './CustomButton';
import {alignItemsRTL, rowReverseRTL, textRTL} from '@/utils/arabicStyles';

type Props = {
  style?: ViewStyle;
  jobDetails?: any;
  isProvider?: boolean;
};

const ServiceDetails = ({style, jobDetails, isProvider = false}: Props) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
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
      [jobDetails?.location === 'My Location'
        ? isProvider
          ? 'Customer Address'
          : 'My Address'
        : 'Service Provider Address']: jobDetails?.address
        ? `${jobDetails?.address?.apt_villa_no ?? ''} ${
            jobDetails?.address?.building_name ?? ''
          } ${jobDetails?.address?.directions ?? ''}`.trim()
        : 'Provider location',
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

  const OpenMapButton = () => {
    const latitude = jobDetails?.address?.lat ?? '23.4241';
    const longitude = jobDetails?.address?.lng ?? '53.8478';

    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}`,
    });

    Linking.openURL(url).catch(err =>
      console.error('Failed to open map:', err),
    );
  };

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
        renderItem={({item, index}) => {
          const label = Object.keys(item)[0];
          const value = Object.values(item)[0];

          const isAddressRow =
            label === 'My Address' ||
            label === 'Customer Address' ||
            label === 'Service Provider Address';

          return (
            <ShadowCard key={index} style={[styles.paymentCard, style]}>
              <View style={styles.paymentInfo}>
                <View
                  style={{
                    ...rowReverseRTL(language),
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <CommonText
                    text={Object.keys(item)}
                    style={styles.paymentLabel}
                  />
                  {isAddressRow && (
                    <TouchableOpacity
                      onPress={() => {
                        OpenMapButton();
                      }}
                      style={[
                        styles.changeBtn,
                        isProvider && {backgroundColor: Colors._EDFAFF},
                      ]}>
                      <CommonText
                        text={'Get Direction'}
                        style={[
                          styles.changeBtnText,
                          isProvider && {color: Colors.provider_primary},
                        ]}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <CommonText
                  text={Object.values(item)}
                  style={styles.paymentValue}
                />
              </View>
            </ShadowCard>
          );
        }}
      />
    </>
  );
};

export default ServiceDetails;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    paymentCard: {
      width: '95%',
      marginTop: hp(17),
      ...alignItemsRTL(_language),
      paddingHorizontal: wp(20),
    },
    paymentInfo: {
      gap: hp(13),
      width: '100%',
    },
    paymentLabel: {
      ...commonFontStyle(700, 2, Colors.black),
      ...textRTL(_language),
    },
    paymentValue: {
      ...commonFontStyle(400, 2.2, Colors._828282),
      ...textRTL(_language),
    },
    changeBtn: {
      flexShrink: 1,
      borderRadius: hp(50),
      paddingVertical: hp(6),
      paddingHorizontal: wp(12),
      backgroundColor: Colors._EBFCF4,
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
    },
    changeBtnText: {
      ...commonFontStyle(400, 1.2, Colors._039B55),
      ...textRTL(_language),
    },
  });
};
