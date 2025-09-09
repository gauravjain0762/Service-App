import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {GeneralStyle} from '@/constants/GeneralStyle';
import BackHeader from '@/components/common/BackHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProviderHeader from '@/components/Provider/ProviderHeader';
import {commonFontStyle, getFontSize, hp} from '@/utils/responsiveFn';
import Divider from '@/components/common/Divider';
import CommonText from '@/components/common/CommonText';
import {Colors} from '@/constants/Colors';
import TabSwitch from '@/components/common/TabSwitch';
import BookingCard from '@/components/Provider/BookingCard';
import {DATA} from '../Tabs/ProMyBookings';
import {useAppSelector} from '@/Hooks/hooks';

const REVIEW_DATA = [
  {
    name: 'Phillip Paradone ',
    rating: 5,
    review_desc:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant ium doloremque laudantium.',
  },
  {
    name: 'Jasmine Allaxiz',
    rating: 4,
    review_desc:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant ium doloremque laudantium.',
  },
  {
    name: 'Phillip Paradone ',
    rating: 3,
    review_desc:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant ium doloremque laudantium.',
  },
];

const ProfileDetailScreen = () => {
  const {userInfo} = useAppSelector<any>(state => state.auth);
  const [activeTab, setActiveTab] = useState<'My Jobs' | 'Reviews'>('My Jobs');

  return (
    <SafeAreaView style={GeneralStyle.container}>
      <BackHeader text="Profile Detail" style={GeneralStyle.back} />

      <ProviderHeader
        isBell={false}
        style={{marginVertical: hp(24)}}
        avatarContainerStyle={{borderRadius: hp(100)}}
        item={{image: userInfo?.picture}}
      />

      <Divider />

      <View style={{paddingHorizontal: hp(25)}}>
        <View style={styles.detailView}>
          <CommonText style={styles.label} text={'Address'} />
          <CommonText style={styles.value} text={'Dubai Internet City'} />
        </View>
        <View style={styles.detailView}>
          <CommonText style={styles.label} text={'Phone Number'} />
          <CommonText
            style={styles.value}
            text={`+${userInfo?.phone_code} ${userInfo?.phone}`}
          />
        </View>

        <TabSwitch
          tabs={['My Jobs', 'Reviews']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          style={{backgroundColor: Colors.provider_primary}}
          activeTabStyle={{backgroundColor: Colors.white}}
          activeTabTextStyle={{color: Colors.provider_primary}}
        />

        {activeTab === 'My Jobs' && (
          <FlatList
            data={DATA}
            renderItem={({item, index}) => (
              <BookingCard item={item} index={index} isBooking={true} />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={{marginTop: hp(20)}}
            contentContainerStyle={styles.contentContainer}
          />
        )}
      </View>
      {activeTab === 'Reviews' && (
        <FlatList
          data={REVIEW_DATA}
          renderItem={({item, index}) => (
            <ProviderHeader
              key={index}
              item={item}
              isBell={false}
              isStarVisible={true}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={{marginTop: hp(20)}}
          contentContainerStyle={[
            styles.contentContainer,
            {
              paddingBottom: hp(50),
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  detailView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getFontSize(2),
    gap: getFontSize(1),
  },
  label: {
    flex: 1,
    width: '30%',
    ...commonFontStyle(500, 2.2, Colors._868686),
  },
  value: {
    flex: 2,
    textAlign: 'right',
    ...commonFontStyle(500, 2.2, Colors._333333),
  },
  contentContainer: {
    gap: hp(17),
    paddingTop: hp(20),
    paddingBottom: hp(400),
    paddingHorizontal: hp(5),
  },
});
