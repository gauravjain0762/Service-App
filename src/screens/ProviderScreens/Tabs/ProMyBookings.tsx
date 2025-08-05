import BackHeader from '@/components/common/BackHeader';
import BookingCard from '@/components/Provider/BookingCard';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {getFontSize} from '@/utils/responsiveFn';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

const DATA = [
  {
    id: 'D-698321',
    title: 'Repair & Maintenance',
    subtitle: 'AC Regular Services',
    address: 'Dubai Internet City UAE',
    dateTime: 'Web, 18 Apr - 09:00 - 12:00',
    status: 'Active',
    customer: 'Luis Fernando Salazar',
  },
  {
    id: 'D-698311',
    title: 'Repair & Maintenance',
    subtitle: 'AC Regular Services',
    address: 'Dubai Internet City UAE',
    dateTime: 'Web, 18 Apr - 09:00 - 12:00',
    status: 'Completed',
    customer: 'Luis Fernando Salazar',
  },
  {
    id: 'D-698301',
    title: 'Repair & Maintenance',
    subtitle: 'AC Regular Services',
    address: 'Dubai Internet City UAE',
    dateTime: 'Web, 18 Apr - 09:00 - 12:00',
    status: 'Active',
    customer: 'Luis Fernando Salazar',
  },
];

const ProMyBookings = () => {
  return (
    <SafeAreaView style={GeneralStyle.container}>
      <View style={styles.mainContainer}>
        <BackHeader text="My Bookings" style={GeneralStyle.back} />

        <FlatList
          data={DATA}
          renderItem={({item, index}) => {
            return <BookingCard item={item} index={index} />;
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProMyBookings;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: getFontSize(2),
    paddingTop: getFontSize(2),
    paddingBottom: getFontSize(12),
    gap: getFontSize(1.5),
  },
});
