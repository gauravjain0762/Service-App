import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import CustomTextInput from '@/components/common/CustomTextInput';
import CustomButton from '@/components/common/CustomButton';
import {useUpdateProfileMutation} from '@/api/Seeker/profileApi';
import {errorToast, goBack, successToast} from '../common/commonFunction';
import {rowReverseRTL} from '@/utils/arabicStyles';

interface AddLocationProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  setIsAddressModalVisible: (visible: boolean) => void;
  currentLocation: string;
  onConfirm: () => void;
  setIsLocationModalVisible: any;
}

const AddLocation: React.FC<AddLocationProps> = ({
  selectedType,
  setSelectedType,
  setIsAddressModalVisible,
  currentLocation,
  onConfirm,
  setIsLocationModalVisible,
}) => {
  const [details, setDetails] = React.useState({
    type: selectedType,
    building_name: currentLocation?.split('-')[0],
    apt_villa_no: '',
    directions: currentLocation?.split("-")?.slice(1).join("-"),
  });
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();

  const onUpdateProfile = async () => {
    try {
      if (details?.apt_villa_no?.length === 0) {
        errorToast('Please enter Flat or House No.');
        return;
      }
      if (details?.building_name?.length === 0) {
        errorToast('Please enter Area');
        return;
      }
      if (details?.directions?.length === 0) {
        errorToast('Please enter city');
        return;
      }
      const formData = new FormData();
      formData.append('address[type]', details?.type);
      formData.append('address[building_name]', details?.building_name);
      formData.append('address[apt_villa_no]', details?.apt_villa_no);
      formData.append('address[directions]', details?.directions);
      const response = await updateProfile(formData).unwrap();
      if (response?.status) {
        successToast(response?.message);
        setIsAddressModalVisible(false);
        goBack();
      } else {
        errorToast(response?.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(
        error?.message || error?.data?.message || 'Something went wrong',
      );
    }
  };
  const onChangeAddress = () => {
    setIsAddressModalVisible(false);
    setIsLocationModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.sheetBarStyle} />

      <View style={styles.header}>
        <CommonText style={styles.title}>Add Address Details</CommonText>
      </View>

      {/* Current Location Display */}
      <View style={styles.currentLocationContainer}>
        <View style={styles.buttonContainer}>
          <CommonText style={styles.currentLocationLabel}>
            Selected Location:
          </CommonText>
          <CustomButton
            title={'Change'}
            btnStyle={styles.changeBtn}
            textStyle={styles.changeBtnText}
            onPress={onChangeAddress}
          />
        </View>
        <CommonText style={styles.currentLocationText} numberOfLines={2}>
          {currentLocation}
        </CommonText>
      </View>

      <View style={styles.addressTypeRow}>
        {['Home', 'Work', 'Other'].map((item, index) => {
          const isSelected = selectedType === item;
          return (
            <Pressable
              key={index}
              onPress={() => setSelectedType(item)}
              style={[
                styles.addressTypeItem,
                isSelected && styles.addressTypeItemSelected,
              ]}>
              <CommonText
                text={item}
                style={[
                  styles.addressTypeText,
                  isSelected && styles.addressTypeTextSelected,
                ]}
              />
            </Pressable>
          );
        })}
      </View>

      <CustomTextInput
        placeholder={'Flat No. / House No.'}
        containerStyle={styles.inputUnderline}
        inputStyle={styles.inputText}
        onChangeText={e => {
          setDetails({...details, apt_villa_no: e});
        }}
        value={details?.apt_villa_no}
      />
      <CustomTextInput
        placeholder={'Street / Area / Locality'}
        containerStyle={styles.inputUnderline}
        inputStyle={styles.inputText}
        onChangeText={e => {
          setDetails({...details, building_name: e});
        }}
        value={details?.building_name}
      />
      <CustomTextInput
        placeholder={'City / District'}
        containerStyle={styles.inputUnderline}
        inputStyle={styles.inputText}
        onChangeText={e => {
          setDetails({...details, directions: e});
        }}
        value={details?.directions}
      />

      <CustomButton
        title={'Save Address'}
        onPress={onUpdateProfile}
        btnStyle={styles.continueButton}
      />
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: hp(10),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: hp(16),
  },
  sheetBarStyle: {
    backgroundColor: Colors._E6E6E6,
    width: wp(48),
    height: hp(5),
    alignSelf: 'center',
    borderRadius: 100,
  },
  header: {
    borderBottomWidth: 2,
    borderColor: Colors._EEEEEE,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(20),
  },
  title: {
    ...commonFontStyle(600, 2.4, Colors.black),
    paddingBottom: hp(18),
    paddingTop: hp(13),
  },
  currentLocationContainer: {
    backgroundColor: Colors._EEEEEE,
    padding: wp(15),
    borderRadius: hp(10),
    marginBottom: hp(20),
  },
  buttonContainer: {
    ...rowReverseRTL(),
    justifyContent: 'space-between',
    marginBottom: getFontSize(2),
  },
  currentLocationLabel: {
    ...commonFontStyle(600, 1.8, Colors._898989),
    marginBottom: hp(5),
  },
  currentLocationText: {
    ...commonFontStyle(600, 2, Colors.black),
  },

  addressTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(16),
  },
  addressTypeItem: {
    marginRight: wp(9),
    borderWidth: hp(1),
    borderRadius: hp(25),
    paddingVertical: hp(14),
    paddingHorizontal: wp(25),
    borderColor: Colors._F2EDED,
  },
  addressTypeText: {
    ...commonFontStyle(500, 1.8, Colors.black),
  },
  inputUnderline: {
    borderRadius: 0,
    marginTop: hp(25),
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors._EEEEEE,
  },
  inputText: {
    ...commonFontStyle(400, 1.8, Colors.black),
    paddingHorizontal: 0,
    backgroundColor: Colors.white,
  },
  addressTypeItemSelected: {
    backgroundColor: Colors.seeker_primary,
    borderColor: Colors.seeker_primary,
  },
  addressTypeTextSelected: {
    color: Colors.white,
  },
  continueButton: {
    marginVertical: hp(30),
    backgroundColor: Colors.seeker_primary,
  },
  changeBtn: {
    flexShrink: 1,
    borderRadius: hp(50),
    paddingVertical: hp(6),
    paddingHorizontal: wp(12),
    backgroundColor: Colors._EBFCF4,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
  },
  changeBtnText: {
    ...commonFontStyle(500, 1.4, Colors._039B55),
  },
});
