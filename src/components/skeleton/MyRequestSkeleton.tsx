/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {hp, wp} from '@/utils/responsiveFn';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ShadowCard from '../common/ShadowCard';

const MyRequestSkeleton = ({count = 6}: {count?: number}) => {
  const renderItem = ({index}: {index: number}) => (
    <SkeletonPlaceholder key={index} borderRadius={10}>
      <ShadowCard key={index} style={{width: '100%', marginBottom: hp(24)}}>
        <View style={styles.card}>
          {/* Left: Image */}
          <View style={styles.imageBox} />

          {/* Middle: Texts */}
          <View style={styles.textBox}>
            <View style={styles.titleLine} />
            <View style={styles.subtitleLine} />
          </View>

          {/* Right: Date */}
          <View style={styles.dateBox}>
            <View style={styles.dateLine} />
          </View>
        </View>
      </ShadowCard>
    </SkeletonPlaceholder>
  );

  return (
    <FlatList
      data={Array.from({length: count})}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
    paddingBottom: hp(40),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(24),
    paddingHorizontal: wp(20),
    paddingVertical: hp(16),
    borderRadius: hp(12),
    backgroundColor: Colors.white,
  },
  imageBox: {
    width: hp(60),
    height: hp(60),
    borderRadius: hp(12),
    marginRight: wp(10),
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
  },
  titleLine: {
    width: wp(120),
    height: hp(14),
    marginBottom: hp(10),
  },
  subtitleLine: {
    width: wp(100),
    height: hp(12),
  },
  dateBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dateLine: {
    width: wp(40),
    height: hp(12),
  },
});

export default MyRequestSkeleton;
