/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  ScrollView,
} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import CommonText from './CommonText';
import FastImage from 'react-native-fast-image';
import {textRTL} from '@/utils/arabicStyles';

export type DropdownItem = {
  label: string;
  value: string | number;
};

type Props = {
  label?: string;
  data: DropdownItem[];
  value: string | number | any;
  onChange: (item: DropdownItem) => void;
  placeholder?: string;
  required?: boolean;
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  disabled?: boolean;
  labelField?: string;
  valueField?: string;
  isSearchable?: boolean;
  setSelected?: React.Dispatch<React.SetStateAction<string | number>>;
  multiSelect?: boolean;
};

const CustomDropdown = ({
  label,
  data,
  value,
  onChange,
  placeholder = 'Select an option',
  required = false,
  containerStyle,
  dropdownStyle,
  disabled = false,
  labelField = 'label',
  valueField = 'value',
  isSearchable = false,
  setSelected,
  multiSelect = false,
}: Props) => {
  const handleChange = (item: DropdownItem) => {
    setSelected?.(item.value); // only call if setSelected is passed
    onChange(item);
  };

  const handleMultiSelectChange = (items: any) => {
    // For multiselect, pass the array of selected values directly
    onChange(items);
  };

  // Function to remove selected item
  const removeSelectedItem = (itemToRemove: any) => {
    const updatedSelection = value.filter((item: any) => item !== itemToRemove);
    onChange(updatedSelection);
  };

  // Function to get selected labels for display
  const getSelectedLabels = () => {
    if (!value || !Array.isArray(value) || value.length === 0) {
      return [];
    }
    return value.map((selectedValue: any) => {
      const foundItem = data.find(item => item[valueField] === selectedValue);
      return foundItem ? foundItem[labelField] : selectedValue;
    });
  };

  // Render selected items as chips
  const renderSelectedItems = () => {
    if (!multiSelect || !value || !Array.isArray(value) || value.length === 0) {
      return null;
    }

    const selectedLabels = getSelectedLabels();

    return (
      <View style={styles.selectedItemsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chipContainer}>
            {selectedLabels.map((label: string, index: number) => (
              <View key={index} style={styles.chip}>
                <CommonText style={styles.chipText} text={label} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeSelectedItem(value[index])}>
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <CommonText text={label} style={styles.label}>
          {required && <Text style={styles.required}>*</Text>}
        </CommonText>
      )}
      {multiSelect ? (
        <View>
          <MultiSelect
            data={data}
            value={value}
            onChange={handleMultiSelectChange}
            disable={disabled}
            labelField={labelField ? labelField : valueField}
            valueField={valueField}
            placeholder={placeholder}
            inputSearchStyle={{
              ...commonFontStyle(400, 2, Colors._5E5D5D),
              height: 40,
              padding: 0,
              borderRadius: 10,
              borderWidth: 0,
              backgroundColor: Colors.white,
            }}
            renderRightIcon={() => (
              <FastImage
                source={IMAGES.downArrow}
                defaultSource={IMAGES.downArrow}
                style={styles.arrowIcon}
                resizeMode={'contain'}
              />
            )}
            search={isSearchable}
            searchPlaceholder={'Search by keyword'}
            maxHeight={250}
            placeholderStyle={styles.placeholder}
            style={[styles.dropdown, dropdownStyle]}
            selectedTextStyle={styles.selectedText}
            renderItem={(item: DropdownItem) => {
              const isSelected =
                Array.isArray(value) && value.includes(item[valueField]);
              return (
                <View
                  style={[
                    styles.selectedItemsDropdown,
                    isSelected && {
                      backgroundColor: '#E8F4FD',
                    },
                  ]}>
                  <CommonText
                    style={{
                      ...commonFontStyle(400, 2, Colors.black),
                      ...textRTL(),
                      paddingHorizontal: 10,
                    }}
                    text={item?.label}
                  />
                </View>
              );
            }}
            activeColor={Colors.white}
            // Custom render for selected items inside the dropdown
            renderSelectedItem={(item, unSelect) => (
              <TouchableOpacity
                onPress={() => unSelect && unSelect(item)}
                style={styles.selectedItemChip}>
                <CommonText
                  style={styles.selectedItemText}
                  text={item[labelField]}
                />
                <Text style={styles.removeIcon}>×</Text>
              </TouchableOpacity>
            )}
            containerStyle={{
              backgroundColor: Colors.white,
              borderRadius: getFontSize(1.3),
              borderWidth: 1,
              borderColor: Colors._CDCDCD,
              overflow: 'hidden',
            }}
          />
        </View>
      ) : (
        <Dropdown
          data={data}
          value={value}
          onChange={handleChange}
          disable={disabled}
          labelField={labelField}
          valueField={valueField}
          placeholder={placeholder}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          iconStyle={styles.iconStyle}
          style={[styles.dropdown, dropdownStyle]}
          search={isSearchable}
          maxHeight={250}
          keyboardAvoiding
          itemContainerStyle={{}}
          onFocus={() => Keyboard.dismiss}
          renderRightIcon={() => (
            <FastImage
              source={IMAGES.downArrow}
              defaultSource={IMAGES.downArrow}
              style={styles.arrowIcon}
              resizeMode={'contain'}
            />
          )}
          renderItem={(item: any, selected: any): any => {
            if (item[labelField] && item[labelField] !== '') {
              return (
                <View style={styles.selectedItemsDropdown}>
                  <CommonText
                    style={{
                      ...commonFontStyle(400, 2, Colors.black),
                      ...textRTL(),
                      paddingHorizontal: 10,
                    }}
                    text={item[labelField]}
                  />
                </View>
              );
            }
          }}
          flatListProps={{
            ListEmptyComponent: () => (
              <CommonText style={styles.noData} text="No data found" />
            ),
          }}
          containerStyle={{
            backgroundColor: Colors.white,
            borderRadius: getFontSize(1.3),
            borderWidth: 1,
            borderColor: Colors._CDCDCD,
            overflow: 'hidden',
          }}
        />
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {},
  label: {
    ...commonFontStyle(500, 1.8, Colors.black),
  },
  required: {
    color: 'red',
  },
  dropdown: {
    minHeight: hp(55),
    borderRadius: hp(50),
    paddingHorizontal: wp(16),
    backgroundColor: Colors._F9F9F9,
    paddingVertical: hp(8),
  },
  placeholder: {
    ...commonFontStyle(400, 1.9, '#969595'),
  },
  selectedText: {
    ...commonFontStyle(400, 1.9, Colors.black),
  },
  arrowIcon: {
    width: wp(20),
    height: hp(20),
    tintColor: '#3B4256',
  },
  iconStyle: {
    width: wp(20),
    height: hp(20),
  },
  itemContainer: {
    paddingVertical: hp(10),
    paddingHorizontal: wp(10),
  },
  itemText: {
    ...commonFontStyle(400, 1.9, Colors.black),
  },
  noData: {
    ...commonFontStyle(400, 1.9, Colors._CDCDCD),
    textAlign: 'center',
    paddingVertical: hp(10),
  },
  // New styles for selected items display
  selectedItemsContainer: {
    marginTop: hp(8),
    maxHeight: hp(100),
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(8),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors._F9F9F9,
    borderRadius: hp(15),
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    marginRight: wp(8),
    marginBottom: hp(8),
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipText: {
    ...commonFontStyle(400, 1.6, Colors.black),
    marginRight: wp(6),
  },
  removeButton: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: getFontSize(1.2),
    fontWeight: 'bold',
    lineHeight: getFontSize(1.2),
  },
  // Styles for selected items inside dropdown
  selectedItemChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    borderRadius: hp(12),
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    marginRight: wp(4),
    marginBottom: hp(4),
    borderWidth: 1,
    borderColor: '#B3D9F2',
  },
  selectedItemText: {
    ...commonFontStyle(400, 1.4, '#1976D2'),
    marginRight: wp(4),
  },
  removeIcon: {
    color: '#1976D2',
    fontSize: getFontSize(1.6),
    fontWeight: 'bold',
    width: wp(16),
    textAlign: 'center',
  },
  selectedItemsDropdown: {
    padding: getFontSize(1.5),
  },
  inputContainer: {},
});
