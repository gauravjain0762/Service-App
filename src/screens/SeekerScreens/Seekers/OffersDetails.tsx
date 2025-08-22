import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import BackHeader from '@/components/common/BackHeader';
import RequestCard from '@/components/common/RequestCard';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import Divider from '@/components/common/Divider';
import {IMAGES} from '@/assets/images';
import ShadowCard from '@/components/common/ShadowCard';
import CustomButton from '@/components/common/CustomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PaymentMethodModal from '@/components/common/PaymentMethodModel';
import PaymentSuccessModal from '@/components/common/PaymentSuccessModel';
import {errorToast, getLocalizedText} from '@/components/common/commonFunction';
import {useAppSelector} from '@/Hooks/hooks';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useAcceptOfferMutation} from '@/api/Seeker/homeApi';

const images = [IMAGES.dummy2, IMAGES.dummy2, IMAGES.dummy2, IMAGES.dummy2];

const OffersDetails = () => {
  const {
    params: {requestDetails, offerDetail, offerIndex},
  } = useRoute<any>();
  const {language} = useAppSelector(state => state.auth);
  const [acceptOffer, {isLoading}] = useAcceptOfferMutation();
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] =
    useState(false);
  const [isPaymentSuccessModalVisible, setIsPaymentSuccessModalVisible] =
    useState(false);

  const openPaymentMethodModal = async () => {
    setIsPaymentMethodModalVisible(true);
  };
  const acceptOffers = async()=>{
    try {
      const data = {
        offer_id: offerDetail?._id,
        payment_method: 'Card',
        transaction_id: '',
      };

      const response = await acceptOffer(data).unwrap();
      if (response?.status) {
        setTimeout(() => {
          setIsPaymentSuccessModalVisible(true);
        }, 500);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.data?.message || error?.message || 'Something went wrong',
      );
    }
  }

  const closePaymentMethodModal = () => {
    setIsPaymentMethodModalVisible(false);
  };

  const handlePaymentSelect = () => {
    closePaymentMethodModal();
    acceptOffers()
  };

  const closePaymentSuccessModal = () => {
    setIsPaymentSuccessModalVisible(false);
  };

  const {bottom} = useSafeAreaInsets();
  const start = moment(
    `${moment(offerDetail?.date).format('YYYY-MM-DD')} ${offerDetail?.time}`,
    'YYYY-MM-DD hh:mm A',
  );
  const end = moment(start).add(Number(offerDetail?.estimated_time), 'hours');

  return (
    <SafeareaProvider style={[styles.safeArea, {paddingBottom: bottom}]}>
      <View style={styles.topContainer}>
        <BackHeader
          text={'Offers Detail'}
          rightIcon={
            <View style={styles.rightIcon}>
              <CommonText text={'Offer 1'} style={styles.offerLabel} />
            </View>
          }
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <RequestCard
          style={styles.requestCard}
          text1={getLocalizedText(
            requestDetails?.category_id?.title,
            requestDetails?.category_id?.title_ar,
            language,
          )}
          imageSource={requestDetails?.category_id?.image}
          titleStyle={styles.titleStyle}
          text2={getLocalizedText(
            requestDetails?.sub_category_id?.title,
            requestDetails?.sub_category_id?.title_ar,
            language,
          )}
          subtitleStyle={styles.subtitleStyle}
        />

        <Divider />

        <View style={styles.titleRow}>
          <CommonText
            text={offerDetail?.company_id?.category_id?.title}
            style={styles.titleText}
          />
          <View style={styles.ratingRow}>
            <Image source={IMAGES.star} />
            <CommonText text={'4.9'} style={styles.ratingText} />
          </View>
        </View>

        <View style={styles.referenceRow}>
          <CommonText text={'Reference Code: '} style={styles.refLabel} />
          <CommonText text={requestDetails?.job_code} style={styles.refValue} />
        </View>

        <View style={styles.featuresRow}>
          {offerDetail?.company_id?.sub_categories.map(
            (item: any, index: any) => (
              <View
                key={index}
                style={[
                  styles.featureBadge,
                  index !== 2 && styles.featureSpacing,
                ]}>
                <CommonText text={item?.title} style={styles.featureText} />
              </View>
            ),
          )}
        </View>

        <CommonText text={offerDetail?.notes} style={styles.description} />

        <Divider />

        <View style={styles.bookingContainer}>
          <View style={styles.bookingRow}>
            <CommonText text={'Booking Date'} style={styles.bookingLabel} />
            <CommonText
              text={`${start.format('ddd, DD MMM')}`}
              style={styles.bookingValue}
            />
          </View>
          <View style={styles.bookingRow}>
            <CommonText text={'Booking Time'} style={styles.bookingLabel} />
            <CommonText text={offerDetail?.time} style={styles.bookingValue} />
          </View>
        </View>

        <ShadowCard style={styles.shadowCard}>
          <CommonText text={'Watch My Work'} style={styles.watchTitle} />

          <View style={styles.imageRow}>
            <Image
              source={offerDetail?.media_files && offerDetail?.media_files[0]}
              style={styles.imageBox}
            />

            <View style={styles.secondImageWrapper}>
              <Image
                source={offerDetail?.media_files && offerDetail?.media_files[1]}
                style={[styles.imageBox, styles.blurredImage]}
                blurRadius={
                  offerDetail?.media_files &&
                  offerDetail?.media_files.length > 2
                    ? 5
                    : 0
                }
              />
              {offerDetail?.media_files &&
                offerDetail?.media_files.length > 2 && (
                  <View style={styles.overlay}>
                    <CommonText
                      text={`+${
                        offerDetail?.media_files &&
                        offerDetail?.media_files.length - 2
                      }`}
                      style={styles.overlayText}
                    />
                  </View>
                )}
            </View>
          </View>
        </ShadowCard>

        <View style={styles.bottomRow}>
          <PaymentMethodModal
            visible={isPaymentMethodModalVisible}
            onClose={closePaymentMethodModal}
            onPaymentSelect={handlePaymentSelect}
          />
          <PaymentSuccessModal
            onClose={closePaymentSuccessModal}
            visible={isPaymentSuccessModalVisible}
          />
          <CustomButton
            title={'Accept Offer'}
            btnStyle={styles.acceptBtn}
            textStyle={styles.acceptText}
            onPress={openPaymentMethodModal}
            disabled={isLoading}
            loading={isLoading}
          />
          <View style={styles.priceRow}>
            <Image source={IMAGES.currency} style={styles.currencyIcon} />
            <CommonText
              text={offerDetail?.offer_price}
              style={styles.priceText}
            />
          </View>
        </View>
      </ScrollView>
    </SafeareaProvider>
  );
};

