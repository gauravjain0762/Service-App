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
import Profile from '@/screens/SeekerScreens/Tabs/Profile';
import {navigateTo} from '@/components/common/commonFunction';
import {SEEKER_SCREENS} from '../screenNames';
import MyBookingsTab from '@/screens/SeekerScreens/Tabs/MyBookingsTab';
import MyRequest from '@/screens/SeekerScreens/Tabs/MyRequest';

const Tab = createBottomTabNavigator();

const SeekerTabNavigation = () => {
  const CustomTabBarButton = ({children, onPress, route, ...props}: any) => {
    const handlePress = () => {
      navigateTo(route.name);
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
        initialRouteName={SEEKER_SCREENS.Home}
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

            if (route.name === SEEKER_SCREENS.Home) {
              iconName = IMAGES.home;
            } else if (route.name === SEEKER_SCREENS.MyRequest) {
              iconName = IMAGES.feed;
            } else if (route.name === SEEKER_SCREENS.MyBookingsTab) {
              iconName = IMAGES.calendar;
            } else if (route.name === SEEKER_SCREENS.Profile) {
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
        <Tab.Screen name={SEEKER_SCREENS.Home} component={HomeScreen} />
        <Tab.Screen
          name={SEEKER_SCREENS.MyBookingsTab}
          component={MyBookingsTab}
        />
        <Tab.Screen
          name={SEEKER_SCREENS.MyRequest}
          component={MyRequest}
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
