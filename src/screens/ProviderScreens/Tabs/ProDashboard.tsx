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
import {navigateTo} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import {useGetDashboardQuery} from '@/api/Provider/homeApi';
import {useAppSelector} from '@/Hooks/hooks';
import {useCategoryQuery} from '@/api/Provider/authApi';

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
  const {userInfo, dashboard = {}} = useAppSelector<any>(state => state.auth);
  const {} = useCategoryQuery({});

  const {isLoading} = useGetDashboardQuery({});

  const DashboarData = [
    {
      amount: dashboard?.stats ? String(dashboard?.stats?.total_bookings) : '0',
      desc: 'Total Booking',
      image: IMAGES.ic_booking,
    },
    {
      amount: dashboard?.stats ? String(dashboard?.stats?.total_earnings) : '0',
      desc: 'Total Earning',
      image: IMAGES.ic_earning,
    },
    {
      amount: dashboard?.stats ? dashboard?.stats?.total_jobs.toString() : '0',
      desc: 'Total Request',
      image: IMAGES.ic_request,
    },
    {
      amount: dashboard?.stats
        ? dashboard?.stats?.total_requests.toString()
        : '0',
      desc: 'Completed Job',
      image: IMAGES.ic_completed,
    },
  ];
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
            return <ProviderCards item={item} index={index} key={index} />;
          })}
        </View>

        <CommonText text={'Recently Booking'} style={styles.headingText} />

        <FlatList
          data={dashboard?.recent_bookings || []}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <BookingCard
                item={item}
                index={index}
                onPress={() => {
                  navigateTo(PROVIDER_SCREENS.ProOfferDetails, {
                    job_id: item?._id,
                  });
                }}
              />
            );
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
