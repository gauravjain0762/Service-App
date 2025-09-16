import React from 'react';
import {StyleSheet} from 'react-native';

import ShadowCard from './ShadowCard';
import CommonText from './CommonText';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp} from '@/utils/responsiveFn';
import { useAppSelector } from '@/Hooks/hooks';
import { alignItemsRTL } from '@/utils/arabicStyles';

const AdittionalNote = ({title, additionalNotes, style}: any) => {
  const {language} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <ShadowCard
      style={[
        {
          padding: hp(19),
          width: '100%',
          ...alignItemsRTL(language),
          gap: hp(12),
        },
        style,
      ]}>
      <CommonText
        text={title ? title : 'Additional Note'}
        style={{
          ...commonFontStyle(600, 1.7, Colors._202020),
        }}
      />
      <CommonText
        text={additionalNotes}
        style={{
          ...commonFontStyle(400, 1.8, Colors._676767),
        }}
      />
    </ShadowCard>
  );
};

export default AdittionalNote;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({

})}
