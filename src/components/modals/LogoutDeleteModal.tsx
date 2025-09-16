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
  image?: any;
  visible: boolean;
  buttonTitle: string;
  isProvider?: boolean;
  headerText: string;
  descriptionText: string;
  onPressClose: () => void;
  onPressConfirm: () => void;
};

const LogoutDeleteModal = ({
  onPressClose,
  buttonTitle,
  isProvider,
  visible,
  descriptionText,
  headerText,
  image,
  onPressConfirm,
}: Props) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <BottomModal onClose={() => {}} onPressCancel={() => {}} visible={visible}>
      <CustomImage
        size={hp(16)}
        source={IMAGES.close}
        onPress={onPressClose}
        imageStyle={styles.closeIcon}
      />
      <View style={styles.contentContainer}>
        <CustomImage source={image} size={hp(47)} />
        <CommonText text={headerText} style={styles.title} />
        <CommonText text={descriptionText} style={styles.description} />

        <View style={styles.buttonRow}>
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
        </View>
      </View>
    </BottomModal>
  );
};

export default LogoutDeleteModal;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  closeIcon: {
    alignSelf: 'flex-end',
  },
  contentContainer: {
    paddingHorizontal: wp(20),
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
    ...commonFontStyle(400, 2.2, Colors._767676),
  },
  buttonRow: {
    ...rowReverseRTL(_language),
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
})}
