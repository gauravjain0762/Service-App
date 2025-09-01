import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import {IMAGES} from '@/assets/images';
import BottomModal from '@/components/common/BottomModal';

Dimensions.get('window');

type PaymentMethodModalProps = {
  visible: boolean;
  onClose: () => void;
  onPaymentSelect: (method: string) => void;
};

const PaymentMethodModal = ({
  visible,
  onClose,
  onPaymentSelect,
}: PaymentMethodModalProps) => {
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
    onPaymentSelect(method);
  };

  return (
    <BottomModal
      visible={visible}
      close
      onClose={onClose}
      onPressCancel={onClose}
      style={styles.modalContainer}>
      <CommonText text="Choose Payment Method" style={styles.title} />

      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => handlePaymentSelect('Pay by Card')}>
          <View style={styles.paymentInfo}>
            <Image source={IMAGES.card} style={styles.iconCard} />
            <CommonText text="Pay by Card" style={styles.paymentText} />
          </View>
          <View
            style={[
              styles.radioButton,
              selectedPayment === 'Pay by Card' && styles.radioButtonSelected,
            ]}>
            {selectedPayment === 'Pay by Card' && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => handlePaymentSelect('Apple Pay')}>
          <View style={styles.paymentInfo}>
            <Image source={IMAGES.apple} style={styles.iconApple} />
            <CommonText text="Apple Pay" style={styles.paymentText} />
          </View>
          <View
            style={[
              styles.radioButton,
              selectedPayment === 'Apple Pay' && styles.radioButtonSelected,
            ]}>
            {selectedPayment === 'Apple Pay' && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => handlePaymentSelect('Pay by Cash')}>
          <View style={styles.paymentInfo}>
            <Image source={IMAGES.cash} style={styles.iconCash} />
            <CommonText text="Pay by Cash" style={styles.paymentText} />
          </View>
          <View
            style={[
              styles.radioButton,
              selectedPayment === 'Pay by Cash' && styles.radioButtonSelected,
            ]}>
            {selectedPayment === 'Pay by Cash' && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </BottomModal>
  );
};

export default PaymentMethodModal;

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: hp(30),
    paddingBottom: hp(40),
    paddingHorizontal: wp(20),
    position: 'relative',
  },
  title: {
    ...commonFontStyle(700, 2.2, Colors.black),
    textAlign: 'left',
    marginBottom: hp(25),
    marginTop: hp(10),
    marginLeft: wp(5),
  },
  paymentContainer: {
    gap: hp(10),
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(15),
    paddingHorizontal: wp(10),
    borderRadius: hp(12),
    backgroundColor: Colors.white,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(15),
  },
  iconCard: {
    width: wp(32),
    height: hp(22),
    resizeMode: 'contain',
  },
  iconApple: {
    width: wp(28),
    height: hp(28),
    resizeMode: 'contain',
  },
  iconCash: {
    width: wp(28),
    height: hp(28),
    resizeMode: 'contain',
  },
  paymentText: {
    ...commonFontStyle(500, 2.0, Colors.black),
  },
  radioButton: {
    width: wp(25),
    height: hp(25),
    borderRadius: wp(100),
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#000000',
  },
  radioButtonInner: {
    width: wp(12),
    height: hp(12),
    borderRadius: wp(100),
    backgroundColor: Colors.black,
  },
});
