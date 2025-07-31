import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';

import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import CommonText from './CommonText';

const generateDates = () => {
  const dates = [];
  const start = moment();
  const end = moment().add(1, 'year');

  let current = start.clone();

  while (current.isSameOrBefore(end, 'day')) {
    dates.push({
      key: current.format('DDMM'),
      month: current.format('MMM'),
      day: current.format('DD'),
      weekday: current.format('ddd'),
      fullDate: current.clone(),
    });
    current.add(1, 'day');
  }

  return dates;
};

const dates = generateDates();

type Props = {
  onDatePress?: (date: moment.Moment) => void;
  selectedDate?: any;
  setSelectedDate?: (date: any) => void;
};

const CustomDates = ({onDatePress, selectedDate, setSelectedDate}: Props) => {
  const isSelected = (item: any) => selectedDate?.key === item.key;

  return (
    <View style={styles.container}>
      <CommonText
        text={'Select Date'}
        style={{...commonFontStyle(700, 2.2, Colors.black)}}
      />
      <FlatList
        data={dates}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        renderItem={({item}) => {
          const selected = isSelected(item);
          return (
            <TouchableOpacity
              style={[styles.dateBox, selected && styles.selectedBox]}
              onPress={() => {
                setSelectedDate?.(item);
                onDatePress?.(item.fullDate);
              }}>
              <Text style={[styles.month, selected && styles.selectedText]}>
                {item.month}
              </Text>
              <Text style={[styles.day, selected && styles.selectedText]}>
                {item.day}
              </Text>
              <Text style={[styles.weekday, selected && styles.selectedText]}>
                {item.weekday}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CustomDates;

const styles = StyleSheet.create({
  container: {
    gap: hp(22),
    paddingVertical: hp(10),
  },
  flatList: {},
  dateBox: {
    width: wp(60),
    height: hp(90),
    borderWidth: hp(1),
    marginRight: wp(10),
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors._F2EDED,
    backgroundColor: Colors.white,
  },
  selectedBox: {
    backgroundColor: Colors.seeker_primary,
    borderColor: Colors.seeker_primary,
  },
  month: {
    ...commonFontStyle(500, 1.8, Colors._9A9A9A),
  },
  day: {
    marginTop: hp(7),
    ...commonFontStyle(600, 3, Colors._4F4F4F),
  },
  weekday: {
    ...commonFontStyle(500, 1.8, Colors._9A9A9A),
  },
  selectedText: {
    color: Colors.white,
  },
});
