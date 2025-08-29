/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {hp, wp} from '@/utils/responsiveFn';

const ProHomeSkeleton = ({isBanner = false}: {isBanner?: boolean}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: wp(20),
        paddingTop: hp(20),
        paddingBottom: hp(40),
      }}>
      <SkeletonPlaceholder borderRadius={8}>
        <View>
          {/* Header / Banner */}
          {isBanner && (
            <SkeletonPlaceholder.Item
              width="100%"
              height={hp(120)}
              borderRadius={12}
              marginBottom={hp(20)}
            />
          )}

          {/* Dashboard Stat Cards */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            marginBottom={hp(30)}>
            {[...Array(4)].map((_, i) => (
              <SkeletonPlaceholder.Item
                key={i}
                width={wp(160)}
                height={hp(90)}
                marginBottom={hp(16)}
                borderRadius={12}
              />
            ))}
          </SkeletonPlaceholder.Item>

          {/* Heading "Recently Booking" */}
          <SkeletonPlaceholder.Item
            width={wp(180)}
            height={hp(24)}
            borderRadius={6}
            marginBottom={hp(20)}
          />

          {/* Booking List Cards */}
          {[...Array(3)].map((_, i) => (
            <SkeletonPlaceholder.Item
              key={i}
              width="100%"
              height={hp(120)}
              borderRadius={12}
              marginBottom={hp(20)}
            />
          ))}
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default ProHomeSkeleton;
