import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import BackHeader from '@/components/common/BackHeader';
import CustomImage from '@/components/common/CustomImage';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';
import CustomButton from '@/components/common/CustomButton';
import {
  errorToast,
  navigateTo,
  resetNavigation,
} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS, SCREENS} from '@/navigation/screenNames';
import {useAppSelector} from '@/Hooks/hooks';
import {
  useBuyPackageMutation,
  useGetDashboardQuery,
  useGetPackagesQuery,
  useStripePaymentMutation,
  useStripePaymentOffSessionMutation,
} from '@/api/Provider/homeApi';
import PaymentMethodModal from '@/components/common/PaymentMethodModel';
import PaymentSuccessModal from '@/components/common/PaymentSuccessModel';
import {
  confirmPlatformPayPayment,
  initPaymentSheet,
  isPlatformPaySupported,
  PlatformPay,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import {rowReverseRTL} from '@/utils/arabicStyles';

const Subscription = () => {
  const {packages, language} = useAppSelector<any>(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const {isLoading} = useGetPackagesQuery({});
  const [buyPackage, {isLoading: isBuyLoading}] = useBuyPackageMutation();
  const [stripePayment, {isLoading: stripeLoading}] =
    useStripePaymentMutation();
  const [stripePaymentOffSession, {isLoading: stripePaymentOffSessionLoading}] =
    useStripePaymentOffSessionMutation();
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] =
    React.useState(false);
  const [isPaymentSuccessModalVisible, setIsPaymentSuccessModalVisible] =
    React.useState(false);
  const {
    data: data,
    isLoading: loading,
    isFetching,
    refetch,
  } = useGetDashboardQuery(
    {},
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );
  const packageDetails = packages[0];

  const openPaymentMethodModal = async () => {
    setIsPaymentMethodModalVisible(true);
  };
  const closePaymentMethodModal = () => {
    setIsPaymentMethodModalVisible(false);
  };

  const handlePaymentSelect = (method: any) => {
    closePaymentMethodModal();
    initializePaymentSheet(method);
  };
  const fetchPaymentSheetParams = async () => {
    let data = {
      amount: packageDetails?.price.toString(),
    };
    const paymentResponse = await (packageDetails?.is_free_trial
      ? stripePaymentOffSession(data) // Provider API
      : stripePayment(data)
    ).unwrap();
    console.log('paymentResponse-->', paymentResponse);
    return paymentResponse;
  };
  const startApplePayFlow = async () => {
    try {
      if (!(await isPlatformPaySupported())) {
        errorToast('Apple Pay is not supported.');
        return;
      }
      const {paymentIntent} = await fetchPaymentSheetParams();
      const transactionId = paymentIntent?.split('_secret')[0];
      const {error} = await confirmPlatformPayPayment(paymentIntent, {
        applePay: {
          cartItems: [
            {
              label: 'Helpio',
              amount: packageDetails?.price.toString(),
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
        acceptOffers(transactionId);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const initializePaymentSheet = async (isPaymentMethod = 'card') => {
    if (isPaymentMethod === 'applePay') {
      await startApplePayFlow();
      return;
    }
    try {
      const {paymentIntent, ephemeralKey, customer, publishableKey} =
        await fetchPaymentSheetParams();
      const transactionId = paymentIntent?.split('_secret')[0];
      const {error, paymentOption} = await initPaymentSheet({
        merchantDisplayName: 'Helpio',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        primaryButtonLabel: `Pay AED ${packageDetails?.price.toString()}`,
        defaultBillingDetails: {
          name: 'Test',
        },
      });
      if (!error) {
        presentSheet(transactionId);
      } else {
        errorToast(error.message);
        console.log(error, 'errorerrorerrorerrorerror');
      }
    } catch (error: any) {
      errorToast(error.message);
      console.log(error, 'errorerrorerrorerrorerror');
    }
  };
  const presentSheet = async (package_payment_id: any) => {
    const {error, paymentOption} = await presentPaymentSheet();
    if (error) {
      console.log(error, 'errorerror');
      if (error.code !== 'Canceled') {
        errorToast(error.message);
      }
    } else {
      acceptOffers(package_payment_id);
    }
  };

  const acceptOffers = async (package_payment_id: any) => {
    try {
      const data = {
        package_id: packageDetails?._id,
        payment_intent_id: package_payment_id,
      };
      const response = await buyPackage(data).unwrap();
      if (response?.status) {
        setIsPaymentSuccessModalVisible(true);
        refetch();
      } else {
        setIsPaymentSuccessModalVisible(true);
        refetch();
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.data?.message || error?.message || 'Something went wrong',
      );
    }
  };
  const closePaymentSuccessModal = () => {
    setIsPaymentSuccessModalVisible(false);
    navigateTo(PROVIDER_SCREENS.ProviderTabNavigation);
  };

  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader
        text={'Subscription Plan'}
        onPressBack={() => resetNavigation(SCREENS.ProviderTabNavigation)}
      />

      <View style={styles.container}>
        <ImageBackground
          source={IMAGES.subs_bg2}
          style={styles.bgImage}
          resizeMode="cover"
          imageStyle={styles.backgroundImageStyle}>
          <View style={styles.content}>
            <View style={styles.priceRow}>
              <CustomImage
                size={hp(40)}
                source={IMAGES.currency}
                tintColor={Colors.white}
              />
              <CommonText
                text={`${packageDetails?.price}/${packageDetails?.expiry_type}`}
                style={styles.priceText}
              />
            </View>

            <CommonText
              text={packageDetails?.short_desc}
              style={styles.description}
            />

            <View style={styles.benefitsWrapper}>
              <CommonText text={'Benefits'} style={styles.benefitsTitle} />

              {packageDetails?.features?.map(val => (
                <View key={val} style={styles.benefitItem}>
                  <CustomImage source={IMAGES.true_mark} size={hp(24)} />
                  <CommonText text={val} style={styles.benefitText} />
                </View>
              ))}

              {packageDetails?.is_free_trial && (
                <CustomButton
                  btnStyle={styles.btnStyle}
                  title={`Get ${packageDetails?.free_trial_days} Days Free Trail`}
                />
              )}
            </View>
          </View>
        </ImageBackground>

        <CustomButton
          title={'Confirm & Pay'}
          btnStyle={{marginTop: hp(40)}}
          onPress={() => openPaymentMethodModal()}
        />
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
            amount={packageDetails?.price}
            isProvide={true}
          />
        )}
      </View>
    </SafeareaProvider>
  );
};

export default Subscription;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingHorizontal: wp(24),
      backgroundColor: Colors.white,
    },
    container: {
      flex: 1,
      marginTop: hp(30),
    },
    bgImage: {
      width: '100%',
      height: hp(520),
      aspectRatio: 0.8,
      overflow: 'hidden',
      alignSelf: 'center',
      borderRadius: hp(20),
    },
    backgroundImageStyle: {
      borderRadius: hp(20),
    },
    content: {
      padding: hp(35),
    },
    priceRow: {
      gap: wp(5),
      ...rowReverseRTL(_language),
      alignItems: 'center',
    },
    priceText: {
      ...commonFontStyle(500, 3.7, Colors._F6F6F6),
    },
    description: {
      marginTop: hp(12),
      ...commonFontStyle(500, 2, Colors.white),
    },
    benefitsWrapper: {
      gap: hp(22),
    },
    benefitsTitle: {
      marginVertical: hp(26),
      ...commonFontStyle(500, 2.2, Colors.white),
    },
    benefitItem: {
      gap: wp(10),
      ...rowReverseRTL(_language),
      alignItems: 'center',
    },
    benefitText: {
      ...commonFontStyle(400, 1.9, Colors.white),
    },
    btnStyle: {
      marginTop: hp(30),
      borderWidth: hp(1.2),
      borderColor: Colors.white,
    },
  });
};
