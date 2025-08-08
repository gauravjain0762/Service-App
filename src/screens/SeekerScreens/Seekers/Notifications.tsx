import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from '@/constants/Colors';
import BackHeader from '@/components/common/BackHeader';
import CommonText from '@/components/common/CommonText';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import NotificationCard from '@/components/common/NotificationCard';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {useRoute} from '@react-navigation/native';

const Notifications = () => {
  const {params} = useRoute<any>();
  const isProvider = params?.isProvider;
  const readTextColor = isProvider
    ? Colors.provider_primary
    : Colors.seeker_primary;

  return (
    <SafeareaProvider style={styles.safeArea}>
      <BackHeader
        text={'Notification'}
        style={{paddingHorizontal: wp(24)}}
        rightIcon={
          <CommonText
            text={'Mark All As Read'}
            style={{
              ...commonFontStyle(400, 1.7, readTextColor),
            }}
          />
        }
      />
      <View style={{marginTop: hp(40), flex: 1}}>
        <NotificationCard />
      </View>
    </SafeareaProvider>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
