/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import ServiceCard from '../common/ServiceCard';
import {navigateTo} from '../common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';
import {Colors} from '@/constants/Colors';
import HomeSkeleton from '../skeleton/HomeSkeleton';

type Props = {
  serviceName: string;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  subCategories: any[];
  isSubCatLoading: boolean;
};

const ServicesModal = ({
  serviceName,
  setIsModalVisible,
  subCategories,
  isSubCatLoading,
}: Props) => {
  return (
    <View>
      <CommonText text={serviceName} />
      {isSubCatLoading ? (
        <HomeSkeleton list={6} />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={{marginTop: hp(35)}}
          columnWrapperStyle={{
            columnGap: wp(13),
            justifyContent: 'space-between',
          }}
          data={subCategories || []}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <ServiceCard
              source={item?.image ?? ''}
              handleCardPress={() => {
                setIsModalVisible(false);
                navigateTo(SCREENS.MyBookings);
              }}
              text={item?.title || 'Handyman Services'}
              containerStyle={styles.containerStyle}
            />
          )}
          ListEmptyComponent={
            <CommonText text={'No Service Found'} style={styles.emptyText} />
          }
        />
      )}
    </View>
  );
};

export default ServicesModal;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginBottom: hp(13),
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: hp(20),
    ...commonFontStyle(700, 2.5, Colors.black),
  },
});
