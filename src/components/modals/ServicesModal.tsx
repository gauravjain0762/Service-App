/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import CommonText from '../common/CommonText';
import ServiceCard from '../common/ServiceCard';
import {navigateTo} from '../common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';
import {Colors} from '@/constants/Colors';
import HomeSkeleton from '../skeleton/HomeSkeleton';
import BottomModal from '../common/BottomModal';

type Props = {
  visible: boolean;
  onClose?: () => void;
  serviceName: string;
  subCategories: any[];
  isSubCatLoading: boolean;
};

const ServicesModal = ({
  serviceName,
  onClose = () => {},
  visible,
  subCategories,
  isSubCatLoading,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  const handleClose = () => {
    onClose();
    setIsModalVisible(false);
  };

  return (
    <BottomModal
      close
      style={{paddingTop: hp(30)}}
      visible={isModalVisible}
      onPressCancel={handleClose}
      onClose={handleClose}>
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
                handleClose();
                setTimeout(() => {
                  navigateTo(SCREENS.MyBookings);
                }, 100);
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
    </BottomModal>
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
