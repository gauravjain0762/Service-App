import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import CommonText from '../common/CommonText';
import Divider from '../common/Divider';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import {navigationRef} from '@/navigation/RootContainer';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';

type Props = {
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setIsAddressModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddLocation = ({
  setIsAddressModalVisible,
  selectedType,
  setSelectedType,
}: Props) => {
  return (
    <>
      <CommonText text={'Address Details'} style={styles.addressTitle} />

      <Divider />

      <View style={styles.addressTypeRow}>
        {['Home', 'Work', 'Other'].map((item, index) => {
          const isSelected = selectedType === item;
          return (
            <Pressable
              key={index}
              onPress={() => setSelectedType(item)}
              style={[
                styles.addressTypeItem,
                isSelected && styles.addressTypeItemSelected,
              ]}>
              <CommonText
                text={item}
                style={[
                  styles.addressTypeText,
                  isSelected && styles.addressTypeTextSelected,
                ]}
              />
            </Pressable>
          );
        })}
      </View>

      <CustomTextInput
        placeholder={'Flat No. / House No.'}
        containerStyle={styles.inputUnderline}
        inputStyle={styles.inputText}
      />
      <CustomTextInput
        placeholder={'Street / Area / Locality'}
        containerStyle={styles.inputUnderline}
        inputStyle={styles.inputText}
      />
      <CustomTextInput
        placeholder={'City / District'}
        containerStyle={styles.inputUnderline}
        inputStyle={styles.inputText}
      />

      <CustomButton
        title={'Save Address'}
        onPress={() => {
          setIsAddressModalVisible(false);
          navigationRef?.current?.goBack();
        }}
        btnStyle={styles.continueButton}
      />
    </>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  addressTitle: {
    marginBottom: hp(25),
    ...commonFontStyle(600, 2.4, Colors.black),
  },
  addressTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(16),
  },
  addressTypeItem: {
    marginRight: wp(9),
    borderWidth: hp(1),
    borderRadius: hp(25),
    paddingVertical: hp(14),
    paddingHorizontal: wp(25),
    borderColor: Colors._F2EDED,
  },
  addressTypeText: {
    ...commonFontStyle(500, 1.8, Colors.black),
  },
  inputUnderline: {
    borderRadius: 0,
    marginTop: hp(25),
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors._EEEEEE,
  },
  inputText: {
    ...commonFontStyle(400, 1.8, Colors.black),
    paddingHorizontal: 0,
    backgroundColor: Colors.white,
  },
  addressTypeItemSelected: {
    backgroundColor: Colors.seeker_primary,
    borderColor: Colors.seeker_primary,
  },
  addressTypeTextSelected: {
    color: Colors.white,
  },
  continueButton: {
    marginVertical: hp(30),
    backgroundColor: Colors.seeker_primary,
  },
});
