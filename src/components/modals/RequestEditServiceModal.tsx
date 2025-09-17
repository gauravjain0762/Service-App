import React from 'react';
import {StyleSheet, Dimensions, TextInput} from 'react-native';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import BottomModal from '@/components/common/BottomModal';
import {errorToast, successToast} from '../common/commonFunction';
import {useRequestChangeMutation} from '@/api/Seeker/homeApi';
import CustomButton from '../common/CustomButton';
import {useAppSelector} from '@/Hooks/hooks';
import {rowReverseRTL} from '@/utils/arabicStyles';

Dimensions.get('window');

type RequestEditServiceModalProps = {
  visible: boolean;
  onClose: () => void;
  amount?: string;
  isProvide?: boolean;
  offer_id?: string;
};

const RequestEditServiceModal = ({
  visible,
  onClose,
  isProvide = false,
  offer_id,
}: RequestEditServiceModalProps) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const [note, setNote] = React.useState<string>('');
  const [requestChange, {isLoading}] = useRequestChangeMutation();

  const onChangeRequest = async () => {
    try {
      if (!note) {
        errorToast('Please enter a Description');
        return;
      }
      const data = {
        offer_id: offer_id,
        note: note,
      };

      const response = await requestChange(data).unwrap();
      console.log('response', response);

      if (response?.status) {
        onClose();
        successToast(response?.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.data?.message || error?.message || 'Something went wrong',
      );
    }
  };

  return (
    <BottomModal
      close
      visible={visible}
      //   onClose={onClose}
      onPressCancel={onClose}
      style={styles.modalContainer}>
      <CommonText text={'Request To Edit Service'} style={styles.title} />

      <TextInput
        multiline
        placeholder={'Describe here...'}
        style={styles.textInput}
        value={note}
        onChangeText={setNote}
      />

      <CustomButton
        isPrimary="seeker"
        title={'Send Request'}
        type="fill"
        btnStyle={[
          styles.cancelButton,
          isProvide && {backgroundColor: Colors.provider_primary},
        ]}
        style={styles.buttonContainer}
        textStyle={styles.cancelButtonText}
        onPress={() => {
          onChangeRequest();
        }}
        loading={isLoading}
      />
    </BottomModal>
  );
};

export default RequestEditServiceModal;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    modalContainer: {
      paddingTop: hp(50),
      paddingBottom: hp(40),
      paddingHorizontal: wp(20),
      // alignItems: 'center',
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
      ...commonFontStyle(600, 2.5, Colors.black),
    },
    description: {
      ...commonFontStyle(400, 2, '#666666'),
      textAlign: 'center',
      marginBottom: hp(20),
    },
    rowText: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    inlineIcon: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },
    buttonContainer: {
      width: '100%',
      justifyContent: 'center',
      paddingHorizontal: wp(10),
    },
    cancelButton: {
      backgroundColor: Colors.seeker_primary,
      borderRadius: hp(30),
      paddingVertical: hp(15),
      marginTop: hp(20),
      alignItems: 'center',
    },
    cancelButtonText: {
      ...commonFontStyle(600, 2.1, Colors.white),
    },
    textInput: {
      width: '100%',
      height: hp(125),
      padding: hp(16),
      marginTop: hp(18),
      borderWidth: hp(1),
      borderRadius: hp(10),
      textAlignVertical: 'top',
      borderColor: Colors._BFC2C1,
    },
  });
};
