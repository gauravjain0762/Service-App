import React from 'react';
import {Image, Linking, ScrollView, StyleSheet, View} from 'react-native';

import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import ShadowCard from '@/components/common/ShadowCard';
import Divider from '@/components/common/Divider';
import {IMAGES} from '@/assets/images';
import CommonText from '@/components/common/CommonText';
import CustomButton from '@/components/common/CustomButton';
import ServiceProvider from '@/components/common/ServiceProvider';
import ServiceDetails from '@/components/common/ServiceDetails';
import ServiceBillSummary from '@/components/common/ServiceBillSummary';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGetJobDetailsQuery} from '@/api/Seeker/homeApi';
import {getLocalizedText} from '@/components/common/commonFunction';
import {useAppSelector} from '@/Hooks/hooks';
import CustomImage from '@/components/common/CustomImage';
import moment from 'moment';
import JobDetailsSkeleton from '@/components/skeleton/JobDetailsSkeleton';
import {
  alignItemsLTR,
  alignItemsRTL,
  rowReverseRTL,
  textRTL,
} from '@/utils/arabicStyles';
import StepTracker from '@/components/common/StepTracker';

const JobDetails = () => {
  const {language} = useAppSelector(state => state.auth);
  const {params} = useRoute<any>();
  const job_id = params?.job_id;
  const navigation = useNavigation();
  const {bottom} = useSafeAreaInsets();
  const {
    data: jobData = {},
    isLoading: jobLoading,
    refetch: refetchJobList,
  } = useGetJobDetailsQuery<any>(
    {
      job_id: job_id,
    },
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const jobDetails = jobData?.data?.job;

  return (
    <SafeareaProvider style={[styles.safeArea]}>
      <BackHeader
        text={'Job Detail'}
        style={{
          paddingHorizontal: wp(24),
        }}
      />

      {jobLoading ? (
        <JobDetailsSkeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: wp(24)}}>
            <ShadowCard style={styles.jobCard}>
              <View style={styles.rowWithGap}>
                <CustomImage
                  uri={jobDetails?.category_id?.image}
                  resizeMode="stretch"
                  imageStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                  containerStyle={{
                    width: wp(72),
                    height: hp(72),
                    borderRadius: hp(12),
                    backgroundColor: Colors.white,
                    overflow: 'hidden',
                  }}
                />
                <View style={styles.jobInfoContainer}>
                  <CommonText
                    text={getLocalizedText(
                      jobDetails?.category_id?.title,
                      jobDetails?.category_id?.title_ar,
                      language,
                    )}
                    style={styles.jobTitle}
                  />
                  <CommonText
                    text={getLocalizedText(
                      jobDetails?.sub_category_id?.title,
                      jobDetails?.sub_category_id?.title_ar,
                      language,
                    )}
                    style={styles.jobSubTitle}
                  />
                  <CommonText
                    numberOfLines={2}
                    text={`${jobDetails?.address?.apt_villa_no} ${jobDetails?.address?.building_name} ${jobDetails?.address?.directions}`}
                    style={styles.jobLocation}
                  />
                </View>
              </View>

              <View style={styles.bookingContainer}>
                <View style={styles.bookingRow}>
                  <CommonText
                    text={'Booking Date'}
                    style={styles.bookingLabel}
                  />
                  <CommonText
                    text={moment(jobDetails?.date).format('ddd, DD MMM')}
                    style={styles.bookingValue}
                  />
                </View>
                <View style={styles.bookingRow}>
                  <CommonText
                    text={'Booking Time'}
                    style={styles.bookingLabel}
                  />
                  <CommonText
                    text={jobDetails?.time}
                    style={styles.bookingValue}
                  />
                </View>
              </View>
            </ShadowCard>
          </View>

          <Divider />
          <View style={{paddingHorizontal: wp(24)}}>
            {jobDetails?.statuses?.length > 0 && (
              <StepTracker trackingData={jobDetails?.statuses} />
            )}
          </View>
          <View style={{paddingHorizontal: wp(24)}}>
            <CommonText text={'Service Provider'} style={styles.sectionTitle} />
            <ServiceProvider
              isViewProfile={false}
              color={Colors.seeker_primary}
              source={jobDetails?.company_id?.logo}
              providerName={jobDetails?.company_id?.name}
              onCallPress={() => {
                const url = `tel:${jobDetails?.company_id?.phone_code}${jobDetails?.company_id?.phone}`;
                Linking.openURL(url);
              }}
              rating={jobDetails?.company_id?.avg_rating?.toString()}
            />
          </View>
          <ServiceDetails style={{width: '100%'}} jobDetails={jobDetails} />

          <View style={{paddingHorizontal: wp(24)}}>
            <ServiceBillSummary
              style={{width: '100%'}}
              jobDetails={jobDetails}
            />
          </View>

          <CustomButton
            title={'Back To Home'}
            btnStyle={styles.backToHomeBtn}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'SeekerTabNavigation' as never,
                    state: {
                      index: 0,
                      routes: [
                        {
                          name: 'Home',
                          params: {openReviewModal: true},
                        },
                      ],
                    },
                  },
                ],
              })
            }
          />
        </ScrollView>
      )}
    </SafeareaProvider>
  );
};

export default JobDetails;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    jobCard: {
      width: '100%',
      padding: wp(16),
      marginTop: hp(27),
      ...alignItemsRTL(_language),
    },
    rowWithGap: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: wp(20),
    },
    jobInfoContainer: {
      gap: hp(11),
      flexShrink: 1,
    },
    jobTitle: {
      ...commonFontStyle(600, 1.9, Colors.black),
      ...textRTL(_language),
    },
    jobSubTitle: {
      ...commonFontStyle(400, 1.7, Colors._898989),
      ...textRTL(_language),
    },
    jobLocation: {
      flexShrink: 1,
      ...commonFontStyle(400, 1.6, Colors._7D7D7D),
      ...textRTL(_language),
    },
    bookingContainer: {
      gap: hp(22),
      width: '100%',
      marginVertical: hp(27),
    },
    bookingRow: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bookingLabel: {
      ...commonFontStyle(400, 1.9, Colors._5E5E5E),
    },
    bookingValue: {
      ...commonFontStyle(700, 1.9, Colors._2C2C2C),
    },
    sectionTitle: {
      marginTop: hp(30),
      ...commonFontStyle(600, 2.2, Colors.black),
      ...textRTL(_language),
    },

    backToHomeBtn: {
      marginTop: hp(40),
      marginHorizontal: wp(24),
      backgroundColor: Colors.seeker_primary,
    },
  });
};
