import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {hp} from '@/utils/responsiveFn';
import ServiceCard from '../common/ServiceCard';
import {useAppSelector} from '@/Hooks/hooks';
import { rowReverseRTL } from '@/utils/arabicStyles';
import { getLocalizedText } from '../common/commonFunction';

const CategoryList = ({
  data,
  onPress = () => {},
}: {
  data: any[];
  onPress?: (v?: any) => void;
}) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const getProcessedData = () => {
    const itemsPerRow = 3;
    const totalRows = Math.ceil(data.length / itemsPerRow);
    const totalSlotsNeeded = totalRows * itemsPerRow;
    const emptySlots = totalSlotsNeeded - data.length;

    const processedData = [...data];

    for (let i = 0; i < emptySlots; i++) {
      processedData.push({isEmpty: true});
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
      // inverted={language === 'ar'}
      renderItem={({item}) => {
        if (item.isEmpty) {
          return <View style={styles.emptySlot} />;
        }

        return (
          <ServiceCard
            text={getLocalizedText(item?.title,item?.title_ar,language) ?? ''}
            source={item?.image ?? ''}
            handleCardPress={() => onPress(item)}
          />
        );
      }}
    />
  );
};

export default CategoryList;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      marginTop: hp(25),
      paddingBottom: '20%',
      gap: hp(15),
    },
    columnWrapper: {
      gap: hp(10),
      ...rowReverseRTL(_language),
      justifyContent: 'flex-start',
      paddingHorizontal: 0,
    },
    emptySlot: {
      flex: 1,
    },
  });
};
