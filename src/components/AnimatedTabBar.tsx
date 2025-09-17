import React, {useRef, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import {Colors} from '@/constants/Colors';
import {commonFontStyle, getFontSize} from '@/utils/responsiveFn';
import {useTranslation} from 'react-i18next';
import {rowReverseRTL} from '@/utils/arabicStyles';
import CommonText from './common/CommonText';

const AnimatedTabBar = ({
  tabs = ['Tab 1', 'Tab 2'],
  activeIndex = 0,
  onTabPress,
  containerStyle,
  tabStyle,
  activeTabStyle,
  textStyle,
  activeTextStyle,
  indicatorStyle,
  animationDuration = 200,
}: any) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const tabWidth = containerWidth / tabs.length;
  const {i18n} = useTranslation();

  const styles = React.useMemo(
    () => getGlobalStyles(i18n.language),
    [i18n.language],
  );

  useEffect(() => {
    if (containerWidth > 0) {
      Animated.timing(translateX, {
        toValue: activeIndex * tabWidth,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [activeIndex, tabWidth, animationDuration, containerWidth, translateX]);

  const handleLayout = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const handleTabPress = (index: number) => {
    if (onTabPress) {
      onTabPress(index);
    }
  };

  return (
    <View style={[styles.container, containerStyle]} onLayout={handleLayout}>
      {/* Background indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth,
            transform: [{translateX}],
            left: activeIndex == 0 ? 4 : -4,
          },
          indicatorStyle,
        ]}
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              {width: tabWidth},
              tabStyle,
              activeIndex === index && [styles.activeTabText, activeTabStyle],
            ]}
            onPress={() => handleTabPress(index)}
            activeOpacity={0.7}>
            <CommonText
              style={[
                styles.tabText,
                textStyle,
                activeIndex === index && [
                  styles.activeTabText,
                  activeTextStyle,
                ],
              ]}
              text={tab}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const getGlobalStyles = (language: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors._F9F9F9,
      borderRadius: getFontSize(100),
      padding: 4,
      marginVertical: getFontSize(1),
      position: 'relative',
    },
    indicator: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: Colors.black,
      borderRadius: getFontSize(100),
      top: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    tabsContainer: {
      ...rowReverseRTL(language),
      alignItems: 'center',
    },
    tab: {
      paddingVertical: getFontSize(2),
      paddingHorizontal: getFontSize(1.4),
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      flex: 1,
    },
    tabText: {
      textAlign: 'center',
      ...commonFontStyle(500, 2, Colors.black),
    },
    activeTabText: {
      ...commonFontStyle(500, 2, Colors.white),
    },
  });
};

export default AnimatedTabBar;
