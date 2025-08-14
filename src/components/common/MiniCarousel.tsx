import React, {useRef} from 'react';
import {View, Image, Animated, StyleSheet, Dimensions} from 'react-native';

import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';

const {width} = Dimensions.get('window');

const MiniCarousel = ({data = []}: {data: any[]}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image
                source={{uri: item?.image || ''}}
                style={styles.image}
                resizeMode="stretch"
              />
            </View>
          )}
        />
      </View>

      <View style={styles.pagination}>
        {data.length > 0 &&
          data.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [wp(10), wp(10), wp(10)],
              extrapolate: 'clamp',
            });
            const backgroundColor = scrollX.interpolate({
              inputRange,
              outputRange: [
                Colors._DDDDDD,
                Colors.seeker_primary,
                Colors._DDDDDD,
              ],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[styles.dot, {width: dotWidth, backgroundColor}]}
              />
            );
          })}
      </View>
    </View>
  );
};

export default MiniCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    height: hp(140),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: '100%',
    marginHorizontal: wp(5),
    width: width - wp(34) - wp(10),
    borderRadius: hp(20),
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    bottom: 5,
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: hp(8),
    borderRadius: hp(4),
    marginHorizontal: wp(4),
  },
});
