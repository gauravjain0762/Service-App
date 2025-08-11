import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

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
import {resetNavigation} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import UpdateWorkStatusModal from '@/components/modals/UpdateWorkStatusModal';

const ProOfferDetails = () => {
  const {bottom} = useSafeAreaInsets();
  const [selectedOption, setSelectedOption] = useState('Complete Job');
  const [isChooseOptionsModal, setIsChooseOptionsModal] =
    useState<boolean>(false);
  const [isCompleteBookingModal, setIsCompleteBookingModal] =
    useState<boolean>(false);
  const [isUpdateWorkStatusModal, setIsUpdateWorkStatusModal] =
    useState<boolean>(false);

  return (
    <SafeareaProvider style={[styles.safeArea, {paddingBottom: bottom}]}>
      <BackHeader
        text={'Job Detail'}
        onPressBack={() =>
          resetNavigation(PROVIDER_SCREENS.ProviderTabNavigation)
        }
        style={{
          paddingHorizontal: wp(24),
        }}
      />

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
                  text={'Repair & Maintenance'}
                  style={styles.jobTitle}
                />
                <CommonText
                  text={'AC Regular Services'}
                  style={styles.jobSubTitle}
                />
                <CommonText
                  text={'Dubai Internet City UAE'}
                  style={styles.jobLocation}
                />
              </View>
            </View>

            <View style={styles.bookingContainer}>
              <View style={styles.bookingRow}>
                <CommonText text={'Booking Date'} style={styles.bookingLabel} />
                <CommonText text={'Web, 18 Apr'} style={styles.bookingValue} />
              </View>
              <View style={styles.bookingRow}>
                <CommonText text={'Booking Time'} style={styles.bookingLabel} />
                <CommonText
                  text={'09:00 - 12:00'}
                  style={styles.bookingValue}
                />
              </View>
            </View>
          </ShadowCard>
        </View>

        <Divider />

        <CommonText text={'Service Provider'} style={styles.sectionTitle} />

        <View
          style={{
            paddingHorizontal: wp(24),
          }}>
          <ServiceProvider
            color={Colors.provider_primary}
            isViewProfile={false}
          />
        </View>
        <ServiceDetails style={{width: '100%'}} />
        <View style={{paddingHorizontal: wp(24)}}>
          <ServiceBillSummary style={{width: '100%'}} />
        </View>

        <CustomButton
          title={'Update Work Status'}
          btnStyle={styles.backToHomeBtn}
          onPress={() => setIsChooseOptionsModal(true)}
        />
      </ScrollView>

      <ChooseOptions
        allOptions={[
          'Complete Job',
          'Job delay by customer reason',
          'Job Cancel wrong Address',
          'Any issue with user ',
        ]}
        close={false}
        textStyle={{...commonFontStyle(400, 2.2, Colors._686868)}}
        buttonTitle={'Mark as Start'}
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
        onPressCompleted={() => {
          setIsCompleteBookingModal(false);
          setTimeout(() => {
            setIsUpdateWorkStatusModal(true);
          }, 500);
        }}
        isCompleteBookingModal={isCompleteBookingModal}
        setIsCompleteBookingModal={setIsCompleteBookingModal}
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
    gap: hp(11),
  },
  jobTitle: {
    ...commonFontStyle(600, 1.9, Colors.black),
  },
  jobSubTitle: {
    ...commonFontStyle(400, 1.7, Colors._898989),
  },
  jobLocation: {
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
