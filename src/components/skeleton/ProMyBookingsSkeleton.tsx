import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import BackHeader from '@/components/common/BackHeader';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {commonFontStyle, getFontSize, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';

const BookingSkeletonCard = () => {
  return (
    <SkeletonPlaceholder borderRadius={8}>
      <View style={styles.card}>
        {/* Row with icon + text */}
        <View style={styles.row}>
          <View style={styles.icon} />
          <View style={styles.textContainer}>
            <View style={styles.title} />
            <View style={styles.subtitle} />
            <View style={styles.address} />
          </View>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.date} />
          <View style={styles.status} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const ProMyBookingsSkeleton = () => {
  return (
    <View style={GeneralStyle.container}>
      {/* Fake filter bar */}
      <SkeletonPlaceholder borderRadius={8}>
        <View style={styles.searchBar} />
      </SkeletonPlaceholder>

      {/* Skeleton list */}
      <FlatList
        data={Array(6).fill({})}
        renderItem={() => <BookingSkeletonCard />}
        keyExtractor={(_, index) => `skeleton-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default ProMyBookingsSkeleton;

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
  searchBar: {
    width: '85%',
    height: hp(45),
    alignSelf: 'center',
    marginBottom: hp(20),
  },
  card: {
    width: '100%',
    padding: wp(12),
    marginBottom: hp(12),
    backgroundColor: Colors.white,
    borderRadius: wp(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
  },
  textContainer: {
    marginLeft: wp(12),
    flex: 1,
  },
  title: {
    width: '60%',
    height: hp(16),
    marginBottom: hp(6),
  },
  subtitle: {
    width: '40%',
    height: hp(14),
    marginBottom: hp(6),
  },
  address: {
    width: '70%',
    height: hp(14),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(12),
  },
  date: {
    width: '50%',
    height: hp(14),
  },
  status: {
    width: wp(60),
    height: hp(14),
  },
});
