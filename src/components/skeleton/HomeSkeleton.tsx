/* eslint-disable react-native/no-inline-styles */
import {hp} from '@/utils/responsiveFn';
import React from 'react';
import {ScrollView, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeSkeleton = ({
  isBanner = false,
  list,
}: {
  isBanner?: boolean;
  list?: any;
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignSelf: 'center',
      }}>
      <SkeletonPlaceholder borderRadius={8}>
        <View
          style={{
            width: '100%',
            height: hp(55),
            alignSelf: 'center',
            marginBottom: hp(20),
          }}
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={10}>
        <SkeletonPlaceholder.Item alignItems="center">
          {isBanner && (
            <SkeletonPlaceholder.Item
              width="100%"
              height={150}
              borderRadius={12}
            />
          )}
          {/* Category Grid */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            marginTop={20}
            width="100%">
            {[...Array(list || 12)].map((_, i) => (
              <SkeletonPlaceholder.Item
                key={i}
                width={hp(110)}
                height={hp(90)}
                marginBottom={20}
                borderRadius={16}
              />
            ))}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default HomeSkeleton;
