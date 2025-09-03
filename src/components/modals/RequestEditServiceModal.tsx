import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import {IMAGES} from '@/assets/images';
import BottomModal from '@/components/common/BottomModal';
import {PROVIDER_SCREENS, SEEKER_SCREENS} from '@/navigation/screenNames';
import CustomImage from '../common/CustomImage';
import {errorToast, resetNavigation} from '../common/commonFunction';
import {useRequestChangeMutation} from '@/api/Seeker/homeApi';

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
  const [note, setNote] = React.useState<string>('');
  const [requestChange, {isLoading}] = useRequestChangeMutation();

  const onChangeRequest = async () => {
    try {
      if (!note) {
        errorToast('Please enter a Description');
        return;
      }
      const formData = new FormData();
      formData.append('offer_id', offer_id);
      formData.append('note', note);

      const response = await requestChange(formData).unwrap();
      console.log('response', response);

      if (response?.status) {
        onClose();
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.cancelButton,
            isProvide && {backgroundColor: Colors.provider_primary},
          ]}
          onPress={() => {
            onChangeRequest();
          }}>
          <Text style={styles.cancelButtonText}>Send Request</Text>
        </TouchableOpacity>
      </View>
    </BottomModal>
  );
};

export default RequestEditServiceModal;

const styles = StyleSheet.create({
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
    flexDirection: 'row',
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
