import {Colors} from '@/constants/Colors';
import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import CustomImage from '../common/CustomImage';
import {IMAGES} from '@/assets/images';
import {commonFontStyle, getFontSize, hp} from '@/utils/responsiveFn';

const StepTracker = ({trackingData}: any) => {
  const lastDoneIndex = trackingData
    ? trackingData.map((i: any) => i.is_done).lastIndexOf(true)
    : -1;

  const renderItem = ({item, index}: any) => {
    const isDone = item.is_done === true;
    const lineColor =
      index <= lastDoneIndex ? Colors.seeker_primary : Colors._898989;

    return (
      <View style={styles.row}>
        {index !== trackingData.length - 1 && (
          <View style={[styles.line, {backgroundColor: lineColor}]} />
        )}

        <View
          style={[
            styles.circle,
            isDone ? styles.circleDone : styles.circlePending,
          ]}>
          <CustomImage
            source={IMAGES.checked}
            size={hp(20)}
            tintColor={Colors.white}
          />
        </View>

        <View style={styles.rightCol}>
          <Text style={[styles.title, isDone && styles.titleSelected]}>
            {item?.status}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {trackingData?.map((item: any, index: any) => (
        <View key={item?.status + index.toString()}>
          {renderItem({item, index})}
        </View>
      ))}
    </View>
  );
};

export default StepTracker;

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(25),
    gap: hp(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(10),
    position: 'relative',
  },
  line: {
    width: 3,
    height: '100%',
    position: 'absolute',
    left: hp(12),
    top: hp(26),
    zIndex: -1,
  },
  circle: {
    width: hp(26),
    height: hp(26),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleDone: {
    backgroundColor: Colors.seeker_primary,
  },
  circlePending: {
    backgroundColor: Colors._898989,
  },
  rightCol: {
    flex: 1,
    gap: 5,
  },
  title: {
    ...commonFontStyle(500, 2, Colors._898989),
    textTransform: 'capitalize',
  },
  titleSelected: {
    ...commonFontStyle(500, 2, Colors.seeker_primary),
  },
});
