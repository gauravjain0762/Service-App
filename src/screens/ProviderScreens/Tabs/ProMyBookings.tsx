import {useGetJobsQuery} from '@/api/Provider/homeApi';
import {IMAGES} from '@/assets/images';
import BackHeader from '@/components/common/BackHeader';
import BottomModal from '@/components/common/BottomModal';
import {navigateTo} from '@/components/common/commonFunction';
import CommonText from '@/components/common/CommonText';
import CustomImage from '@/components/common/CustomImage';
import CustomTextInput from '@/components/common/CustomTextInput';
import BookingCard from '@/components/Provider/BookingCard';
import ProMyBookingsSkeleton from '@/components/skeleton/ProMyBookingsSkeleton';
import {Colors} from '@/constants/Colors';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {PROVIDER_SCREENS} from '@/navigation/screenNames';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const DATA = [
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
  const {params} = useRoute<any>();
  const status = params?.status as {status: undefined | string}['status'];
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const [allOptions] = useState(['All', 'Active', 'Completed', 'Cancelled']);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allJobData, setAllJobData] = React.useState([]);
  const {
    data: jobData,
    isLoading: jobLoading,
    refetch: refetchJobList,
  } = useGetJobsQuery<any>(
    {status: params?.status === 'Completed' ? 'Completed' : selectedOption},
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

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
  }, [selectedOption]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={GeneralStyle.container}>
      <View style={styles.mainContainer}>
        <BackHeader text={'My Bookings'} style={GeneralStyle.back} />
        {jobLoading ? (
          <ProMyBookingsSkeleton />
        ) : (
          <>
            {params?.status !== 'Completed' && (
              <CustomTextInput
                editable={false}
                placeholder={selectedOption}
                onPressSearchBar={() => {
                  setIsModalVisible(true);
                }}
                onPressIn={() => {
                  setIsModalVisible(true);
                }}
                onPress={() => {
                  setIsModalVisible(true);
                }}
                containerStyle={{marginHorizontal: wp(32)}}
                rightIcon={
                  <CustomImage
                    source={IMAGES.downArrow}
                    onPress={() => {
                      setIsModalVisible(true);
                    }}
                    size={hp(25)}
                  />
                }
              />
            )}

            <FlatList
              data={allJobData}
              renderItem={({item, index}: any) => {
                return (
                  <BookingCard
                    item={item}
                    index={index}
                    isBooking={true}
                    onPress={() => {
                      navigateTo(PROVIDER_SCREENS.ProOfferDetails, {
                        job_id: item?._id,
                      });
                    }}
                  />
                );
              }}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              keyExtractor={(item: any) => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
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
          </>
        )}
      </View>
      <BottomModal
        close
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onPressCancel={() => setIsModalVisible(false)}
        style={styles.modalContainer}>
        <View style={styles.paymentContainer}>
          {allOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.paymentOption}
              onPress={() => handleOptionSelect(option)}>
              <CommonText text={option} style={styles.paymentText} />
              <View
                style={[
                  styles.radioButton,
                  selectedOption === option && styles.radioButtonSelected,
                ]}>
                {selectedOption === option && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </BottomModal>
    </SafeAreaView>
  );
};

export default ProMyBookings;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: getFontSize(2),
    paddingTop: getFontSize(2),
    paddingBottom: getFontSize(12),
    gap: getFontSize(1.5),
  },
  modalContainer: {
    paddingTop: hp(30),
    paddingBottom: hp(40),
    paddingHorizontal: wp(20),
    position: 'relative',
  },
  title: {
    ...commonFontStyle(700, 2.2, Colors.black),
    textAlign: 'left',
    marginBottom: hp(25),
    marginTop: hp(10),
    marginLeft: wp(5),
  },
  paymentContainer: {
    gap: hp(23),
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
    borderRadius: hp(12),
    backgroundColor: Colors.white,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCard: {
    width: wp(32),
    height: hp(22),
    resizeMode: 'contain',
  },
  iconApple: {
    width: wp(28),
    height: hp(28),
    resizeMode: 'contain',
  },
  iconCash: {
    width: wp(28),
    height: hp(28),
    resizeMode: 'contain',
  },
  paymentText: {
    ...commonFontStyle(500, 2.0, Colors.black),
  },
  radioButton: {
    width: wp(25),
    height: hp(25),
    borderRadius: wp(100),
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#000000',
  },
  radioButtonInner: {
    width: wp(12),
    height: hp(12),
    borderRadius: wp(100),
    backgroundColor: Colors.black,
  },
});
