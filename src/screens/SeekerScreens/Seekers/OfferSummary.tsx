import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import RequestCard from '@/components/common/RequestCard';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import Divider from '@/components/common/Divider';
import {IMAGES} from '@/assets/images';
import CustomButton from '@/components/common/CustomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PaymentMethodModal from '@/components/common/PaymentMethodModel';
import PaymentSuccessModal from '@/components/common/PaymentSuccessModel';
import {
  errorToast,
  formatePrice,
  getLocalizedText,
  navigateTo,
  resetNavigation,
} from '@/components/common/commonFunction';
import {useAppSelector} from '@/Hooks/hooks';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {
  useAcceptOfferMutation,
  useGetOffersDetailsQuery,
  useStripePaymentMutation,
} from '@/api/Seeker/homeApi';
import AttachmentCard from '@/components/common/AttachmentCard';
import RequestEditServiceModal from '@/components/modals/RequestEditServiceModal';
import {
  initPaymentSheet,
  presentPaymentSheet,
  confirmPlatformPayPayment,
  PlatformPay,
  isPlatformPaySupported,
} from '@stripe/stripe-react-native';
import TermsCheckBox from '@/components/common/TermsCheckBox';
import ServiceBillSummary from '@/components/common/ServiceBillSummary';
import JobDetailsSkeleton from '@/components/skeleton/JobDetailsSkeleton';
import {rowReverseRTL, textRTL} from '@/utils/arabicStyles';
import CustomImage from '@/components/common/CustomImage';
import {payment_method} from '@/utils/CommonArray';
import { SCREENS, SEEKER_SCREENS } from '@/navigation/screenNames';

