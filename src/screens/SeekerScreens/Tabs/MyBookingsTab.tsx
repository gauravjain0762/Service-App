import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {IMAGES} from '@/assets/images';
import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import BookingCard from '@/components/common/BookingCard';

const MyBookingsTab = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'complete'>('active');

  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader
        text="My Bookings"
        rightIcon={<Image source={IMAGES.search} style={styles.searchIcon} />}
      />

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}>
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'complete' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('complete')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'complete' && styles.activeTabText,
            ]}>
            Complete
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.contentContainer}>
        {activeTab === 'active' ? (
          <Text style={styles.dummyText}>No active bookings</Text>
        ) : (
          <Text style={styles.dummyText}>No completed bookings</Text>
        )}
      </View> */}
      <ScrollView
        contentContainerStyle={{paddingBottom: hp(20)}}
        showsVerticalScrollIndicator={false}
        style={{marginVertical: hp(34)}}>
        <BookingCard />
        <BookingCard />
        <BookingCard />
        <BookingCard />
        <BookingCard />
      </ScrollView>
    </SafeareaProvider>
  );
};

export default MyBookingsTab;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: wp(24),
    backgroundColor: Colors.white,
  },
  searchIcon: {
    width: wp(40),
    height: hp(40),
  },
  tabRow: {
    marginTop: hp(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors._F7F7F7,
    padding: wp(4),
    borderRadius: wp(50),
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(50),
    height: hp(50),
  },
  activeTab: {
    backgroundColor: Colors.seeker_primary,
  },
  tabText: {
    ...commonFontStyle(500, 2, Colors._7D7D7D),
  },
  activeTabText: {
    color: Colors.white,
  },
  contentContainer: {
    marginTop: hp(25),
    alignItems: 'center',
  },
  dummyText: {
    ...commonFontStyle(400, 2.2, Colors._909090),
  },
});
