/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';
import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import {PROVIDER_SCREENS} from '../screenNames';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProDashboard from '@/screens/ProviderScreens/Tabs/ProDashboard';
import ProMyBookings from '@/screens/ProviderScreens/Tabs/ProMyBookings';
import ProProfile from '@/screens/ProviderScreens/Tabs/ProProfile';
import NewRequestScreen from '@/screens/ProviderScreens/Home/NewRequestScreen';

const Tab = createBottomTabNavigator();

const ProviderTabNavigation = () => {
  const tabs = [
    {
      name: PROVIDER_SCREENS.ProDashboard,
      icon: IMAGES.home,
      component: ProDashboard,
    },
    {
      name: PROVIDER_SCREENS.NewRequestScreen,
      icon: IMAGES.feed,
      component: NewRequestScreen,
    },
    {
      name: PROVIDER_SCREENS.ProMyBookings,
      icon: IMAGES.calendar,
      component: ProMyBookings,
    },
    {
      name: PROVIDER_SCREENS.ProProfile,
      icon: IMAGES.profile,
      component: ProProfile,
      initialParams: {isProvider: true},
    },
  ];

  const CustomTabBarButton = ({children, onPress, route, ...props}: any) => {
    const handlePress = () => {
      if (route.name === '') {
      } else {
        onPress();
      }
    };

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={[props.style, styles.tabButton]}>{children}</View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: Colors.white, flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          animation: 'none',
          tabBarStyle: {
            height: hp(70),
            borderTopWidth: 0,
            paddingTop: hp(10),
            alignItems: 'center',
            position: 'absolute',
            marginBottom: hp(-14),
            borderRadius: hp(100),
            paddingBottom: hp(10),
            justifyContent: 'center',
            marginHorizontal: wp(24),
            backgroundColor: Colors.provider_primary,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            const {icon} = tabs.find(tab => tab.name === route.name) || {};
            return (
              <View style={[styles.iconContainer]}>
                <FastImage
                  source={icon}
                  defaultSource={icon}
                  style={{
                    width: wp(30),
                    height: hp(25),
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? Colors.white : Colors.provider_tab}
                />
              </View>
            );
          },
          tabBarButton: props => (
            <CustomTabBarButton {...props} route={route} />
          ),
        })}
        initialRouteName={PROVIDER_SCREENS.ProDashboard}>
        {tabs.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            initialParams={tab?.initialParams}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProviderTabNavigation;
