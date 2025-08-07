import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomModal from '../common/BottomModal';
import CustomImage from '../common/CustomImage';
import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import {Colors} from '@/constants/Colors';
import CustomButton from '../common/CustomButton';
import AddSpecialNote from '../common/AddSpecialNote';
import UploadBox from '../common/UploadBox';

type Props = {
  close?: boolean;
  onPressGoBack: () => void;
  onPressCompleted: () => void;
  isUpdateWorkStatusModal: boolean;
  setIsUpdateWorkStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateWorkStatusModal = ({
  onPressGoBack,
  onPressCompleted,
  isUpdateWorkStatusModal,
  setIsUpdateWorkStatusModal,
  close,
}: Props) => {
  return (
    <BottomModal
      close={false}
      onClose={() => {setIsUpdateWorkStatusModal(false)}}
      showCloseButton={false}
      visible={isUpdateWorkStatusModal}>
      {!close && (
        <CustomImage
          source={IMAGES.close}
          size={hp(16)}
          imageStyle={styles.closeIcon}
          onPress={() => setIsUpdateWorkStatusModal(false)}
        />
      )}

      <View style={styles.contentContainer}>
        <CommonText text="Update Work Status" style={styles.titleText} />

        <UploadBox
          isButton={false}
          imgStyle={{marginTop: 0}}
          imageSource={IMAGES.ic_camera}
          desc="Upload video and images here."
          onCameraCardPress={() => {}}
          style={{height: hp(125), width: '100%',}}
        />

        <View style={{gap: hp(20), marginTop: hp(35)}}>
          <CommonText text="Add Special Note" style={styles.specialNoteTitle} />
          <AddSpecialNote
            style={styles.noteContainer}
            textInputStyle={styles.noteInput}
            cardStyle={{paddingHorizontal: 0}}
          />
        </View>

        <CustomButton
          title="Mark as Start"
          onPress={onPressCompleted}
          btnStyle={styles.completeBtn}
        />
      </View>
    </BottomModal>
  );
};

export default UpdateWorkStatusModal;

const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: 'flex-end',
  },
  contentContainer: {},
  titleText: {
    textAlign: 'center',
    marginBottom: hp(37),
    ...commonFontStyle(700, 2.4, Colors.black),
  },
  completeBtn: {
    width: '100%',
    marginVertical: hp(23),
  },
  specialNoteTitle: {
    ...commonFontStyle(600, 2.2, Colors.black),
  },
  noteContainer: {
    padding: 0,
    width: '100%',
    height: hp(85),
    paddingVertical: 0,
  },
  noteInput: {
    marginTop: 0,
    borderWidth: 0,
    ...commonFontStyle(400, 1.9, Colors._818181),
  },
});
