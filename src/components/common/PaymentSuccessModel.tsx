import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import {IMAGES} from '@/assets/images';
import BottomModal from '@/components/common/BottomModal';
import CustomImage from './CustomImage';
import {navigateTo, resetNavigation} from './commonFunction';
import {PROVIDER_SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';

Dimensions.get('window');

type PaymentSuccessModalProps = {
  visible: boolean;
  onClose: () => void;
  amount?: string;
  isProvide?: boolean;
};

const PaymentSuccessModal = ({
  visible,
  onClose,
  amount,
  isProvide = false,
}: PaymentSuccessModalProps) => {
  const onClosed = () => {
    onClose();
    if (isProvide) {
      resetNavigation(PROVIDER_SCREENS.ProviderTabNavigation);
    } else {
      resetNavigation(SEEKER_SCREENS.SeekerTabNavigation);
    }
  };
  return (
    <BottomModal
      close
      visible={visible}
      onClose={onClosed}
      onPressCancel={onClosed}
      style={styles.modalContainer}>
      <View
        style={[
          styles.dashedCircle,
          isProvide && {borderColor: Colors.provider_primary},
        ]}>
        <View
          style={[
            styles.innerCircle,
            isProvide && {backgroundColor: Colors.provider_primary},
          ]}>
          <View style={styles.checkmarkContainer}>
            <CustomImage source={IMAGES.right} size={getFontSize(10)} />
          </View>
        </View>
      </View>
      <CommonText
        text={isProvide ? 'Welcome aboard!' : 'Payment Successful!!'}
        style={styles.title}
      />

      {isProvide ? (
        <CommonText
          text={`We’ll notify you as soon as your account is activated`}
          style={styles.description}
        />
      ) : (
        <View style={styles.rowText}>
          <CommonText text="Successfully Paid " style={styles.description} />
          <Image source={IMAGES.dollar} style={styles.inlineIcon} />
          <CommonText text={amount ?? ''} style={styles.description} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.cancelButton,
            isProvide && {backgroundColor: Colors.provider_primary},
          ]}
          onPress={() => {
            onClose();
            if (isProvide) {
              resetNavigation(PROVIDER_SCREENS.ProviderTabNavigation);
            } else {
              resetNavigation(SEEKER_SCREENS.SeekerTabNavigation);
            }
          }}>
          <Text style={styles.cancelButtonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </BottomModal>
  );
};

export default PaymentSuccessModal;

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: hp(50),
    paddingBottom: hp(40),
    paddingHorizontal: wp(20),
    alignItems: 'center',
  },
  dashedCircle: {
    width: wp(130),
    height: hp(130),
    borderWidth: hp(3),
    borderStyle: 'dashed',
    borderRadius: wp(65),
    borderColor: '#03B463',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(25),
  },
  innerCircle: {
    width: wp(110),
    height: hp(110),
    borderRadius: wp(55),
    backgroundColor: '#03B463',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: Colors.white,
    fontSize: hp(45),
    fontWeight: 'bold',
  },
  title: {
    ...commonFontStyle(700, 3, Colors.black),
    textAlign: 'center',
    // marginBottom: hp(20),
    // lineHeight: hp(32),
  },
  description: {
    ...commonFontStyle(400, 2, '#666666'),
    textAlign: 'center',
    marginBottom: hp(20),
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  inlineIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: wp(10),
  },
  cancelButton: {
    backgroundColor: Colors.seeker_primary,
    borderRadius: hp(30),
    paddingVertical: hp(15),
    marginTop: hp(20),
    alignItems: 'center',
  },
  cancelButtonText: {
    ...commonFontStyle(600, 2.1, Colors.white),
  },
});
