import React, {useRef} from 'react';
import {View, Image, Animated, StyleSheet, Dimensions} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';

const {width} = Dimensions.get('window');

const data = [
  {id: '1', image: IMAGES.Welcome_bg1},
  {id: '2', image: IMAGES.Welcome_bg2},
  {id: '3', image: IMAGES.Welcome_bg1},
];

const CustomCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Animated.FlatList
            data={data}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            renderItem={({item, index}) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={
                    index === 1 ? styles.stickyBottomImage : styles.logoImage
                  }
                />
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.pagination}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [wp(10), wp(20), wp(10)],
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
    </>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderBottomLeftRadius: hp(35),
    borderBottomRightRadius: hp(35),
    backgroundColor: Colors.seeker_primary,
  },
  topSection: {
    height: hp(370),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '70%',
    height: '70%',
  },
  pagination: {
    marginTop: hp(21),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: hp(8),
    borderRadius: hp(4),
    marginHorizontal: wp(4),
    backgroundColor: Colors.seeker_primary,
  },
  stickyBottomImage: {
    bottom: '-3%',
    width: '100%',
    height: '80%',
    position: 'absolute',
  },
});
