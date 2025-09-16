import React, {useCallback, useState} from 'react';
import {
  BackHandler,
  FlatList,
  RefreshControl,
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
import HomeSkeleton from '@/components/skeleton/HomeSkeleton';
import ProHomeSkeleton from '@/components/skeleton/ProHomeSkeleton';
import { rowReverseRTL, textRTL } from '@/utils/arabicStyles';

const ProDashboard = () => {
  const {userInfo, dashboard = {},language} = useAppSelector<any>(state => state.auth);
  const {} = useCategoryQuery({});
  const {refetch: profileRefetch} = useGetProfileQuery({});
const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const {isLoading, isFetching, refetch} = useGetDashboardQuery(
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
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    profileRefetch();
    setRefreshing(false);
  }, [refetch]);
  return (
    <SafeareaProvider style={styles.safearea}>
      <ProviderHeader item={{image: userInfo?.logo}} />

      {isLoading ? (
        <ProHomeSkeleton isBanner />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.provider_primary]}
              tintColor={Colors.provider_primary}
            />
          }
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
      )}
    </SafeareaProvider>
  );
};

export default ProDashboard;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  safearea: {
    flex: 1,
    // padding: hp(25),
    backgroundColor: Colors.white,
  },
  dashboardContainer: {
    gap: wp(16),
    flexWrap: 'wrap',
    ...rowReverseRTL(_language),
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
    ...textRTL(_language)
  },
})}
