import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {alignItemsRTL, rowReverseRTL, textRTL} from '@/utils/arabicStyles';
import {useAppSelector} from '@/Hooks/hooks';
import {getLocalizedText} from './commonFunction';
import moment from 'moment';

const NotificationList = ({allNotification, handleLoadMore}: any) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
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
  return (
    <FlatList
      data={allNotification}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.listContent,
        allNotification?.length === 0 && {flexGrow: 1},
      ]}
      renderItem={({item}) => (
        <NotificationCard
          title={getLocalizedText(item?.title, item?.title_ar, language)}
          time={moment(item.createdAt).format('DD MMM')}
          message={getLocalizedText(item?.message, item?.message_ar, language)}
        />
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CommonText
            text="No new request yet"
            style={{
              textAlign: 'center',
              ...commonFontStyle(500, 2, Colors._898989),
            }}
          />
        </View>
      )}
    />
  );
};

export default NotificationList;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    listContent: {
      // flexGrow:1,
      paddingBottom: hp(40),
      paddingHorizontal: wp(24),
    },
    card: {
      gap: hp(14),
      width: '100%',
      marginBottom: hp(15),
      paddingVertical: hp(16),
      paddingHorizontal: wp(25),
      ...alignItemsRTL(_language),
    },
    headerRow: {
      width: '100%',
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      flexShrink: 1,
      ...commonFontStyle(700, 1.9, Colors._2C2C2C),
      ...textRTL(_language),
    },
    time: {
      ...commonFontStyle(400, 1.7, Colors._808080),
      ...textRTL(_language),
    },
    message: {
      ...commonFontStyle(400, 1.7, Colors._808080),
      ...textRTL(_language),
      flexShrink: 1,
    },
  });
};
