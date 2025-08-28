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
  useGetPackagesQuery,
} from '@/api/Provider/homeApi';
import PaymentMethodModal from '@/components/common/PaymentMethodModel';
import PaymentSuccessModal from '@/components/common/PaymentSuccessModel';

const Subscription = () => {
  const {packages} = useAppSelector<any>(state => state.auth);
  const {isLoading} = useGetPackagesQuery({});
  const [buyPackage, {isLoading: isBuyLoading}] = useBuyPackageMutation();
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] =
    React.useState(false);
  const [isPaymentSuccessModalVisible, setIsPaymentSuccessModalVisible] =
    React.useState(false);
  const packageDetails = packages[0];

  const openPaymentMethodModal = async () => {
    setIsPaymentMethodModalVisible(true);
  };
  const closePaymentMethodModal = () => {
    setIsPaymentMethodModalVisible(false);
  };

  const handlePaymentSelect = () => {
    closePaymentMethodModal();
    acceptOffers();
  };

  const acceptOffers = async () => {
    try {
      const data = {
        package_id: packageDetails?._id,
      };

      const response = await buyPackage(data).unwrap();
      if (response?.status) {
        setIsPaymentSuccessModalVisible(true);
      } else {
        setIsPaymentSuccessModalVisible(true);
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
        text={'Subscription Plans'}
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

const styles = StyleSheet.create({
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
    flexDirection: 'row',
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
    flexDirection: 'row',
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
