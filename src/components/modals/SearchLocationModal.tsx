import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import CommonText from '../common/CommonText';
import Divider from '../common/Divider';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';

type Props = {
  setIsLocationModalVisible: (value: boolean) => void;
  setIsAddressModalVisible: (value: boolean) => void;
};

const SearchLocationModal = ({
  setIsLocationModalVisible,
  setIsAddressModalVisible,
}: Props) => {
  return (
    <View>
      <View style={styles.modalHandle} />

      <CommonText text={'Location'} style={styles.modalTitle} />

      <Divider />

      <CustomTextInput
        containerStyle={styles.textInput}
        placeholder={'Search Location'}
        rightIcon={<Image source={IMAGES.marker} tintColor={Colors.black} />}
      />

      <CustomButton
        title={'Continue'}
        onPress={() => {
          setIsLocationModalVisible(false);
          setTimeout(() => {
            setIsAddressModalVisible(true);
          }, 500);
        }}
        btnStyle={styles.continueButton}
      />
    </View>
  );
};

export default SearchLocationModal;

const styles = StyleSheet.create({
  modalHandle: {
    width: wp(40),
    height: hp(5),
    alignSelf: 'center',
    backgroundColor: Colors._E6E6E6,
  },
  modalTitle: {
    marginVertical: hp(25),
    textAlign: 'center',
    ...commonFontStyle(600, 2.4, Colors.black),
  },
  textInput: {
    marginTop: hp(38),
    borderRadius: hp(10),
  },
  continueButton: {
    marginVertical: hp(30),
    backgroundColor: Colors.seeker_primary,
  },
});
