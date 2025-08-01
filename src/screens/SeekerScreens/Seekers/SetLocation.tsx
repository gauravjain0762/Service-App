import React, {useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import MapView, {Marker} from 'react-native-maps';
import BottomModal from '@/components/common/BottomModal';
import CommonText from '@/components/common/CommonText';
import Divider from '@/components/common/Divider';
import CustomTextInput from '@/components/common/CustomTextInput';
import CustomButton from '@/components/common/CustomButton';
import {navigationRef} from '@/navigation/RootContainer';

const SetLocation = () => {
  const mapRef = useRef<any | null>(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(true);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('Home');

  return (
    <SafeareaProvider style={styles.safeArea}>
      <View style={styles.headerPadding}>
        <BackHeader
          text={'Set Your Location'}
          leftIcon={
            <Pressable onPress={() => navigationRef?.current?.goBack()}>
              <Image source={IMAGES.backArrow} style={styles.backIcon} />
            </Pressable>
          }
        />
      </View>

      <KeyboardAvoidingView style={styles.keyboardContainer}>
        <View style={styles.flexContainer}>
          <View style={styles.container}>
            <MapView
              ref={mapRef}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.mapStyle}>
              <Marker
                coordinate={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                }}
              />
            </MapView>
          </View>

          <BottomModal
            visible={isLocationModalVisible}
            onClose={() => setIsLocationModalVisible(false)}>
            <View>
              <View style={styles.modalHandle} />

              <CommonText text={'Location'} style={styles.modalTitle} />

              <Divider />

              <CustomTextInput
                containerStyle={styles.textInput}
                placeholder={'Search Location'}
                rightIcon={
                  <Image source={IMAGES.marker} tintColor={Colors.black} />
                }
              />

              <CustomButton
                title={'Continue'}
                onPress={() => {
                  setIsLocationModalVisible(false);
                  setTimeout(() => {
                    setIsAddressModalVisible(true);
                  }, 500);
                }}
                btnStyle={styles.continueButton}
              />
            </View>
          </BottomModal>

          <BottomModal
            visible={isAddressModalVisible}
            onClose={() => setIsAddressModalVisible(false)}>
            <CommonText text={'Address Details'} style={styles.addressTitle} />

            <Divider />

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
            />
            <CustomTextInput
              placeholder={'Street / Area / Locality'}
              containerStyle={styles.inputUnderline}
              inputStyle={styles.inputText}
            />
            <CustomTextInput
              placeholder={'City / District'}
              containerStyle={styles.inputUnderline}
              inputStyle={styles.inputText}
            />

            <CustomButton
              title={'Save Address'}
              onPress={() => {
                setIsAddressModalVisible(false);
                navigationRef?.current?.goBack();
              }}
              btnStyle={styles.continueButton}
            />
          </BottomModal>
        </View>
      </KeyboardAvoidingView>
    </SafeareaProvider>
  );
};

export default SetLocation;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerPadding: {
    paddingHorizontal: wp(24),
  },
  backIcon: {
    height: hp(22),
    width: wp(15),
  },
  keyboardContainer: {
    flex: 1,
    marginTop: hp(21),
  },
  flexContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  modalHandle: {
    width: wp(40),
    height: hp(5),
    alignSelf: 'center',
    backgroundColor: Colors._E6E6E6,
  },
  modalTitle: {
    marginVertical: hp(25),
    textAlign: 'center',
    ...commonFontStyle(600, 2.4, Colors.black),
  },
  textInput: {
    marginTop: hp(38),
    borderRadius: hp(10),
  },
  continueButton: {
    marginVertical: hp(30),
    backgroundColor: Colors.seeker_primary,
  },
  addressTitle: {
    marginBottom: hp(25),
    ...commonFontStyle(600, 2.4, Colors.black),
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
});
