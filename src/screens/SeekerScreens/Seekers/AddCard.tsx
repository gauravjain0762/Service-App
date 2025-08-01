import React from 'react';
import {StyleSheet, View} from 'react-native';

import SafeareaProvider from '@/components/common/SafeareaProvider';
import BackHeader from '@/components/common/BackHeader';
import {Colors} from '@/constants/Colors';
import {wp} from '@/utils/responsiveFn';
import CommonText from '@/components/common/CommonText';

const AddCard = () => {
  return (
    <SafeareaProvider style={styles.safeArea}>
      <View style={styles.topContainer}>
        <BackHeader text={'Add Card'} />
      </View>
    </SafeareaProvider>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    paddingHorizontal: wp(24),
  },
});
