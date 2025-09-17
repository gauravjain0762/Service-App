import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {Colors} from '@/constants/Colors';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import {rowReverseRTL} from '@/utils/arabicStyles';
import {useAppSelector} from '@/Hooks/hooks';
import CommonText from './CommonText';

type Props<T extends string> = {
  tabs: T[];
  activeTab: T;
  style?: ViewStyle;
  activeTabStyle?: ViewStyle;
  activeTabTextStyle?: TextStyle;
  setActiveTab: (tab: T) => void;
};

function TabSwitch<T extends string>({
  tabs,
  activeTab,
  setActiveTab,
  style,
  activeTabStyle,
  activeTabTextStyle,
}: Props<T>) {
  const {language} = useAppSelector<any>(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  return (
    <View style={[styles.tabRow, style]}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabButton,
            activeTab === tab && [styles.activeTab, activeTabStyle],
          ]}
          onPress={() => setActiveTab(tab)}>
          <CommonText
            style={[
              styles.tabText,
              {color: activeTabTextStyle && Colors.white},
              activeTab === tab && [styles.activeTabText, activeTabTextStyle],
            ]}
            text={tab.charAt(0).toUpperCase() + tab.slice(1)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default TabSwitch;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    tabRow: {
      marginTop: hp(25),
      ...rowReverseRTL(_language),
      justifyContent: 'space-between',
      backgroundColor: Colors._F7F7F7,
      padding: wp(4),
      borderRadius: wp(50),
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: wp(50),
      height: hp(50),
    },
    activeTab: {
      backgroundColor: Colors.seeker_primary,
    },
    tabText: {
      ...commonFontStyle(500, 2, Colors._7D7D7D),
    },
    activeTabText: {
      color: Colors.white,
    },
  });
};
