import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from '@/constants/Colors';
import BackHeader from '@/components/common/BackHeader';
import CommonText from '@/components/common/CommonText';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import NotificationCard from '@/components/common/NotificationCard';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import {useRoute} from '@react-navigation/native';
import {useGetNotificationsQuery} from '@/api/Seeker/homeApi';

const Notifications = () => {
  const {params} = useRoute<any>();
  const isProvider = params?.isProvider;
  const readTextColor = isProvider
    ? Colors.provider_primary
    : Colors.seeker_primary;

  const [currentPage, setCurrentPage] = React.useState(1);
  const [allNotification, setAllNotification] = React.useState([]);

  const {
    data: notifications,
    isLoading: notificationLoading,
    refetch: refetchNotificationList,
  } = useGetNotificationsQuery<any>(
    {page: currentPage},
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  React.useEffect(() => {
    if (notifications) {
      const newData = notifications.data.notifications;
      setAllNotification(prev =>
        currentPage === 1 ? newData : [...prev, ...newData],
      );
    }
  }, [notifications, currentPage]);

  const handleLoadMore = () => {
    // Check if there are more pages to load
    if (
      notifications &&
      notifications.data?.pagination?.current_page <
        notifications.data?.pagination?.total_pages &&
      !notificationLoading
    ) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };
console.log(allNotification,'allNotification');

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
        <NotificationCard allNotification={allNotification}/>
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
