import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import CommonText from '../common/CommonText';
import RequestCard from '../common/RequestCard';
import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';

type Props = {
  handleCardPress: () => void;
};

const RequestSubmitModal = ({handleCardPress}: Props) => {
  return (
    <View style={styles.submitModalContainer}>
      <CommonText text={'Request Submitted'} style={styles.submitTitle} />

      <View style={styles.submitDashedCircle}>
        <View style={styles.submitInnerCircle}>
          <Image source={IMAGES.right} style={styles.rightIcon} />
        </View>
      </View>

      <CommonText
        style={styles.submitText}
        text={'Your request has been Submitted wait for the offers!'}
      />

      <View style={styles.referenceRow}>
        <CommonText text={'Reference Code:'} style={styles.referenceLabel} />
        <CommonText text={'#D-698321'} style={styles.referenceValue} />
      </View>

      <RequestCard
        handleCardPress={handleCardPress}
        style={styles.requestCardMargin}
      />
    </View>
  );
};

export default RequestSubmitModal;

const styles = StyleSheet.create({
  submitModalContainer: {
    alignItems: 'center',
  },
  submitTitle: {
    ...commonFontStyle(700, 2.3, Colors.black),
  },
  submitDashedCircle: {
    width: wp(120),
    height: hp(120),
    borderWidth: hp(1),
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: hp(120),
    marginVertical: hp(24),
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.seeker_primary,
  },
  submitInnerCircle: {
    width: wp(102),
    height: hp(102),
    alignItems: 'center',
    borderRadius: hp(120),
    justifyContent: 'center',
    backgroundColor: Colors.seeker_primary,
  },
  rightIcon: {
    height: '50%',
    width: '50%',
  },
  submitText: {
    textAlign: 'center',
    ...commonFontStyle(500, 2.2, Colors.black),
  },
  referenceRow: {
    marginTop: hp(11),
    flexDirection: 'row',
    alignItems: 'center',
  },
  referenceLabel: {
    ...commonFontStyle(400, 1.9, Colors._868686),
  },
  referenceValue: {
    ...commonFontStyle(400, 1.9, Colors.black),
  },
  requestCardMargin: {
    marginVertical: hp(25),
  },
});
