import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import CommonText from './CommonText';
import BottomModal from './BottomModal';
import {Colors} from '@/constants/Colors';
import CustomButton from './CustomButton';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CustomImage from './CustomImage';
import {IMAGES} from '@/assets/images';
import { useAppSelector } from '@/Hooks/hooks';
import { alignSelfLTR, marginRTLLeft, rowReverseRTL, textRTL } from '@/utils/arabicStyles';

type Props = {
  close?: any;
  headerTitle?: string;
  buttonTitle?: string;
  allOptions: string[];
  selectedOption: string;
  isChooseOptionsModal: boolean;
  textStyle?: StyleProp<TextStyle>;
  handleOptionSelect: (option: string) => void;
  setIsChooseOptionsModal: React.Dispatch<React.SetStateAction<boolean>>;
} & TouchableOpacityProps;

const ChooseOptions = ({
  close,
  textStyle,
  allOptions,
  buttonTitle,
  headerTitle,
  selectedOption,
  handleOptionSelect,
  isChooseOptionsModal,
  setIsChooseOptionsModal,
  ...buttonProps
}: Props) => {
  const {language} = useAppSelector(state => state.auth);
    const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <BottomModal
      close={close}
      visible={isChooseOptionsModal}
      onClose={() => setIsChooseOptionsModal(false)}
      onPressCancel={() => setIsChooseOptionsModal(false)}
      style={styles.modalContainer}>
      {!close && (
        <CustomImage
          source={IMAGES.close}
          size={hp(16)}
          imageStyle={{...alignSelfLTR(language)}}
          onPress={() => setIsChooseOptionsModal(false)}
        />
      )}
      {headerTitle && (
        <CommonText
          text={'Update Work Status'}
          style={{
            marginBottom: hp(40),
            ...commonFontStyle(700, 2.4, Colors.black),
            ...textRTL(language)
          }}
        />
      )}
      <View style={styles.outerContainer}>
        {allOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={styles.Option}
            onPress={() => handleOptionSelect(option)}>
            <CommonText text={option} style={[styles.text, textStyle]} />
            <View
              style={[
                styles.radioButton,
                selectedOption === option && styles.radioButtonSelected,
              ]}>
              {selectedOption === option && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
        {buttonTitle && (
          <CustomButton
            title={buttonTitle}
            btnStyle={{marginTop: hp(20)}}
            textStyle={{...commonFontStyle(600, 2.2, Colors.white)}}
            {...buttonProps}
          />
        )}
      </View>
    </BottomModal>
  );
};

export default ChooseOptions;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  modalContainer: {
    paddingTop: hp(30),
    position: 'relative',
    paddingBottom: hp(40),
    paddingHorizontal: wp(20),
  },
  title: {
    ...textRTL(_language),
    ...marginRTLLeft(_language,wp(5)),
    marginTop: hp(10),
    marginBottom: hp(25),
    ...commonFontStyle(700, 2.2, Colors.black),
  },
  outerContainer: {
    gap: hp(23),
  },
  Option: {
    ...rowReverseRTL(_language),
    alignItems: 'center',
    borderRadius: hp(12),
    paddingHorizontal: wp(10),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  radioButton: {
    width: wp(25),
    height: hp(25),
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    borderColor: Colors.black,
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
  text: {
    ...commonFontStyle(500, 2.0, Colors.black),
  },
})}
