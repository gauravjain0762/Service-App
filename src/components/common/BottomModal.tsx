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
  Animated,
  Easing,
} from 'react-native';
import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import ToastComponent from '../ToastComponent';
import { useAppSelector } from '@/Hooks/hooks';
import { alignSelfLTR } from '@/utils/arabicStyles';

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
  const {language} = useAppSelector<any>(state => state.auth);
      const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const lineAnim = React.useRef(new Animated.Value(1)).current;
  const toastConfig = {
    success: ({text1, ...rest}: any) => (
      <ToastComponent type="success" text1={text1} lineAnim={lineAnim} />
    ),
    error: ({text1, ...rest}: any) => (
      <ToastComponent type="error" text1={text1} lineAnim={lineAnim} />
    ),
  };
  const startLineAnimation = () => {
    lineAnim.setValue(1);

    Animated.timing(lineAnim, {
      toValue: 0,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  return (
    <Modal
      avoidKeyboard
      style={styles.modal}
      onBackdropPress={onClose}
      // useNativeDriverForBackdrop={true}
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
        <Toast
          config={toastConfig}
          position="bottom"
          topOffset={0}
          visibilityTime={3000}
          onShow={() => {
            startLineAnimation(); // Reset and trigger the animation
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BottomModal;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
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
    ...alignSelfLTR(_language),
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
})}