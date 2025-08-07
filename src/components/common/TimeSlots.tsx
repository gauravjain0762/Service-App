import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

const timeSlots = [
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
];

type Props = {
  isProvider?: boolean;
}

const TimeSlots = ({isProvider}: Props) => {
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <View style={styles.container}>
      <CommonText text={'Select Time Slot'} style={styles.headerText} />
      <FlatList
        data={timeSlots}
        numColumns={3}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          const isLastColumn = (index + 1) % 3 === 0;
          const isSelected = selectedTime === item;
          return (
            <TouchableOpacity
              style={[
                styles.timeContainer,
                isLastColumn && {marginRight: 0},
                isSelected && styles.selectedContainer,
                isProvider && isSelected && styles.selectedContainerProvider,
              ]}
              onPress={() => setSelectedTime(item)}>
              <CommonText
                style={[styles.time, isSelected && styles.selectedTimeText]}
                text={item}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TimeSlots;

const styles = StyleSheet.create({
  container: {
    gap: hp(22),
  },
  headerText: {
    ...commonFontStyle(700, 2.2, Colors.black),
  },
  timeContainer: {
    flexBasis: '30%',
    marginRight: wp(15),
    borderWidth: hp(1),
    borderRadius: hp(25),
    alignItems: 'center',
    marginBottom: hp(18),
    paddingVertical: hp(14),
    justifyContent: 'center',
    borderColor: Colors._F2EDED,
  },
  time: {
    ...commonFontStyle(500, 1.8, Colors.black),
  },
  selectedContainer: {
    backgroundColor: Colors.seeker_primary,
    borderColor: Colors.seeker_primary,
  },
  selectedContainerProvider: {
    borderColor: Colors.provider_primary,
    backgroundColor: Colors.provider_primary,
  },
  selectedTimeText: {
    color: Colors.white,
  },
});
