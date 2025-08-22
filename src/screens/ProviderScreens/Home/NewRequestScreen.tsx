import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import BackHeader from '@/components/common/BackHeader';
import BookingCard from '@/components/Provider/BookingCard';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {getFontSize} from '@/utils/responsiveFn';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigateTo} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import {useGetRequestsQuery} from '@/api/Provider/homeApi';

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

const NewRequestScreen = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
  const [allRequestData, setAllRequestData] = React.useState([]);
  const {
    data: requestData,
    isLoading: requestLoading,
    refetch: refetchRequestList,
  } = useGetRequestsQuery<any>({
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  React.useEffect(() => {
    if (requestData) {
      const newData = requestData.data.requests;
      setAllRequestData(prev =>
        currentPage === 1 ? newData : [...prev, ...newData],
      );
    }
  }, [requestData, currentPage]);

  const handleLoadMore = () => {
    // Check if there are more pages to load
    if (
      requestData &&
      requestData.data?.pagination?.current_page <
        requestData.data?.pagination?.total_pages &&
      !requestLoading
    ) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };
  
  return (
    <SafeAreaView style={GeneralStyle.container}>
      <View style={styles.mainContainer}>
        <BackHeader text="New Request" style={GeneralStyle.back} />

        <FlatList
          data={allRequestData}
          renderItem={({item, index}:any) => {
            return (
              <BookingCard
                item={item}
                index={index}
                isBooking={false}
                onPress={() => {
                  navigateTo(PROVIDER_SCREENS.ProRequestDetail,{request_id:item?._id});
                }}
                onPressButton={() => {
                  navigateTo(PROVIDER_SCREENS.MakeOffer,{requestDetails:item});
                }}
              />
            );
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          keyExtractor={(item:any) => item?._id?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewRequestScreen;

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
