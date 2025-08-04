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
import SearchLocationModal from '@/components/modals/SearchLocationModal';
import AddLocation from '@/components/modals/AddLocation';

const SetLocation = () => {
  const mapRef = useRef<any | null>(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(true);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('Home');

  return (
    <SafeareaProvider style={styles.safeArea} edges={['bottom']}>
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
            <SearchLocationModal
              setIsAddressModalVisible={setIsAddressModalVisible}
              setIsLocationModalVisible={setIsLocationModalVisible}
            />
          </BottomModal>

          <BottomModal
            visible={isAddressModalVisible}
            onClose={() => setIsAddressModalVisible(false)}>
            <AddLocation
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              setIsAddressModalVisible={setIsAddressModalVisible}
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
  textInput: {
    marginTop: hp(38),
    borderRadius: hp(10),
  },
  continueButton: {
    marginVertical: hp(30),
    backgroundColor: Colors.seeker_primary,
  },
});
