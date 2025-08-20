import React, {useState, useMemo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

type Props = {
  isProvider?: boolean;
  date?: any;
};

// Function to generate time slots from current time till 12:00 AM
const generateTimeSlots = (date: any) => {
  console.log('date', date);

  const slots: string[] = [];
  const now = date ? new Date(date) : new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  // if minutes > 0, move to next full hour
  if (minutes > 0) {
    hours += 1;
  }

  // keep adding slots until midnight
  while (hours < 24) {
    let displayHours = hours % 12 || 12; // convert to 12hr
    let ampm = hours < 12 ? 'AM' : 'PM';

    slots.push(`${displayHours}:00 ${ampm}`);
    hours += 1;
  }

  return slots;
};
const TimeSlots = ({isProvider, date}: Props) => {
  // console.log('date', date);

  const [selectedTime, setSelectedTime] = useState('');

  // Generate slots only once
  const timeSlots = useMemo(() => generateTimeSlots(date), [date]);

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
