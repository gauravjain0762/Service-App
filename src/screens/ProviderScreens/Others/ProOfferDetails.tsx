import React, {useState} from 'react';
import {Image, Linking, ScrollView, StyleSheet, View} from 'react-native';

import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import ShadowCard from '@/components/common/ShadowCard';
import Divider from '@/components/common/Divider';
import {IMAGES} from '@/assets/images';
import CommonText from '@/components/common/CommonText';
import CustomButton from '@/components/common/CustomButton';
import ServiceProvider from '@/components/common/ServiceProvider';
import ServiceDetails from '@/components/common/ServiceDetails';
import ServiceBillSummary from '@/components/common/ServiceBillSummary';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomImage from '@/components/common/CustomImage';
import ChooseOptions from '@/components/common/ChooseOptions';
import CompleteBookingModal from '@/components/modals/CompleteBookingModal';
import {
  getLocalizedText,
  resetNavigation,
} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import UpdateWorkStatusModal from '@/components/modals/UpdateWorkStatusModal';
import {useRoute} from '@react-navigation/native';
import {
  useGetJobDetailsQuery,
  useUpdateJobStatusMutation,
} from '@/api/Provider/homeApi';
import JobDetailsSkeleton from '@/components/skeleton/JobDetailsSkeleton';
import {useAppSelector} from '@/Hooks/hooks';
import moment from 'moment';

const ProOfferDetails = () => {
  const {language} = useAppSelector(state => state.auth);
  const {params} = useRoute<any>();
  const job_id = params?.job_id;
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
  const jobDetails = jobData?.data?.job;

  const [updateJobStatus, {isLoading}] = useUpdateJobStatusMutation();

  const {bottom} = useSafeAreaInsets();
  const [selectedOption, setSelectedOption] = useState('Complete Job');
  const [isChooseOptionsModal, setIsChooseOptionsModal] =
    useState<boolean>(false);
  const [isCompleteBookingModal, setIsCompleteBookingModal] =
    useState<boolean>(false);
  const [isUpdateWorkStatusModal, setIsUpdateWorkStatusModal] =
    useState<boolean>(false);

  const onPressCompleted = async () => {
    let obj = {
      job_id: jobDetails?._id,
      status: 'Completed',
    };
    const response = await updateJobStatus(obj).unwrap();
    console.log('response', response);
    if (response?.status) {
      setIsCompleteBookingModal(false);
      resetNavigation(PROVIDER_SCREENS.ProviderTabNavigation);
    }
  };
  return (
    <SafeareaProvider edges={['top', 'bottom']} style={[styles.safeArea, {}]}>
      <BackHeader
        text={'Job Detail'}
        onPressBack={() =>
          resetNavigation(PROVIDER_SCREENS.ProviderTabNavigation)
        }
        style={{
          paddingHorizontal: wp(24),
        }}
      />

      {jobLoading ? (
        <JobDetailsSkeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: wp(24),
            }}>
            <ShadowCard style={styles.jobCard}>
              <View style={styles.rowWithGap}>
                <CustomImage source={IMAGES.dummy} size={hp(70)} />
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

          <CommonText text={'Customer Detail'} style={styles.sectionTitle} />

          <View
            style={{
              paddingHorizontal: wp(24),
            }}>
            <ServiceProvider
              color={Colors.provider_primary}
              isViewProfile={false}
              providerName={jobDetails?.user_id?.name}
              source={jobDetails?.user_id?.picture}
              onCallPress={() => {
                const url = `tel:${jobDetails?.user_id?.phone_code}${jobDetails?.user_id?.phone}`;
                Linking.openURL(url);
              }}
            />
          </View>
          <ServiceDetails style={{width: '100%'}} jobDetails={jobDetails} isProvider/>
          <View style={{paddingHorizontal: wp(24)}}>
            <ServiceBillSummary
              style={{width: '100%'}}
              jobDetails={jobDetails}
            />
          </View>

          <CustomButton
            title={'Mark as Completed'}
            btnStyle={styles.backToHomeBtn}
            onPress={() => setIsCompleteBookingModal(true)}
          />
        </ScrollView>
      )}
      <ChooseOptions
        allOptions={[
          'Complete Job',
          'Job delay by customer reason',
          'Job Cancel wrong Address',
          'Any issue with user ',
        ]}
        close={false}
        textStyle={{...commonFontStyle(400, 2.2, Colors._686868)}}
        buttonTitle={'Submit'}
        selectedOption={selectedOption}
        headerTitle={'Update Work Status'}
        isChooseOptionsModal={isChooseOptionsModal}
        setIsChooseOptionsModal={setIsChooseOptionsModal}
        handleOptionSelect={option => {
          setSelectedOption(option);
        }}
        onPress={() => {
          setIsChooseOptionsModal(false);
          setTimeout(() => {
            setIsCompleteBookingModal(true);
          }, 400);
          //   navigation.reset({
          //     index: 0,
          //     routes: [
          //       {
          //         name: 'ProviderTabNavigation' as never,
          //         state: {
          //           index: 0,
          //           routes: [
          //             {
          //               name: 'Dashboard',
          //               params: {openReviewModal: true},
          //             },
          //           ],
          //         },
          //       },
          //     ],
          //   })
        }}
      />

      <CompleteBookingModal
        onPressGoBack={() => {
          resetNavigation(PROVIDER_SCREENS.ProviderTabNavigation);
        }}
        // onPressCompleted={() => {
        //   setIsCompleteBookingModal(false);
        //   setTimeout(() => {
        //     setIsUpdateWorkStatusModal(true);
        //   }, 500);
        // }}
        serviceName={getLocalizedText(
          jobDetails?.sub_category_id?.title,
          jobDetails?.sub_category_id?.title_ar,
          language,
        )}
        isCompleteBookingModal={isCompleteBookingModal}
        setIsCompleteBookingModal={setIsCompleteBookingModal}
        onPressCompleted={onPressCompleted}
      />

      <UpdateWorkStatusModal
        close={false}
        onPressGoBack={() => {}}
        onPressCompleted={() => {
          setIsUpdateWorkStatusModal(false);
        }}
        isUpdateWorkStatusModal={isUpdateWorkStatusModal}
        setIsUpdateWorkStatusModal={setIsUpdateWorkStatusModal}
      />
    </SafeareaProvider>
  );
};

export default ProOfferDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  jobCard: {
    width: '100%',
    padding: wp(16),
    marginVertical: hp(27),
    alignItems: 'flex-start',
  },
  rowWithGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(20),
  },
  jobInfoContainer: {
    flexShrink: 1,
    gap: hp(11),
  },
  jobTitle: {
    ...commonFontStyle(600, 1.9, Colors.black),
  },
  jobSubTitle: {
    ...commonFontStyle(400, 1.7, Colors._898989),
  },
  jobLocation: {
    flexShrink: 1,
    ...commonFontStyle(400, 1.6, Colors._7D7D7D),
  },
  bookingContainer: {
    gap: hp(22),
    width: '100%',
    marginTop: hp(27),
  },
  bookingRow: {
    flexDirection: 'row',
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
    paddingHorizontal: wp(24),
    ...commonFontStyle(600, 2.2, Colors.black),
  },

  backToHomeBtn: {
    marginTop: hp(40),
    marginHorizontal: wp(24),
    backgroundColor: Colors.provider_primary,
  },
});
