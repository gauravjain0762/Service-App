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
import {useAppSelector} from '@/Hooks/hooks';
import { rowReverseRTL, textRTL } from '@/utils/arabicStyles';

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
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
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
          onPress={() => handlePaymentSelect('card')}>
          <View style={styles.paymentInfo}>
            <Image source={IMAGES.card} style={styles.iconCard} />
            <CommonText text="Pay by Card" style={styles.paymentText} />
          </View>
          <View
            style={[
              styles.radioButton,
              selectedPayment === 'card' && styles.radioButtonSelected,
            ]}>
            {selectedPayment === 'card' && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => handlePaymentSelect('applePay')}>
          <View style={styles.paymentInfo}>
            <Image source={IMAGES.apple} style={styles.iconApple} />
            <CommonText text="Apple Pay" style={styles.paymentText} />
          </View>
          <View
            style={[
              styles.radioButton,
              selectedPayment === 'applePay' && styles.radioButtonSelected,
            ]}>
            {selectedPayment === 'applePay' && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
    </BottomModal>
  );
};

export default PaymentMethodModal;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    modalContainer: {
      paddingTop: hp(30),
      paddingBottom: hp(40),
      paddingHorizontal: wp(20),
      position: 'relative',
    },
    title: {
      ...commonFontStyle(700, 2.2, Colors.black),
      ...textRTL(_language),
      marginBottom: hp(25),
      marginTop: hp(10),
      marginLeft: wp(5),
    },
    paymentContainer: {
      gap: hp(10),
    },
    paymentOption: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: hp(15),
      paddingHorizontal: wp(10),
      borderRadius: hp(12),
      backgroundColor: Colors.white,
    },
    paymentInfo: {
      ...rowReverseRTL(_language),
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
};
