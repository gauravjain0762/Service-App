import React, {useEffect, useRef} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

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
      isoDate: current.format('YYYY-MM-DD'), // <- add this
    });
    current.add(1, 'day');
  }

  return dates;
};

const dates = generateDates();

type Props = {
  selectedDate?: any;
  setSelectedDate?: (date: any) => void;
  isProvider?: boolean;
};

const CustomDates = ({selectedDate, setSelectedDate, isProvider}: Props) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!selectedDate) {
      const currentDate = moment().format('DDMM');

      setSelectedDate?.(dates.find(d => d.key === currentDate));
    }
  }, [selectedDate, setSelectedDate]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const index = dates.findIndex(d => d.key === selectedDate.key);
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [selectedDate]);

  const isSelected = (item: any) => selectedDate?.key === item.key;

  return (
    <View style={styles.container}>
      <CommonText
        text={'Select Date'}
        style={commonFontStyle(700, 2.2, Colors.black)}
      />

      <View style={styles.listWrapper}>
        <FlatList
          horizontal
          data={dates}
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          renderItem={({item}) => {
            const selected = isSelected(item);
            return (
              <TouchableOpacity
                style={[
                  styles.dateBox,
                  selected && !isProvider && styles.selectedBox,
                  selected && isProvider && styles.providerBox,
                ]}
                onPress={() => {
                  setSelectedDate?.(item);
                  console.log('item', item);
                }}>
                <CommonText
                  style={[styles.month, selected && styles.selectedText]}
                  text={item.month}
                />
                <CommonText
                  style={[styles.day, selected && styles.selectedText]}
                  text={item.day}
                />
                <CommonText
                  style={[styles.weekday, selected && styles.selectedText]}
                  text={item.weekday}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.key}
        />

        {/* <LinearGradient
          colors={[Colors.white, 'rgba(255,255,255,0)']}
          style={styles.leftFade}
          pointerEvents="none"
        /> */}

        {/* <LinearGradient
          colors={['rgba(255,255,255,0)', Colors.white]}
          style={styles.rightFade}
          pointerEvents="none"
        /> */}
      </View>
    </View>
  );
};

export default CustomDates;

const styles = StyleSheet.create({
  container: {
    gap: hp(22),
  },
  listWrapper: {
    position: 'relative',
  },
  flatList: {
    // paddingHorizontal: wp(16),
  },
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
  providerBox: {
    borderColor: Colors.provider_primary,
    backgroundColor: Colors.provider_primary,
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
  leftFade: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: wp(40),
    zIndex: 2,
  },
  rightFade: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: wp(40),
    zIndex: 2,
  },
});
