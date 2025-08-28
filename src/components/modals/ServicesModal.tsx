import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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
  subCategories: any[];
  isSubCatLoading: boolean;
  selectedCategory?: any;
};

const ServicesModal = ({
  onClose = () => {},
  visible,
  subCategories,
  isSubCatLoading,
  selectedCategory,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  const handleClose = () => {
    onClose();
    setIsModalVisible(false);
  };

  const getProcessedData = () => {
    if (!subCategories || subCategories.length === 0) return [];

    const itemsPerRow = 3;
    const totalRows = Math.ceil(subCategories.length / itemsPerRow);
    const totalSlotsNeeded = totalRows * itemsPerRow;
    const emptySlots = totalSlotsNeeded - subCategories.length;

    const processedData = [...subCategories];

    for (let i = 0; i < emptySlots; i++) {
      processedData.push({isEmpty: true});
    }

    return processedData;
  };

  return (
    <BottomModal
      close
      style={{paddingTop: hp(30), maxHeight: '85%'}}
      visible={isModalVisible}
      onPressCancel={handleClose}
      onClose={handleClose}>
      <CommonText text={selectedCategory?.title || ''} />
      {isSubCatLoading ? (
        <HomeSkeleton list={6} />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={{marginTop: hp(35)}}
          columnWrapperStyle={styles.columnWrapper}
          data={getProcessedData()}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            if (item.isEmpty) {
              return <View style={styles.emptySlot} />;
            }
            return (
              <ServiceCard
                source={item?.image ?? ''}
                handleCardPress={() => {
                  handleClose();
                  setTimeout(() => {
                    navigateTo(SCREENS.MyBookings, {
                      ...item,
                      category_name: selectedCategory?.title || '',
                      category_id: selectedCategory?._id || '',
                      category_image: selectedCategory?.image || '',
                    });
                  }, 100);
                }}
                text={item?.title || 'Handyman Services'}
                containerStyle={styles.containerStyle}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
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
  columnWrapper: {
    columnGap: wp(13),
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  emptySlot: {
    flex: 1,
    marginBottom: hp(13),
  },
});
