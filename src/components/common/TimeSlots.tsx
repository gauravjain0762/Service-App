/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import moment from 'moment';
import {useAppSelector} from '@/Hooks/hooks';
import {rowReverseRTL, textRTL} from '@/utils/arabicStyles';

type Props = {
  isProvider?: boolean;
  date?: any;
  selectedTime?: any;
  setSelectedTime?: any;
};

// Function to generate time slots from current time till 12:00 AM
const generateTimeSlots = (dateString: string) => {
  const slots: string[] = [];
  const selectedDate = moment(dateString);
  const now = moment();

  let hours = 0;

  // If selected date is today, start from current hour
  if (selectedDate.isSame(now, 'day')) {
    hours = now.hour();
    if (now.minute() > 0) {
      hours += 1; // move to next hour if minutes already passed
    }
  }

  // Generate time slots from the calculated start hour till end of day
  while (hours < 24) {
    let displayHours = hours % 12 || 12; // convert to 12hr
    let ampm = hours < 12 ? 'AM' : 'PM';

    slots.push(`${displayHours}:00 ${ampm}`);
    hours += 1;
  }

  return slots;
};

const TimeSlots = ({
  isProvider,
  date,
  selectedTime,
  setSelectedTime,
}: Props) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const timeSlots = useMemo(() => {
    if (!date) return [];
    return generateTimeSlots(date);
  }, [date]);

  // Reset selectedTime if it's no longer available in the current timeSlots
  useEffect(() => {
    if (
      selectedTime &&
      timeSlots.length > 0 &&
      !timeSlots.includes(selectedTime)
    ) {
      setSelectedTime?.('');
    }
  }, [timeSlots, selectedTime, setSelectedTime]);

  if (!date) {
    return null; // Don't render anything if no date is selected
  }

  return (
    <View style={styles.container}>
      <CommonText text={'Select Time Slot'} style={styles.headerText}>
        <CommonText text={' *'} style={[styles.headerText,{color:Colors.red}]} />
      </CommonText>
      <FlatList
        data={timeSlots}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={{...rowReverseRTL(language)}}
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

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      gap: hp(22),
    },
    headerText: {
      ...commonFontStyle(700, 2.2, Colors.black),
      ...textRTL(_language),
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
};
