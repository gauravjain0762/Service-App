import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';
import CustomShadow from '@/components/common/CustomShadow';
import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import HomeScreen from '@/screens/SeekerScreens/Tabs/HomeScreen';
import Feed1 from '@/screens/SeekerScreens/Tabs/Feed2';
import Bookings from '@/screens/SeekerScreens/Tabs/Bookings';
import Profile from '@/screens/SeekerScreens/Tabs/Profile';
import Feed from '@/screens/SeekerScreens/Tabs/Feed';
import { navigateTo } from '@/components/common/commonFunction';

const Tab = createBottomTabNavigator();

const SeekerTabNavigation = () => {
  const CustomTabBarButton = ({children, onPress, route, ...props}: any) => {
    const handlePress = () => {
      navigateTo(route.name)
    };

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={[props.style, styles.tabButton]}>{children}</View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <CustomShadow shadowStyle={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          animation: 'none',
          tabBarStyle: {
            left: 0,
            right: 0,
            height: hp(70),
            borderTopWidth: 0,
            position: 'absolute',
            borderRadius: hp(100),
            marginHorizontal: wp(24),
            backgroundColor: Colors.seeker_tab,
            bottom: Platform.OS === 'ios' ? 0 : hp(15),
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color}) => {
            let iconName;
            let iconWidth = wp(30);
            let iconHeight = hp(25);

            if (route.name === 'Home') {
              iconName = IMAGES.home;
            } else if (route.name === 'Feed') {
              iconName = IMAGES.feed;
            } else if (route.name === 'Feed2') {
              iconName = IMAGES.feed2;
            } else if (route.name === 'Bookings') {
              iconName = IMAGES.calendar;
            } else if (route.name === 'Profile') {
              iconName = IMAGES.profile;
            }
            return (
              <View style={[styles.iconContainer]}>
                <FastImage
                  source={iconName}
                  defaultSource={iconName}
                  style={{
                    width: iconWidth,
                    height: iconHeight,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? Colors.white : Colors._68d2a1}
                />
              </View>
            );
          },
          tabBarButton: props => (
            <CustomTabBarButton {...props} route={route} />
          ),
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Feed2" component={Feed1} />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          listeners={{
            tabPress: e => {
              e.preventDefault();
            },
          }}
        />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </CustomShadow>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SeekerTabNavigation;
