import React from 'react';
import {View, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 16}}>
      <SkeletonPlaceholder borderRadius={10}>
        <SkeletonPlaceholder.Item alignItems="center">
          {/* Top 3 Promo Offers */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent="space-between"
            width="100%">
            {[...Array(3)].map((_, i) => (
              <SkeletonPlaceholder.Item
                key={i}
                width={100}
                height={80}
                borderRadius={12}
              />
            ))}
          </SkeletonPlaceholder.Item>

          {/* Super Deal Banner */}
          <SkeletonPlaceholder.Item
            width="100%"
            height={100}
            marginTop={20}
            borderRadius={12}
          />

          {/* Category Grid */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            marginTop={20}
            width="100%">
            {[...Array(6)].map((_, i) => (
              <SkeletonPlaceholder.Item
                key={i}
                width="30%"
                height={110}
                marginBottom={20}
                borderRadius={16}
              />
            ))}
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item
            width="100%"
            height={100}
            marginTop={20}
            borderRadius={12}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default HomeSkeleton;
