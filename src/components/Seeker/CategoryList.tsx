import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {hp} from '@/utils/responsiveFn';
import ServiceCard from '../common/ServiceCard';

const CategoryList = ({
  data,
  onPress = () => {},
}: {
  data: any[];
  onPress?: (v?: any) => void;
}) => {
  const getProcessedData = () => {
    const itemsPerRow = 3;
    const totalRows = Math.ceil(data.length / itemsPerRow);
    const totalSlotsNeeded = totalRows * itemsPerRow;
    const emptySlots = totalSlotsNeeded - data.length;
    
    const processedData = [...data];
    
    for (let i = 0; i < emptySlots; i++) {
      processedData.push({ isEmpty: true });
    }
    
    return processedData;
  };

  return (
    <FlatList
      numColumns={3}
      data={getProcessedData()}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => {
        if (item.isEmpty) {
          return <View style={styles.emptySlot} />;
        }
        
        return (
          <ServiceCard
            text={item?.title ?? ''}
            source={item?.image ?? ''}
            handleCardPress={() => onPress(item)}
          />
        );
      }}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(25),
    paddingBottom: '20%',
    gap: hp(15),
  },
  columnWrapper: {
    gap: hp(10),
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  emptySlot: {
    flex: 1,
  },
});