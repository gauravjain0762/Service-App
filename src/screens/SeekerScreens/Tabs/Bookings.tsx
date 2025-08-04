import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import CustomImage from '@/components/common/CustomImage';
import CommonText from '@/components/common/CommonText';
import ShadowCard from '@/components/common/ShadowCard';
import { IMAGES } from '@/assets/images';
import { Colors } from '@/constants/Colors';
import { hp, wp, getFontSize, commonFontStyle } from '@/utils/responsiveFn';
import { GeneralStyle } from '@/constants/GeneralStyle';

const Bookings = () => {
  const serviceRequests = [
    {
      id: 1,
      title: 'Repair & Maintenance',
      description: 'AC Regular Services',
      date: 'Jan 15',
      image: IMAGES.acrepair,
    },
    {
      id: 2,
      title: 'Leak Repairs',
      description: 'Kitchen Sink Pipe leak',
      date: 'Jan 15',
      image: IMAGES.taprepair,
    },
    {
      id: 3,
      title: 'Car Services',
      description: 'Change car tyre',
      date: 'Jan 15',
      image: IMAGES.carrepair,
    },
    {
      id: 4,
      title: 'Pet Services',
      description: 'Dog Talking Bath',
      date: 'Jan 15',
      image: IMAGES.petService,
    },
    {
      id: 5,
      title: 'Repair & Maintenance',
      description: 'AC Regular Services',
      date: 'Jan 15',
      image: IMAGES.acrepair,
    },
    {
      id: 6,
      title: 'Repair & Maintenance',
      description: 'AC Regular Services',
      date: 'Jan 15',
      image: IMAGES.acrepair,
    },
  ];

  const handleCardPress = (item: any) => {
    console.log('Card pressed:', item.title);
  };

  return (
    <View style={GeneralStyle.container}>
      <BackHeader text="My Request" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        alwaysBounceVertical={false}
        decelerationRate="normal"
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
      >
        <View style={styles.cardsContainer}>
          {serviceRequests.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handleCardPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.imageContainer}>
                  <CustomImage
                    source={item.image}
                    size={hp(50)}
                    containerStyle={styles.serviceImage}
                  />
                </View>
                
                <View style={styles.textContainer}>
                  <CommonText 
                    text={item.title} 
                    style={styles.serviceTitle} 
                  />
                  <CommonText 
                    text={item.description} 
                    style={styles.serviceDescription} 
                  />
                </View>
                
                <View style={styles.dateContainer}>
                  <CommonText 
                    text={item.date} 
                    style={styles.dateText} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(100),
  },
  cardsContainer: {
    marginHorizontal: wp(16),
    marginTop: hp(20),
  },
  card: {
    marginBottom: hp(10),
    backgroundColor: Colors._F9F9F9,
    borderRadius: hp(16),
    paddingVertical: hp(12),
    paddingHorizontal: wp(14),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: hp(60),
    height: hp(60),
    borderRadius: hp(12),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(10),
  },
  serviceImage: {
    borderRadius: hp(8),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  serviceTitle: {
    ...commonFontStyle(700, 2, Colors.black),
    marginBottom: hp(3),
  },
  serviceDescription: {
    ...commonFontStyle(500, 1.6, Colors._878787),
  },
  dateContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dateText: {
    ...commonFontStyle(500, 1.4, Colors._898989),
  },
});

export default Bookings;
