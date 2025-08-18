/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image, Keyboard, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from './CommonText';

export type DropdownItem = {
  label: string;
  value: string | number;
};

type Props = {
  label?: string;
  data: DropdownItem[];
  value: string | number;
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
}: Props) => {
  const handleChange = (item: DropdownItem) => {
    setSelected?.(item.value); // only call if setSelected is passed
    onChange(item);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <CommonText text={label} style={styles.label}>
          {required && <Text style={styles.required}>*</Text>}
        </CommonText>
      )}

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
          <Image
            source={IMAGES.downArrow}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        )}
        renderItem={(item: DropdownItem) => (
          <View style={styles.itemContainer}>
            <CommonText style={styles.itemText} text={item?.label || ''} />
          </View>
        )}
        flatListProps={{
          ListEmptyComponent: () => (
            <CommonText style={styles.noData} text="No data found" />
          ),
        }}
      />
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
    height: hp(55),
    borderRadius: hp(50),
    paddingHorizontal: wp(16),
    backgroundColor: Colors._F9F9F9,
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
});
