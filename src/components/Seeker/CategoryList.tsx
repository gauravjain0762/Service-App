import {FlatList, StyleSheet} from 'react-native';
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
  return (
    <FlatList
      numColumns={3}
      data={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      columnWrapperStyle={{
        gap: hp(10),
      }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => {
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
});
