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

Dimensions.get('window');

type ConfirmJobModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmJobModal = ({
  visible,
  onClose,
  onConfirm,
  onCancel,
}: ConfirmJobModalProps) => {
  return (
    <BottomModal
      visible={visible}
      onClose={onClose}
      onPressCancel={onClose}
      style={styles.modalContainer}>
      <View style={styles.dashedCircle}>
        <View style={styles.innerCircle}>
          <View style={styles.checkmarkContainer}>
            <CustomImage source={IMAGES.right} size={getFontSize(10)} />
          </View>
        </View>
      </View>

      <CommonText
        text="Confirm Job Completion"
        style={styles.title}
      />

      <CommonText
        text="Once confirmed, the job will be closed & you may proceed to rate the service."
        style={styles.description}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmButtonText}>Yes Completed</Text>
        </TouchableOpacity>
      </View>
    </BottomModal>
  );
};

export default ConfirmJobModal;

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
    ...commonFontStyle(700, 2.6, Colors.black),
    textAlign: 'center',
    marginBottom: hp(20),
    lineHeight: hp(32),
  },
  description: {
    ...commonFontStyle(400, 2.1, '#666666'),
    textAlign: 'center',
    lineHeight: hp(25),
    marginBottom: hp(35),
    paddingHorizontal: wp(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: wp(20),
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: wp(10),
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: hp(30),
    paddingHorizontal: wp(30),
    paddingVertical: hp(15),
    minWidth: wp(120),
    alignItems: 'center',
  },
  cancelButtonText: {
    ...commonFontStyle(600, 2.1, '#858585'),
  },
  confirmButton: {
    backgroundColor: '#03B463',
    borderRadius: hp(30),
    paddingHorizontal: wp(30),
    paddingVertical: hp(15),
    minWidth: wp(140),
    alignItems: 'center'
  },
  confirmButtonText: {
    ...commonFontStyle(600, 2.1, Colors.white),
  },
}); 