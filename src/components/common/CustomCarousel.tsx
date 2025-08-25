import React, {useRef, useEffect, useState} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

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
  const carouselRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= data.length) {
        nextIndex = 0;
      }
      carouselRef.current?.snapToItem(nextIndex);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const renderItem = ({item,index}:any) => {
    return (
      <View style={styles.imageWrapper}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={item?.id === '2' ? styles.stickyBottomImage : styles.logoImage}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={setActiveIndex}
          loop={true}
          autoplay={false}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          enableMomentum={false}
          lockScrollWhileSnapping={true}
        />
      </View>
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={[styles.pagination, {paddingHorizontal: 0}]}
        dotStyle={{
          width: wp(20),
          height: hp(8),
          borderRadius: hp(4),
          marginHorizontal: wp(-5),
          backgroundColor: Colors.seeker_primary,
        }}
        inactiveDotStyle={{
          width: wp(12),
          marginHorizontal: wp(-5),
          backgroundColor: Colors._DDDDDD,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
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
  imageWrapper: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(370),
  },
  logoImage: {
    width: '100%',
    height: '100%',
    marginTop:100,
  },
  stickyBottomImage: {
    width: '100%',
    height: '100%',
    marginTop:25,
  },
  pagination: {
    marginTop: hp(21),
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
