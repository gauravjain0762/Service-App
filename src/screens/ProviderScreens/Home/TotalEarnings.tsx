import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

import {GeneralStyle} from '@/constants/GeneralStyle';
import ProviderHeader from '@/components/Provider/ProviderHeader';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import {IMAGES} from '@/assets/images';
import CommonText from '@/components/common/CommonText';
import CustomImage from '@/components/common/CustomImage';
import {SafeAreaView} from 'react-native-safe-area-context';
import TransactionReceipt from '@/components/Provider/TransactionReceipt';
import {goBack} from '@/components/common/commonFunction';
import BackHeader from '@/components/common/BackHeader';

const TotalEarnings = () => {
  return (
    <SafeAreaView edges={[]} style={GeneralStyle.container}>
      <ImageBackground source={IMAGES.earning_bg} style={styles.imageBg}>
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
          <CommonText text="Total Earning" style={styles.totalEarningText} />
          <View style={styles.amountRow}>
            <CustomImage
              size={hp(40)}
              source={IMAGES.currency}
              tintColor={Colors.white}
            />
            <CommonText text="5800,652" style={styles.amountText} />
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

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}>
            {Array.from({length: 7}).map((_, index) => (
              <View key={index} style={styles.transactionItem}>
                <TransactionReceipt />
              </View>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TotalEarnings;

const styles = StyleSheet.create({
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
    flexDirection: 'row',
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
    flexDirection: 'row',
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
    paddingBottom: hp(34),
  },
});
