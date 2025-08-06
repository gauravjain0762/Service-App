import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import CommonText from '@/components/common/CommonText';
import ProviderHeader from '@/components/Provider/ProviderHeader';
import ProviderCards from '@/components/Provider/ProviderCards';
import BookingCard from '@/components/Provider/BookingCard';

const DashboarData = [
  {amount: '4254', desc: 'Total Booking', image: IMAGES.ic_booking},
  {amount: '2678.00', desc: 'Total Earning', image: IMAGES.ic_earning},
  {amount: '1500', desc: 'Total Request', image: IMAGES.ic_request},
  {amount: '900', desc: 'Completed Job', image: IMAGES.ic_completed},
];

const BookingData = [
  {
    id: '#D-698321',
    title: 'Repair & Maintenance',
    subtitle: 'AC Regular Services',
    status: 'Accepted',
    address: 'Dubai Internet City UAE',
    dateTime: 'Web, 18 Apr - 09:00 - 12:00',
    customer: 'Luis Fernando Salazar',
  },
  {
    id: '#D-698321',
    title: 'Repair & Maintenance',
    subtitle: 'AC Regular Services',
    status: 'Accepted',
    address: 'Dubai Internet City UAE',
    dateTime: 'Web, 18 Apr - 09:00 - 12:00',
    customer: 'Luis Fernando Salazar',
  },
];

const ProDashboard = () => {
  return (
    <SafeareaProvider style={styles.safearea}>
      <ProviderHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: hp(25),
        }}
        contentContainerStyle={{paddingBottom: hp(50)}}>
        <View style={styles.dashboardContainer}>
          {DashboarData.map((item, index: any) => {
            return <ProviderCards item={item} index={index} key={index}/>;
          })}
        </View>

        <CommonText text={'Recently Booking'} style={styles.headingText} />

        <FlatList
          data={BookingData}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return <BookingCard item={item} index={index} />;
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      </ScrollView>
    </SafeareaProvider>
  );
};

export default ProDashboard;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    // padding: hp(25),
    backgroundColor: Colors.white,
  },
  dashboardContainer: {
    gap: wp(16),
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: hp(34),
    paddingHorizontal: hp(20),
  },
  contentContainer: {
    gap: hp(20),
    paddingVertical: hp(20),
    paddingHorizontal: hp(20),
  },
  headingText: {
    ...commonFontStyle(700, 2.2, Colors.black),
    paddingHorizontal: hp(20),
  },
});
