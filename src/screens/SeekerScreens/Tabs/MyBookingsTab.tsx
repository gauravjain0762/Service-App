import React, {useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';

import {IMAGES} from '@/assets/images';
import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import BookingCard from '@/components/common/BookingCard';
import TabSwitch from '@/components/common/TabSwitch';
import CustomImage from '@/components/common/CustomImage';
import {navigateTo} from '@/components/common/commonFunction';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import {useGetJobsQuery} from '@/api/Seeker/homeApi';
import MyRequestSkeleton from '@/components/skeleton/MyRequestSkeleton';
import CommonText from '@/components/common/CommonText';

const MyBookingsTab = () => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Complete'>('Active');

  const [currentPage, setCurrentPage] = React.useState(1);
  const [allJobData, setAllJobData] = React.useState([]);
  const {
    data: jobData,
    isLoading: jobLoading,
    refetch: refetchJobList,
  } = useGetJobsQuery<any>(
    {status: activeTab == 'Active' ? 'Active' : 'Completed'},
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );
  console.log(jobData, 'jobDatajobDatajobDatajobData');

  React.useEffect(() => {
    if (jobData) {
      const newData = jobData.data.jobs;
      setAllJobData(prev =>
        currentPage === 1 ? newData : [...prev, ...newData],
      );
    }
  }, [jobData, currentPage]);

  const handleLoadMore = () => {
    // Check if there are more pages to load
    if (
      jobData &&
      jobData.data?.pagination?.current_page <
        jobData.data?.pagination?.total_pages &&
      !jobLoading
    ) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };
  React.useEffect(() => {
    refetchJobList();
  }, [activeTab]);

  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader
        text="My Bookings"
        rightIcon={
          <CustomImage
            source={IMAGES.search}
            size={hp(40)}
            onPress={() => navigateTo(SEEKER_SCREENS.SearchScreen)}
          />
        }
      />

      <TabSwitch
        tabs={['Active', 'Complete']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {jobLoading ? (
        <MyRequestSkeleton />
      ) : (
        <View style={styles.cardsContainer}>
          <FlatList
            data={allJobData}
            renderItem={({item, index}: any) => {
              return <BookingCard item={item} />;
            }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item: any) => item?._id?.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              allJobData?.length == 0 && {flexGrow: 1},
            ]}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CommonText
                  text={
                    activeTab === 'Active'
                      ? 'No active bookings'
                      : 'No completed bookings'
                  }
                  style={styles.noData}
                />
              </View>
            }
          />
        </View>
      )}
    </SafeareaProvider>
  );
};

export default MyBookingsTab;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: wp(24),
    backgroundColor: Colors.white,
  },
  searchIcon: {
    width: wp(40),
    height: hp(40),
  },

  contentContainer: {
    marginTop: hp(25),
    alignItems: 'center',
  },
  dummyText: {
    ...commonFontStyle(400, 2.2, Colors._909090),
  },
  cardsContainer: {
    flex: 1,
    marginTop: hp(20),
  },
  scrollContent: {
    paddingBottom: '20%',
  },
  noData: {
    ...commonFontStyle(500, 2.5, Colors.black),
  },
});
