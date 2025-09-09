import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

import BackHeader from '@/components/common/BackHeader';
import BookingCard from '@/components/Provider/BookingCard';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {getFontSize} from '@/utils/responsiveFn';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigateTo} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import {useGetRequestsQuery} from '@/api/Provider/homeApi';
import ProMyBookingsSkeleton from '@/components/skeleton/ProMyBookingsSkeleton';
import {useIsFocused} from '@react-navigation/native';

const NewRequestScreen = () => {
  const isFocus = useIsFocused();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allRequestData, setAllRequestData] = React.useState([]);
  const {
    data: requestData,
    isLoading: requestLoading,
    refetch: refetchRequestList,
  } = useGetRequestsQuery(
    {
      page: currentPage,
    },
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );
  React.useEffect(() => {
    if (isFocus) {
      refetchRequestList();
    }
  }, [isFocus]);

  const onRefresh = React.useCallback(() => {
    refetchRequestList();
  }, []);
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
  console.log(requestData, 'requestData');

  return (
    <SafeAreaView style={GeneralStyle.container}>
      <View style={styles.mainContainer}>
        <BackHeader text="New Request" style={GeneralStyle.back} />

        {requestLoading ? (
          <ProMyBookingsSkeleton />
        ) : (
          <FlatList
            data={allRequestData}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            renderItem={({item, index}: any) => {
              return (
                <BookingCard
                  item={item}
                  index={index}
                  isBooking={false}
                  onPress={() => {
                    navigateTo(PROVIDER_SCREENS.ProRequestDetail, {
                      request_id: item?._id,
                    });
                  }}
                  onPressButton={() => {
                    navigateTo(PROVIDER_SCREENS.MakeOffer, {
                      requestDetails: item,
                    });
                  }}
                />
              );
            }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item: any) => item?._id?.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          />
        )}
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
