import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomModal from '../common/BottomModal';
import CustomImage from '../common/CustomImage';
import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import {Colors} from '@/constants/Colors';
import CustomButton from '../common/CustomButton';
import { useAppSelector } from '@/Hooks/hooks';
import { rowReverseRTL } from '@/utils/arabicStyles';

type Props = {
  close?: boolean;
  onPressGoBack: () => void;
  onPressCompleted: () => void | any;
  isCompleteBookingModal: boolean;
  setIsCompleteBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
  serviceName?: string;
};

const CompleteBookingModal = ({
  onPressGoBack,
  onPressCompleted,
  isCompleteBookingModal,
  setIsCompleteBookingModal,
  close,
  serviceName = '',
}: Props) => {
  const {language} = useAppSelector(state => state.auth);
    const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <BottomModal
      close={false}
      onClose={() => {setIsCompleteBookingModal(false)}}
      visible={isCompleteBookingModal}>
      {!close && (
        <CustomImage
          source={IMAGES.close}
          size={hp(16)}
          imageStyle={styles.closeIcon}
          onPress={() => setIsCompleteBookingModal(false)}
        />
      )}

      <View style={styles.contentContainer}>
        <CommonText text="Complete Booking?" style={styles.titleText} />

        <CommonText style={styles.descriptionText}>
          {`Are you sure you have completed the `}
          <CommonText style={styles.highlightText}>{serviceName} </CommonText>
          Service?
        </CommonText>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Go Back"
            btnStyle={styles.goBackBtn}
            textStyle={styles.goBackText}
            onPress={onPressGoBack}
          />
          <CustomButton
            title="Mark as Completed"
            btnStyle={styles.completeBtn}
            onPress={onPressCompleted}
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default CompleteBookingModal;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  closeIcon: {
    alignSelf: 'flex-end',
  },
  contentContainer: {
    alignItems: 'center',
  },
  titleText: {
    ...commonFontStyle(700, 3, Colors.black),
    marginBottom: hp(37),
  },
  descriptionText: {
    lineHeight: hp(25),
    textAlign: 'center',
    marginBottom: hp(37),
    paddingHorizontal: wp(20),
    ...commonFontStyle(500, 2.2, Colors._686868),
  },
  highlightText: {
    ...commonFontStyle(500, 2.2, Colors.provider_primary),
  },
  buttonContainer: {
    ...rowReverseRTL(_language),
    alignItems: 'center',
    marginVertical: hp(15),
    gap: wp(12),
  },
  goBackBtn: {
    paddingVertical: hp(16),
    paddingHorizontal: wp(25),
    backgroundColor: Colors._F2ECEC,
  },
  goBackText: {
    color: Colors._7A7A7A,
  },
  completeBtn: {
    flex: 1,
  },
})}
