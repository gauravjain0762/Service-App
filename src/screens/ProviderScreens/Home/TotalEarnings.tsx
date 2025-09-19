import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {GeneralStyle} from '@/constants/GeneralStyle';
import ProviderHeader from '@/components/Provider/ProviderHeader';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import {IMAGES} from '@/assets/images';
import CommonText from '@/components/common/CommonText';
import CustomImage from '@/components/common/CustomImage';
import {SafeAreaView} from 'react-native-safe-area-context';
import TransactionReceipt from '@/components/Provider/TransactionReceipt';
import {formatPriceIN, goBack} from '@/components/common/commonFunction';
import BackHeader from '@/components/common/BackHeader';
import {useAppSelector} from '@/Hooks/hooks';
import {rowReverseRTL} from '@/utils/arabicStyles';
import {useGetEarningsQuery} from '@/api/Provider/homeApi';
import ProMyBookingsSkeleton from '@/components/skeleton/ProMyBookingsSkeleton';

const TotalEarnings = () => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [allEarnings, setAllEarnings] = React.useState([]);

  const {
    data: earnings,
    isLoading: earningLoading,
    refetch: refetchEarningList,
  } = useGetEarningsQuery<any>(
    {page: currentPage},
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  React.useEffect(() => {
    if (earnings) {
      const newData = earnings.data.latest_transactions;
      setAllEarnings(prev =>
        currentPage === 1 ? newData : [...prev, ...newData],
      );
    }
  }, [earnings, currentPage]);

  const handleLoadMore = () => {
    // Check if there are more pages to load
    if (
      earnings &&
      earnings.data?.pagination?.current_page <
        earnings.data?.pagination?.total_pages &&
      !earningLoading
    ) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };
  return (
    <SafeAreaView edges={[]} style={GeneralStyle.container}>
      <ImageBackground source={IMAGES.earning_bg} style={styles.imageBg}>
        {earningLoading ? (
          <ProMyBookingsSkeleton />
        ) : (
          <>
            {/* <ProviderHeader
          size={hp(20)}
          isBell={false}
          onPressProfile={() => goBack()}
          titleStyle={styles.headerTitle}
          subtitleStyle={styles.headerSubtitle}
          avatarContainerStyle={styles.avatarContainer}
        /> */}
            <BackHeader
              tintColor={Colors.white}
              style={{paddingHorizontal: wp(24)}}
            />

            <View style={styles.centerContent}>
              <CommonText
                text="Total Earning"
                style={styles.totalEarningText}
              />
              <View style={styles.amountRow}>
                <CustomImage
                  size={hp(40)}
                  source={IMAGES.currency}
                  tintColor={Colors.white}
                />
                <CommonText
                  text={formatPriceIN(earnings?.data?.total_earnings)}
                  style={styles.amountText}
                />
              </View>
            </View>

            <View style={styles.whiteBottomContainer}>
              <View style={styles.transactionHeader}>
                <CommonText
                  text="Last Transaction"
                  style={styles.transactionTitle}
                />
                {/* <CommonText text="See all" style={styles.seeAllText} /> */}
              </View>
              <FlatList
                data={allEarnings}
                keyExtractor={item => item?._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.transactionItem}
                renderItem={({item}) => <TransactionReceipt item={item} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
              />
            </View>
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TotalEarnings;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    imageBg: {
      flex: 1,
      paddingTop: '10%',
    },
    headerTitle: {
      ...commonFontStyle(600, 2, Colors.white),
    },
    headerSubtitle: {
      ...commonFontStyle(400, 1.7, Colors.white),
    },
    avatarContainer: {
      width: wp(45),
      height: hp(45),
      borderRadius: hp(12),
    },
    centerContent: {
      alignItems: 'center',
      marginTop: hp(28),
      marginBottom: hp(20),
      gap: hp(15),
    },
    totalEarningText: {
      ...commonFontStyle(500, 2.5, Colors.white),
    },
    amountRow: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      gap: wp(11),
    },
    amountText: {
      ...commonFontStyle(700, 4.2, Colors.white),
    },
    whiteBottomContainer: {
      flex: 1,
      paddingLeft: wp(32),
      paddingRight: wp(17),
      paddingVertical: hp(35),
      borderTopLeftRadius: hp(60),
      borderTopRightRadius: hp(60),
      backgroundColor: Colors.white,
    },
    transactionHeader: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    transactionTitle: {
      ...commonFontStyle(600, 2.4, Colors._323232),
    },
    seeAllText: {
      ...commonFontStyle(500, 2, Colors.provider_primary),
    },
    scrollView: {
      marginTop: hp(38),
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: '20%',
    },
    transactionItem: {
      marginTop: hp(38),
      paddingBottom: hp(34),
    },
  });
};
