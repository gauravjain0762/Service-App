import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';
import CustomTextInput from '@/components/common/CustomTextInput';
import CustomButton from '@/components/common/CustomButton';
import {IMAGES} from '@/assets/images';
import CustomImage from '../common/CustomImage';

interface SearchLocationModalProps {
  search: string;
  searchData: any[];
  onChangeSearch: (text: string) => void;
  onPressCross: () => void;
  onPressConfirmLocation: () => void;
  onSelectPlace: (place: any) => void;
  setIsAddressModalVisible: (visible: boolean) => void;
  setIsLocationModalVisible: (visible: boolean) => void;
}

const SearchLocationModal: React.FC<SearchLocationModalProps> = ({
  search,
  searchData,
  onChangeSearch,
  onPressCross,
  onPressConfirmLocation,
  onSelectPlace,
  setIsAddressModalVisible,
  setIsLocationModalVisible,
}) => {
  const handleConfirmLocation = () => {
    setIsLocationModalVisible(false);
    onPressConfirmLocation();
  };

  const renderSearchItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => onSelectPlace(item)}
        style={styles.searchItem}>
        <Text numberOfLines={1} style={styles.searchItemText}>
          {item?.description}
        </Text>
      </TouchableOpacity>
    );
  };

  const listHeaderComponent = <View style={{height: hp(16)}} />;
  const itemSeparatorComponent = () => <View style={{height: hp(8)}} />;

  return (
    <View style={styles.container}>
      <View style={styles.sheetBarStyle} />

      <View style={styles.locationHeader}>
        <CommonText style={styles.title}>Location</CommonText>
      </View>
      <CustomTextInput
        value={search}
        onChangeText={onChangeSearch}
        containerStyle={styles.textInput}
        placeholder={'Search Location'}
        rightIcon={
          <CustomImage
            onPress={search.length > 0 ? onPressCross : undefined}
            source={search.length > 0 ? IMAGES.cancel : IMAGES.marker}
            size={getFontSize(2.4)}
            tintColor={Colors.black}
          />
        }
      />

      {searchData?.length > 0 && (
        <View style={styles.searchResultsContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchData}
            renderItem={renderSearchItem}
            ItemSeparatorComponent={itemSeparatorComponent}
            ListHeaderComponent={listHeaderComponent}
            scrollEnabled
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Confirm Location"
          onPress={handleConfirmLocation}
          disabled={search?.length === 0}
          btnStyle={styles.continueButton}
        />
      </View>
    </View>
  );
};

export default SearchLocationModal;

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
  locationHeader: {
    borderBottomWidth: 2,
    borderColor: Colors._EEEEEE,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(30),
  },
  title: {
    paddingBottom: hp(18),
    paddingTop: hp(13),
    ...commonFontStyle(600, 2.4, Colors.black),
  },
  textInput: {
    borderRadius: hp(10),
  },
  searchResultsContainer: {
    height: 'auto',
    maxHeight: hp(200),
  },
  searchItem: {
    paddingHorizontal: wp(10),
    borderBottomColor: Colors._EEEEEE,
    borderBottomWidth: 1,
    paddingVertical: hp(2),
  },
  searchItemText: {
    ...commonFontStyle(400, 1.8, Colors.black),
  },
  buttonContainer: {
    paddingTop: hp(30),
  },
  continueButton: {
    backgroundColor: Colors.seeker_primary,
  },
});