export default OffersDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    paddingHorizontal: wp(24),
  },
  scrollContainer: {
    paddingBottom: '5%',
    paddingHorizontal: wp(24),
  },
  requestCard: {
    marginVertical: hp(27),
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleStyle: {
    ...commonFontStyle(600, 2.1, Colors.black),
  },
  subtitleStyle: {
    ...commonFontStyle(600, 1.9, Colors._898989),
  },
  rightIcon: {
    borderRadius: hp(50),
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    backgroundColor: Colors.black,
  },
  offerLabel: {
    ...commonFontStyle(600, 1.3, Colors.white),
  },
  titleRow: {
    gap: wp(40),
    marginTop: hp(35),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...commonFontStyle(500, 2.2, Colors.black),
  },
  ratingRow: {
    gap: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...commonFontStyle(500, 2, Colors.black),
  },
  referenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(11),
  },
  refLabel: {
    ...commonFontStyle(400, 1.9, Colors._868686),
  },
  refValue: {
    ...commonFontStyle(400, 1.9, Colors.black),
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(20),
  },
  featureBadge: {
    borderRadius: hp(50),
    paddingVertical: hp(10),
    paddingHorizontal: wp(18),
    backgroundColor: Colors._F5F5F5,
  },
  featureSpacing: {
    marginRight: wp(10),
  },
  featureText: {
    ...commonFontStyle(500, 1.3, Colors.black),
  },
  description: {
    marginVertical: hp(20),
    ...commonFontStyle(400, 1.6, Colors._676767),
  },
  bookingContainer: {
    marginVertical: hp(27),
    gap: hp(22),
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
  shadowCard: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: wp(17),
    paddingVertical: hp(20),
  },
  watchTitle: {
    paddingBottom: hp(17),
    ...commonFontStyle(600, 1.7, Colors._202020),
  },
  imageRow: {
    gap: wp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBox: {
    width: '48%',
    height: hp(150),
    borderRadius: hp(10),
  },
  bottomRow: {
    width: '100%',
    marginTop: hp(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acceptBtn: {
    height: hp(50),
    paddingHorizontal: wp(27),
    backgroundColor: Colors.seeker_primary,
    minWidth:'30%'
  },
  acceptText: {
    ...commonFontStyle(600, 1.7, Colors.white),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(7),
  },
  currencyIcon: {
    height: hp(30),
    width: wp(30),
  },
  priceText: {
    ...commonFontStyle(700, 3.7, Colors.black),
  },
  secondImageWrapper: {
    position: 'relative',
    width: '48%',
    height: hp(150),
  },
  blurredImage: {
    width: '100%',
    height: '100%',
    borderRadius: hp(10),
  },
  overlay: {
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    ...commonFontStyle(700, 2.5, Colors.white),
  },
});
