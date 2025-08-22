/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {hp, wp} from '@/utils/responsiveFn';

const JobDetailsSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: wp(24),
        paddingTop: hp(20),
      }}>
      <SkeletonPlaceholder borderRadius={10}>
        <SkeletonPlaceholder.Item>
          {/* Job Card */}
          <SkeletonPlaceholder.Item
            width="100%"
            borderRadius={12}
            padding={wp(16)}
            marginBottom={hp(24)}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              {/* Job Image */}
              <SkeletonPlaceholder.Item
                width={wp(72)}
                height={hp(72)}
                borderRadius={12}
              />

              <SkeletonPlaceholder.Item marginLeft={wp(20)} flex={1}>
                {/* Job Title */}
                <SkeletonPlaceholder.Item
                  width="60%"
                  height={hp(20)}
                  borderRadius={6}
                />
                {/* Sub Title */}
                <SkeletonPlaceholder.Item
                  width="50%"
                  height={hp(16)}
                  borderRadius={6}
                  marginTop={hp(10)}
                />
                {/* Location */}
                <SkeletonPlaceholder.Item
                  width="70%"
                  height={hp(14)}
                  borderRadius={6}
                  marginTop={hp(10)}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>

            {/* Booking Details */}
            <SkeletonPlaceholder.Item marginTop={hp(20)}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={hp(16)}>
                <SkeletonPlaceholder.Item width="40%" height={hp(18)} />
                <SkeletonPlaceholder.Item width="30%" height={hp(18)} />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between">
                <SkeletonPlaceholder.Item width="40%" height={hp(18)} />
                <SkeletonPlaceholder.Item width="30%" height={hp(18)} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>

          {/* Section Title */}
          <SkeletonPlaceholder.Item
            width="50%"
            height={hp(22)}
            borderRadius={6}
            marginBottom={hp(20)}
          />

          {/* Service Provider Card */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            marginBottom={hp(24)}>
            <SkeletonPlaceholder.Item
              width={hp(50)}
              height={hp(50)}
              borderRadius={25}
            />
            <SkeletonPlaceholder.Item marginLeft={wp(16)} flex={1}>
              <SkeletonPlaceholder.Item
                width="70%"
                height={hp(18)}
                borderRadius={6}
              />
              <SkeletonPlaceholder.Item
                width="50%"
                height={hp(14)}
                borderRadius={6}
                marginTop={hp(8)}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>

          {/* Service Details Section */}
          <SkeletonPlaceholder.Item
            width="100%"
            height={hp(120)}
            borderRadius={12}
            marginBottom={hp(24)}
          />

          {/* Bill Summary */}
          <SkeletonPlaceholder.Item
            width="100%"
            height={hp(100)}
            borderRadius={12}
            marginBottom={hp(40)}
          />

          {/* Back to Home Button */}
          <SkeletonPlaceholder.Item
            width="100%"
            height={hp(50)}
            borderRadius={12}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default JobDetailsSkeleton;
