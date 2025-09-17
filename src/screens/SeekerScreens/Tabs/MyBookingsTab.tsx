import React, {useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {IMAGES} from '@/assets/images';
import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import BookingCard from '@/components/common/BookingCard';
import CustomImage from '@/components/common/CustomImage';
import {navigateTo} from '@/components/common/commonFunction';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import {useGetJobsQuery} from '@/api/Seeker/homeApi';
import MyRequestSkeleton from '@/components/skeleton/MyRequestSkeleton';
import CommonText from '@/components/common/CommonText';
import CustomTextInput from '@/components/common/CustomTextInput';
import BottomModal from '@/components/common/BottomModal';
import {rowReverseRTL} from '@/utils/arabicStyles';
import {useAppSelector} from '@/Hooks/hooks';

const MyBookingsTab = () => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allJobData, setAllJobData] = React.useState([]);
  const [selectedOption, setSelectedOption] = useState('All');
  const [allOptions] = useState(['All', 'Active', 'Completed', 'Cancelled']);
  const {
    data: jobData,
    isLoading: jobLoading,
    refetch: refetchJobList,
  } = useGetJobsQuery<any>(
    {status: selectedOption},
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
  const onRefresh = React.useCallback(() => {
    refetchJobList();
  }, []);
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
        containerStyle={{marginVertical: hp(10)}}
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
                  text={`No ${selectedOption} bookings`}
                  style={styles.noData}
                />
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={onRefresh}
                colors={[Colors.seeker_primary]}
                tintColor={Colors.seeker_primary}
              />
            }
          />
        </View>
      )}
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
    </SafeareaProvider>
  );
};

export default MyBookingsTab;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
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
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp(10),
      borderRadius: hp(12),
      backgroundColor: Colors.white,
    },
    paymentInfo: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
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
};
