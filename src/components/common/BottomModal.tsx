// components/BottomModal.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ViewStyle,
  Pressable,
} from 'react-native';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';
import Modal from 'react-native-modal';

type BottomModalProps = {
  close?: boolean;
  visible: boolean;
  style?: ViewStyle;
  onClose?: () => void;
  backgroundColor?: string;
  children: React.ReactNode;
  onPressCancel?: () => void;
};

const BottomModal = ({
  style,
  visible,
  onClose,
  children,
  close,
  onPressCancel,
  backgroundColor = '#fff',
}: BottomModalProps) => {
  return (
    <Modal
      avoidKeyboard
      style={styles.modal}
      onBackdropPress={onClose}
      useNativeDriverForBackdrop={true}
      isVisible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}>
        {close && (
          <Pressable onPress={onPressCancel} style={styles.closeContainer}>
            <Image source={IMAGES.close} />
          </Pressable>
        )}
        <View style={[styles.container, {backgroundColor}, style]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  transparent: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    padding: hp(24),
    maxHeight: '90%',
    borderTopLeftRadius: hp(25),
    borderTopRightRadius: hp(25),
    backgroundColor: Colors.white,
  },
  closeContainer: {
    width: wp(38),
    height: hp(38),
    margin: hp(20),
    borderRadius: hp(38),
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});
