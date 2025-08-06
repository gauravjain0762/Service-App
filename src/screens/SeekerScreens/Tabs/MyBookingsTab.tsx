import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';

import {IMAGES} from '@/assets/images';
import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import BookingCard from '@/components/common/BookingCard';
import TabSwitch from '@/components/common/TabSwitch';

const MyBookingsTab = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'complete'>('active');

  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader
        text="My Bookings"
        rightIcon={<Image source={IMAGES.search} style={styles.searchIcon} />}
      />

      <TabSwitch
        tabs={['active', 'complete']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

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

  contentContainer: {
    marginTop: hp(25),
    alignItems: 'center',
  },
  dummyText: {
    ...commonFontStyle(400, 2.2, Colors._909090),
  },
});
