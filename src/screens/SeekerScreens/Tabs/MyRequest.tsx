import React from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import CustomImage from '@/components/common/CustomImage';
import CommonText from '@/components/common/CommonText';
import ShadowCard from '@/components/common/ShadowCard';
import {Colors} from '@/constants/Colors';
import {hp, wp, commonFontStyle} from '@/utils/responsiveFn';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {getLocalizedText, navigateTo} from '@/components/common/commonFunction';
import {SEEKER_SCREENS} from '@/navigation/screenNames';
import {useGetRequestsQuery} from '@/api/Seeker/homeApi';
import {useAppSelector} from '@/Hooks/hooks';
import moment from 'moment';
import MyRequestSkeleton from '@/components/skeleton/MyRequestSkeleton';
import { rightRTL, rowReverseRTL, textRTL } from '@/utils/arabicStyles';

const MyRequest = () => {
  const {language} = useAppSelector(state => state.auth);
    const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allRequestData, setAllRequestData] = React.useState([]);
  const {
    data: requestData,
    isLoading: requestLoading,
    refetch: refetchRequestList,
  } = useGetRequestsQuery<any>(
    {},
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

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

  const handleCardPress = (item: any) => {
    navigateTo(SEEKER_SCREENS.Offers, {request_id: item?._id});
  };

  const onRefresh = React.useCallback(() => {
    refetchRequestList();
  }, []);
  return (
    <SafeareaProvider
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <BackHeader
        text="My Requests"
        style={{
          paddingHorizontal: wp(20),
        }}
      />
      {requestLoading ? (
        <MyRequestSkeleton />
      ) : (
        <View style={styles.cardsContainer}>
          <FlatList
            data={allRequestData}
            renderItem={({item, index}: any) => {
              return (
                <ShadowCard
                  key={index}
                  onCardPress={() => handleCardPress(item)}
                  style={{width: '100%', marginBottom: hp(24)}}>
                  {item?.offer_count != 0 && (
                    <View style={styles.rightIcon}>
                      <CommonText
                        text={`${item?.offer_count}  Offer`}
                        style={styles.offerLabel}
                      />
                    </View>
                  )}
                  <View style={styles.cardContent}>
                    <View style={styles.imageContainer}>
                      <CustomImage
                        uri={item?.category_id?.image}
                        size={hp(50)}
                        containerStyle={styles.serviceImage}
                      />
                    </View>

                    <View style={styles.textContainer}>
                      <CommonText
                        text={getLocalizedText(
                          item?.category_id?.title,
                          item?.category_id?.title_ar,
                          language,
                        )}
                        style={styles.serviceTitle}
                      />
                      <CommonText
                        text={getLocalizedText(
                          item?.sub_category_id?.title,
                          item?.sub_category_id?.title_ar,
                          language,
                        )}
                        style={styles.serviceDescription}
                      />
                      <CommonText
                        text={`${'Booking Ref' + ' ' + '#' + item?.job_code}`}
                        style={[
                          styles.serviceDescription,
                          {color: Colors.seeker_primary},
                        ]}
                      />
                    </View>

                    <View style={styles.dateContainer}>
                      <CommonText
                        text={moment(item.createdAt).format('MMM DD')}
                        style={styles.dateText}
                      />
                    </View>
                  </View>
                </ShadowCard>
              );
            }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item: any) => item?._id?.toString()}
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={[
              styles.scrollContent,
              allRequestData?.length == 0 && {flexGrow: 1},
            ]}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CommonText text={'No Request Yet'} style={styles.noData} />
              </View>
            )}
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
    </SafeareaProvider>
  );
};

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // flexGrow: 1,
    paddingBottom: '20%',
    paddingHorizontal: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flex: 1,
    marginTop: hp(20),
  },
  cardContent: {
    ...rowReverseRTL(_language),
    alignItems: 'center',
    paddingHorizontal: wp(20),
  },
  imageContainer: {
    width: hp(60),
    height: hp(60),
    borderRadius: hp(12),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(10),
  },
  serviceImage: {
    borderRadius: hp(8),
    backgroundColor: '#F6FAFD',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  serviceTitle: {
    ...commonFontStyle(700, 2, Colors.black),
    marginBottom: hp(11),
    ...textRTL(_language)
  },
  serviceDescription: {
    ...commonFontStyle(500, 1.6, Colors._878787),
     ...textRTL(_language)
  },
  dateContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dateText: {
    ...commonFontStyle(500, 1.4, Colors._898989),
  },
  noData: {
    ...commonFontStyle(500, 2.5, Colors.black),
  },
  rightIcon: {
    borderRadius: hp(50),
    paddingVertical: hp(5),
    paddingHorizontal: wp(10),
    backgroundColor: Colors.black,
    position: 'absolute',
    top: 15,
    ...rightRTL(_language,15)
  },
  offerLabel: {
    ...commonFontStyle(600, 1.3, Colors.white),
  },
})}

export default MyRequest;
