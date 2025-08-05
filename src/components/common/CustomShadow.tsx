import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ViewStyle,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';
import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import HomeScreen from '@/screens/SeekerScreens/Tabs/HomeScreen';
import Profile from '@/screens/SeekerScreens/Tabs/Profile';
import {navigateTo} from '@/components/common/commonFunction';
import {SEEKER_SCREENS} from '../screenNames';
import MyRequest from '@/screens/SeekerScreens/Tabs/MyRequest';
import MyBookingsTab from '@/screens/SeekerScreens/Tabs/MyBookingsTab';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const SeekerTabNavigation = () => {
  const CustomTabBarButton = ({children, onPress}: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.tabButton}>
      {children}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        initialRouteName={SEEKER_SCREENS.Home}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({focused}) => {
            let icon;
            if (route.name === SEEKER_SCREENS.Home) {
              icon = IMAGES.home;
            } else if (route.name === SEEKER_SCREENS.MyRequest) {
              icon = IMAGES.feed;
            } else if (route.name === SEEKER_SCREENS.MyBookingsTab) {
              icon = IMAGES.calendar;
            } else if (route.name === SEEKER_SCREENS.Profile) {
              icon = IMAGES.profile;
            }

            return (
              <FastImage
                source={icon}
                defaultSource={icon}
                style={styles.icon}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={focused ? Colors.white : Colors._68d2a1}
              />
            );
          },
          tabBarButton: props => <CustomTabBarButton {...props} />,
        })}>
        <Tab.Screen name={SEEKER_SCREENS.Home} component={HomeScreen} />
        <Tab.Screen
          name={SEEKER_SCREENS.MyBookingsTab}
          component={MyBookingsTab}
        />
        <Tab.Screen name={SEEKER_SCREENS.MyRequest} component={MyRequest} />
        <Tab.Screen name={SEEKER_SCREENS.Profile} component={Profile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tabBar: {
    height: hp(70),
    marginHorizontal: wp(20),
    borderRadius: hp(50),
    backgroundColor: Colors.seeker_tab,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? hp(15) : hp(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderTopWidth: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: wp(28),
    height: hp(28),
  },
});

export default SeekerTabNavigation;
