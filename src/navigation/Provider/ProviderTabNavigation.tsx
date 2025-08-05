import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';
import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';
import {IMAGES} from '@/assets/images';
import HomeScreen from '@/screens/SeekerScreens/Tabs/HomeScreen';
import Profile from '@/screens/SeekerScreens/Tabs/Profile';
import {navigateTo} from '@/components/common/commonFunction';
import {PROVIDER_SCREENS, SEEKER_SCREENS} from '../screenNames';
import MyRequest from '@/screens/SeekerScreens/Tabs/MyRequest';
import MyBookingsTab from '@/screens/SeekerScreens/Tabs/MyBookingsTab';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProDashboard from '@/screens/ProviderScreens/Tabs/ProDashboard';
import ProMyBookings from '@/screens/ProviderScreens/Tabs/ProMyBookings';
import ProProfile from '@/screens/ProviderScreens/Tabs/ProProfile';

const Tab = createBottomTabNavigator();

const ProviderTabNavigation = () => {
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
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: Colors.white, flex: 1}}>
      <Tab.Navigator
        initialRouteName={PROVIDER_SCREENS.ProDashboard}
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
            backgroundColor: Colors.provider_primary,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color}) => {
            let iconName;
            let iconWidth = wp(30);
            let iconHeight = hp(25);

            if (route.name === PROVIDER_SCREENS.ProDashboard) {
              iconName = IMAGES.home;
            } else if (route.name === PROVIDER_SCREENS.ProMyBookings) {
              iconName = IMAGES.calendar;
            } else if (route.name === PROVIDER_SCREENS.ProProfile) {
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
                  tintColor={focused ? Colors.white : Colors.provider_tab}
                />
              </View>
            );
          },
          tabBarButton: props => (
            <CustomTabBarButton {...props} route={route} />
          ),
        })}>
        <Tab.Screen
          name={PROVIDER_SCREENS.ProDashboard}
          component={ProDashboard}
        />
        <Tab.Screen
          name={PROVIDER_SCREENS.ProMyBookings}
          component={ProMyBookings}
        />
        <Tab.Screen name={PROVIDER_SCREENS.ProProfile} component={ProProfile} />
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
    paddingTop: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProviderTabNavigation;
