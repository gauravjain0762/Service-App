import React from 'react';
import {StyleSheet, View} from 'react-native';

import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import BackHeader from '@/components/common/BackHeader';
import RequestCard from '@/components/common/RequestCard';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import OfferCard from '@/components/common/OfferCard';
import {navigateTo} from '@/components/common/commonFunction';
import {SCREENS} from '@/navigation/screenNames';

const Offers = () => {
  return (
    <SafeareaProvider style={styles.safeArea}>
      <View style={styles.topContainer}>
        <BackHeader text={'Create Request'} />

        <RequestCard
          style={styles.requestCard}
          text1={'Repair & Maintenance'}
          titleStyle={styles.titleStyle}
          text2={'AC Regular Services'}
          subtitleStyle={styles.subtitleStyle}
        />
      </View>

      <View style={styles.offersContainer}>
        <OfferCard
          onCardPress={() => {
            navigateTo(SCREENS.OffersDetail);
          }}
          onPressOffer={() => {}}
        />
      </View>
    </SafeareaProvider>
  );
};

export default Offers;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    paddingHorizontal: wp(24),
  },
  requestCard: {
    marginVertical: hp(27),
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleStyle: {
    ...commonFontStyle(600, 2.1, Colors.black),
  },
  subtitleStyle: {
    ...commonFontStyle(600, 1.9, Colors._898989),
  },
  offersContainer: {
    flex: 1,
    paddingVertical: hp(20),
    paddingHorizontal: wp(20),
    backgroundColor: Colors._f4f4f5,
  },
});
