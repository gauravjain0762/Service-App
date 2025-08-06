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
          <Text
            style={[styles.tabText, {color: activeTabTextStyle && Colors.white }, activeTab === tab && [styles.activeTabText, activeTabTextStyle]]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default TabSwitch;

const styles = StyleSheet.create({
  tabRow: {
    marginTop: hp(25),
    flexDirection: 'row',
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