const OfferSummary = () => {
  const {
    params: {offer_id, requestDetails},
  } = useRoute<any>();
  const {language} = useAppSelector(state => state.auth);
  const [acceptOffer, {isLoading}] = useAcceptOfferMutation();
  const [stripePayment, {isLoading: stripeLoading}] =
    useStripePaymentMutation();
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] =
    useState(false);
  const [isPaymentSuccessModalVisible, setIsPaymentSuccessModalVisible] =
    useState(false);
  const [isEditRequest, setIsEditRequest] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isPaymentMethod, setIsPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState<any>(payment_method);

  const {
    data: offerData,
    isLoading: requestLoading,
    refetch: refetchRequestList,
  } = useGetOffersDetailsQuery<any>(
    {
      offer_id: offer_id,
      ...(isPaymentMethod === 'loyalty' && {apply_loyalty: true}),
    },
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  const offerDetails = offerData?.data;
  const offerDetail = offerData?.data?.offer;

  React.useEffect(() => {
    if (offerDetails?.can_apply_loyalty) {
      setPaymentData([
        {
          id: 1,
          title: 'Loyalty Credit',
          img: IMAGES.loyalty_card,
          isWallet: true,
          value: 'loyalty',
        },
        ...paymentData,
      ]);
    }
  }, [offerDetails?.can_apply_loyalty]);

  const acceptOffers = async () => {
    try {
      const data = {
        offer_id: offerDetail?._id,
        payment_method: isPaymentMethod,
        transaction_id: '',
      };

      const response = await acceptOffer(data).unwrap();
      console.log(response, 'response');

      if (response?.status) {
        setIsPaymentSuccessModalVisible(true);
      } else {
        errorToast(response?.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.data?.message || error?.message || 'Something went wrong',
      );
    }
  };

  const closePaymentMethodModal = () => {
    setIsPaymentMethodModalVisible(false);
  };

  const handlePaymentSelect = () => {
    closePaymentMethodModal();
    acceptOffers();
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

  const fetchPaymentSheetParams = async () => {
    let data = {
      amount: offerDetails?.total_amount.toString(),
    };

    const paymentResponse = await stripePayment(data).unwrap();
    console.log('paymentResponse-->', paymentResponse);
    return paymentResponse;
  };

  const presentSheet = async () => {
    const {error, paymentOption} = await presentPaymentSheet();
    if (error) {
      console.log(error, 'errorerror');
      if (error.code !== 'Canceled') {
        errorToast(error.message);
      }
    } else {
      acceptOffers();
    }
  };
  const startApplePayFlow = async () => {
    try {
      if (!(await isPlatformPaySupported())) {
        errorToast('Apple Pay is not supported.');
        return;
      }
      const {paymentIntent} = await fetchPaymentSheetParams();

      const {error} = await confirmPlatformPayPayment(paymentIntent, {
        applePay: {
          cartItems: [
            {
              label: 'Helpio',
              amount: offerDetails?.total_amount.toString(),
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: 'AE',
          currencyCode: 'AED',
        },
      });
      if (error) {
        console.log(error, 'error');
        errorToast(error.message);
        return;
      } else {
        console.log('sucesss------');
        // presentSheet();
        acceptOffers();
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const initializePaymentSheet = async () => {
    if (isPaymentMethod == '') {
      errorToast('Please select payment methods');
      return;
    }
    if (!toggleCheckBox) {
      errorToast('Please check the Terms Of Use');
      return;
    }
    if (isPaymentMethod === 'COD') {
      acceptOffers();
      return;
    }
    if (isPaymentMethod === 'applePay') {
      await startApplePayFlow();
      return;
    }
    try {
      const {paymentIntent, ephemeralKey, customer, publishableKey} =
        await fetchPaymentSheetParams();

      const {error, paymentOption} = await initPaymentSheet({
        merchantDisplayName: 'Helpio',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        primaryButtonLabel: `Pay AED ${offerDetails?.total_amount.toString()}`,
        defaultBillingDetails: {
          name: 'Test',
        },
      });
      if (!error) {
        presentSheet();
      } else {
        errorToast(error.message);
        console.log(error, 'errorerrorerrorerrorerror');
      }
    } catch (error: any) {
      errorToast(error.message);
      console.log(error, 'errorerrorerrorerrorerror');
    }
  };

  const onPressPayment = (item: any) => {
    const updatedData = paymentData?.map((i: any) => ({
      ...i,
      isSelected: i?.id === item?.id,
    }));
    setPaymentData(updatedData);
    setIsPaymentMethod(item?.value);
  };
  const renderpaymentItem = ({item}: any) => {
    return (
      <TouchableOpacity
        // disabled={item?.id !== 2}
        onPress={() => onPressPayment(item)}
        style={styles.paymentItemContainer}>
        <View style={[styles.cardContainer, styles.paymentCard]}>
          <CustomImage
            source={item?.img}
            resizeMode="contain"
            imageStyle={{width: '100%', height: '100%'}}
            containerStyle={styles.paymentIconStyle}
          />
          <CommonText text={item?.title} style={styles.paymentTitle} />
        </View>
        <View style={styles.radioButtonView}>
          {item?.isWallet && (
            <CommonText
              text={`AED ${formatePrice(offerDetails?.loyalty_points)}`}
              style={styles.walletMoneyText}
            />
          )}
          <View
            style={[
              styles.radioButton,
              {
                borderColor: Colors.seeker_primary,
              },
            ]}>
            {item?.isSelected && (
              <View
                style={[
                  styles.radioButtonInner,
                  {
                    backgroundColor: Colors.seeker_primary,
                  },
                ]}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const itemSeparatorPaymentComponent = () => <View style={{height: hp(8)}} />;
  return (
    <SafeareaProvider style={[styles.safeArea]}>
      <View style={styles.topContainer}>
        <BackHeader text={'Offer Summary'} />
      </View>

      {requestLoading ? (
        <JobDetailsSkeleton />
      ) : (
        <>
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
                <CommonText
                  text={offerDetail?.company_id?.avg_rating?.toString()}
                  style={styles.ratingText}
                />
              </View>
            </View>

            <View style={styles.referenceRow}>
              <CommonText text={'Reference Id: '} style={styles.refLabel} />
              <CommonText
                text={requestDetails?.job_code}
                style={styles.refValue}
              />
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
                <CommonText
                  text={offerDetail?.time}
                  style={styles.bookingValue}
                />
              </View>
            </View>

            {offerDetail?.media_files?.length > 0 && (
              <AttachmentCard
                requestImages={offerDetail?.media_files}
                title="Attachments"
              />
            )}

            <View style={styles.paymentMethodView}>
              <CommonText text={'Payment method'} style={styles.sectionTitle} />
              <View style={styles.saperatLine1} />

              <FlatList
                showsVerticalScrollIndicator={false}
                data={paymentData}
                renderItem={renderpaymentItem}
                ItemSeparatorComponent={itemSeparatorPaymentComponent}
              />
            </View>

            <View style={{paddingHorizontal: wp(0)}}>
              <ServiceBillSummary
                style={{width: '100%'}}
                data={[
                  {
                    label: 'Service Fee',
                    amount: offerDetails?.service_charges ?? '',
                  },
                  {
                    label: 'Platform Fee',
                    amount: offerDetails?.sub_total ?? '',
                  },
                  ...(offerDetails?.loyalty_discount > 0
                    ? [
                        {
                          label: 'Loyalty Points Redeem',
                          amount: offerDetails?.loyalty_discount ?? '',
                          isGreen: true,
                        },
                      ]
                    : []),
                ]}
                totalAmount={offerDetails?.total_amount}
              />
            </View>
            {isPaymentMethodModalVisible && (
              <PaymentMethodModal
                visible={isPaymentMethodModalVisible}
                onClose={closePaymentMethodModal}
                onPaymentSelect={handlePaymentSelect}
              />
            )}
            {isPaymentSuccessModalVisible && (
              <PaymentSuccessModal
                onClose={closePaymentSuccessModal}
                visible={isPaymentSuccessModalVisible}
                amount={offerDetails?.total_amount}
              />
            )}
            {isEditRequest && (
              <RequestEditServiceModal
                onClose={() => {
                  setIsEditRequest(false);
                }}
                visible={isEditRequest}
                offer_id={offerDetail?._id}
              />
            )}
          </ScrollView>
          <View style={styles.bottomRow}>
            <TermsCheckBox
              toggleCheckBox={toggleCheckBox}
              setToggleCheckBox={setToggleCheckBox}
              checkedCheckBoxColor={Colors.seeker_primary}
              isChecked={toggleCheckBox}
              isSeeker
              onClick={() => setToggleCheckBox(!toggleCheckBox)}
            />
            <CustomButton
              title={'Confirm & Pay'}
              btnStyle={styles.acceptBtn}
              textStyle={styles.acceptText}
              onPress={initializePaymentSheet}
              disabled={isLoading}
              loading={isLoading}
            />
          </View>
        </>
      )}
    </SafeareaProvider>
  );
};

export default OfferSummary;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    paddingHorizontal: wp(24),
  },
  scrollContainer: {
    paddingBottom: hp(100),
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
    flexWrap: 'wrap',
    gap: wp(10),
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
    height: hp(100),
    borderRadius: hp(10),
  },
  bottomRow: {
    width: '100%',
    position: 'absolute',
    backgroundColor: Colors.white,
    bottom: 0,
    alignSelf: 'center',
    paddingHorizontal: wp(24),
    gap: hp(10),
  },
  acceptBtn: {
    height: hp(50),
    paddingHorizontal: wp(27),
    backgroundColor: Colors.seeker_primary,
    width: '100%',
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
    height: hp(100),
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
  sectionTitle: {
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  paymentMethodView: {
    marginVertical: hp(18),
    padding: hp(10),
  },
  saperatLine1: {
    width: '100%',
    height: hp(2),
    opacity: 0.7,
    marginTop: hp(11),
    marginBottom: hp(16),
    backgroundColor: Colors._EEEEEE,
  },
  radioButton: {
    width: wp(25),
    height: hp(25),
    borderRadius: wp(100),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: wp(10),
    height: hp(10),
    borderRadius: wp(5),
  },
  paymentItemContainer: {
    ...rowReverseRTL(),
    alignItems: 'center',
    paddingVertical: hp(7),
  },
  cardContainer: {
    ...rowReverseRTL(),
    alignItems: 'flex-start',
  },
  paymentCard: {
    gap: wp(18),
    flex: 1,
  },
  paymentIconStyle: {
    width: wp(24),
    height: wp(24),
  },
  paymentTitle: {
    ...commonFontStyle(400, 2, Colors.black),
    ...textRTL(),
  },
  radioButtonView: {
    ...rowReverseRTL(),
    alignItems: 'center',
    gap: wp(10),
  },
  walletMoneyText: {
    ...commonFontStyle(700, 2, Colors.seeker_primary),
    ...textRTL(),
  },
});
