import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {GeneralStyle} from '@/constants/GeneralStyle';
import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import CustomImage from '@/components/common/CustomImage';
import {IMAGES} from '@/assets/images';
import {commonFontStyle, hp, SCREEN_WIDTH} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import CommonText from '@/components/common/CommonText';
// import AnimatedCircleProgress from '@/components/common/AnimatedCircleProgress';
import LoyaltyCreditTransaction from '@/components/Seeker/LoyaltyCreditTransaction';
import AnimatedCircleProgress from '@/components/common/AnimatedCircleProgress';
import {useGetUserLoyaltyQuery} from '@/api/Seeker/homeApi';
import ProMyBookingsSkeleton from '@/components/skeleton/ProMyBookingsSkeleton';

const LoyaltyCredit = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allLoyaltyData, setAllLoyaltyData] = React.useState([]);
  const {
    data: loyaltyData,
    isLoading,
    refetch,
  } = useGetUserLoyaltyQuery<any>(
    {page: 1},
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  const loyaltyDetails = loyaltyData?.data;
  React.useEffect(() => {
    if (loyaltyData) {
      const newData = loyaltyData?.data?.loyalty_history;
      setAllLoyaltyData(prev =>
        currentPage === 1 ? newData : [...prev, ...newData],
      );
    }
  }, [loyaltyData, currentPage]);

  const handleLoadMore = () => {
    // Check if there are more pages to load
    if (
      loyaltyData &&
      loyaltyData.data?.pagination?.current_page <
        loyaltyData.data?.pagination?.total_pages &&
      !isLoading
    ) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  return (
    <SafeareaProvider>
      <BackHeader text={'Loyalty Credit'} style={GeneralStyle.back} />

      {isLoading ? (
        <ProMyBookingsSkeleton />
      ) : (
        <View style={GeneralStyle.flex}>
          <ImageBackground
            source={IMAGES.loyalty_credit_card}
            style={styles.imageStyle}
            resizeMode="stretch">
            <CommonText text={'Loyalty Credit'} style={styles.headingText} />
            <View style={styles.creditView}>
              <AnimatedCircleProgress
                total={loyaltyDetails?.remaining_orders_for_reward}
                value={loyaltyDetails?.pagination?.total_records}>
                <CustomImage size={hp(40)} source={IMAGES.loyalty_credit} />
              </AnimatedCircleProgress>
              <View>
                <CommonText
                  text={`${loyaltyDetails?.current_loyalty_points}pts`}
                  style={styles.creditPoint}
                />
                <CommonText
                  text={`these points earned in ${loyaltyDetails?.pagination?.total_records} orders`}
                  style={styles.creditText}
                />
              </View>
            </View>
            <View style={styles.cardBgView}>
              <CommonText
                numberOfLines={1}
                text={`After ${loyaltyDetails?.remaining_orders_for_reward} order you have get full loyalty credit`}
                style={styles.cardBottomText}
              />
            </View>
          </ImageBackground>
          <CommonText text="Last Transaction" style={styles.transactionTitle} />
          <FlatList
            data={allLoyaltyData}
            renderItem={({item, index}) => (
              <View key={index} style={styles.transactionItem}>
                <LoyaltyCreditTransaction item={item} />
              </View>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          />
        </View>
      )}
    </SafeareaProvider>
  );
};

export default LoyaltyCredit;

const styles = StyleSheet.create({
  mainContainer: {},
  imageStyle: {
    width: SCREEN_WIDTH - hp(60),
    height: hp(200),
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: hp(20),
    justifyContent: 'space-between',
  },
  cardBgView: {
    backgroundColor: Colors._FBC943,
    width: '100%',
  },
  cardBottomText: {
    ...commonFontStyle(500, 1.6, Colors.black),
    padding: hp(10),
    color: Colors.black,
    textAlign: 'center',
  },
  headingText: {
    ...commonFontStyle(700, 2.8, Colors.white),
    paddingHorizontal: hp(25),
    paddingTop: hp(20),
  },
  creditView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: hp(10),
  },
  creditPoint: {
    ...commonFontStyle(600, 3.6, Colors.white),
  },
  creditText: {
    ...commonFontStyle(400, 1.9, Colors.white),
  },

  transactionTitle: {
    ...commonFontStyle(600, 2.4, Colors._323232),
    paddingHorizontal: hp(20),
    marginTop: hp(15),
  },

  scrollView: {
    marginTop: hp(15),
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: '20%',
  },
  transactionItem: {
    paddingBottom: hp(34),
    paddingHorizontal: hp(20),
  },
});
