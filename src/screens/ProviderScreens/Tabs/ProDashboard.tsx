import React from 'react';
import {
  BackHandler,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
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
import ProvidersVerifyModal from '@/components/modals/ProvidersVerifyModal';
import {useGetProfileQuery} from '@/api/Provider/profileApi';

const ProDashboard = () => {
  const {userInfo, dashboard = {}} = useAppSelector<any>(state => state.auth);
  const {} = useCategoryQuery({});
  const {} = useGetProfileQuery({});

  const {isLoading} = useGetDashboardQuery(
    {},
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

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
      amount: dashboard?.stats
        ? dashboard?.stats?.total_requests.toString()
        : '0',
      desc: 'Total Request',
      image: IMAGES.ic_request,
    },
    {
      amount: dashboard?.stats ? dashboard?.stats?.total_jobs.toString() : '0',
      desc: 'Completed Job',
      image: IMAGES.ic_completed,
    },
  ];
  return (
    <SafeareaProvider style={styles.safearea}>
      <ProviderHeader item={{image: userInfo?.logo}} />

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
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: getFontSize(15),
              }}>
              <CommonText
                text="No recent bookings"
                style={{
                  textAlign: 'center',
                  ...commonFontStyle(500, 2, Colors._898989),
                }}
              />
            </View>
          )}
        />
        <ProvidersVerifyModal
          visible={userInfo?.approval_status != 'Approved'}
          onPressClose={() => {
            // BackHandler.exitApp();
          }}
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
