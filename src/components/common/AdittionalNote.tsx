import React from 'react';
import {StyleSheet} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp} from '@/utils/responsiveFn';

const AdittionalNote = () => {
  return (
    <ShadowCard
      style={{
        padding: hp(19),
        width: '100%',
        alignItems: 'flex-start',
        gap: hp(12),
      }}>
      <CommonText
        text={'Additional Note'}
        style={{
          ...commonFontStyle(600, 1.7, Colors._202020),
        }}
      />
      <CommonText
        text={'A new battery has to be bought before the battery replacement. '}
        style={{
          ...commonFontStyle(400, 1.8, Colors._676767),
        }}
      />
    </ShadowCard>
  );
};

export default AdittionalNote;

const styles = StyleSheet.create({});
