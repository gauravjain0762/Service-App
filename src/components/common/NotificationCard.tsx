import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';

const notifications = [
  {
    id: '1',
    title: 'Booking Confirmation!',
    time: '4:00 PM',
    message:
      'Thank you! Your booking has been successfully confirmed. A confirmation email has been sent.',
  },
  {
    id: '2',
    title: 'Rate Your Recent Service!',
    time: '4:00 PM',
    message:
      'Your opinion helps us improve and serve you better! We’d love to hear your feedback.',
  },
  {
    id: '3',
    title: 'Booking Conformation!',
    time: '4:00 PM',
    message:
      'Thank you! Your booking has been successful confirmed. A confirmation email has been.',
  },
  {
    id: '4',
    title: 'Rate Your Recent Service!',
    time: '4:00 PM',
    message:
      'Your opinion helps us improve and serve you better! We’d love to hear your feedback.',
  },
  {
    id: '5',
    title: 'Booking Conformation!',
    time: '4:00 PM',
    message:
      'Thank you! Your booking has been successful confirmed. A confirmation email has been.',
  },
];

const NotificationCard = ({title, time, message}: any) => {
  return (
    <ShadowCard style={styles.card}>
      <View style={styles.headerRow}>
        <CommonText style={styles.title} text={title} />
        <CommonText style={styles.time} text={time} />
      </View>
      <CommonText style={styles.message} text={message} />
    </ShadowCard>
  );
};

const NotificationList = () => {
  return (
    <FlatList
      data={notifications}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      renderItem={({item}) => (
        <NotificationCard
          title={item.title}
          time={item.time}
          message={item.message}
        />
      )}
    />
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: hp(40),
    paddingHorizontal: wp(24),
  },
  card: {
    gap: hp(14),
    width: '100%',
    marginBottom: hp(15),
    paddingVertical: hp(16),
    paddingHorizontal: wp(25),
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...commonFontStyle(700, 1.9, Colors._2C2C2C),
  },
  time: {
    ...commonFontStyle(400, 1.7, Colors._808080),
  },
  message: {
    ...commonFontStyle(400, 1.7, Colors._808080),
  },
});
