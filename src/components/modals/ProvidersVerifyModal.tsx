import React from 'react';
import {StyleSheet, View} from 'react-native';

import BottomModal from '../common/BottomModal';
import CustomImage from '../common/CustomImage';
import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import {Colors} from '@/constants/Colors';
import CustomButton from '../common/CustomButton';

type Props = {
  visible: boolean;
  onPressClose: () => void;
};

const ProvidersVerifyModal = ({onPressClose, visible}: Props) => {
  return (
    <BottomModal onClose={() => {}} onPressCancel={() => {}} visible={visible}>
      <CustomImage
        size={hp(16)}
        source={IMAGES.close}
        onPress={onPressClose}
        imageStyle={styles.closeIcon}
      />
      <View style={styles.contentContainer}>
        {/* <CommonText text={headerText} style={styles.title} /> */}
        <CommonText
          text={
            'Thanks for signing up! Our team is reviewing your provider account. We’ll notify you as soon as it’s activated.'
          }
          style={styles.description}
        />

        {/* <View style={styles.buttonRow}>
          <CustomButton
            title="Cancel"
            onPress={onPressClose}
            btnStyle={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
          <CustomButton
            title={buttonTitle}
            btnStyle={[
              styles.primaryButton,
              isProvider
                ? {backgroundColor: Colors.provider_primary}
                : {backgroundColor: Colors.seeker_primary},
            ]}
            onPress={onPressConfirm}
          />
        </View> */}
      </View>
    </BottomModal>
  );
};

export default ProvidersVerifyModal;

const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: 'flex-end',
  },
  contentContainer: {
    paddingHorizontal: wp(15),
    paddingBottom: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...commonFontStyle(700, 2.5, Colors.black),
    marginVertical: hp(23),
  },
  description: {
    textAlign: 'center',
    marginBottom: hp(23),
    ...commonFontStyle(600, 2.2, Colors._767676),
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(13),
    marginTop: hp(20),
  },
  primaryButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors._F2F2F2,
  },
  cancelButtonText: {
    ...commonFontStyle(500, 1.8, Colors._7C7C7C),
  },
});
