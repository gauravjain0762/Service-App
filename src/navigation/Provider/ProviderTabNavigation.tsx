/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
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
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

const Tab = createBottomTabNavigator();

const ProviderTabNavigation = () => {
  const dashboard: any = useSelector(
    (state: RootState) => state.auth?.dashboard,
  );
  const language: any = useSelector((state: RootState) => state.auth?.language);

  const tabs = [
    {
      name: PROVIDER_SCREENS.ProDashboard,
      icon: IMAGES.home,
      iconUnSelected: IMAGES.homeUnSelected,
      component: ProDashboard,
    },
    {
      name: PROVIDER_SCREENS.NewRequestScreen,
      icon: IMAGES.feed,
      iconUnSelected: IMAGES.feedUnselected,
      component: NewRequestScreen,
      options:
        dashboard?.unread_requests > 0
          ? {tabBarBadge: dashboard?.unread_requests}
          : {},
    },
    {
      name: PROVIDER_SCREENS.ProMyBookings,
      icon: IMAGES.calendar,
      iconUnSelected: IMAGES.calendarUnselected,
      component: ProMyBookings,
    },
    {
      name: PROVIDER_SCREENS.ProProfile,
      icon: IMAGES.profile,
      iconUnSelected: IMAGES.profileUnselected,
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
            marginBottom: Platform.OS === 'android' ? hp(10) : hp(-14),
            borderRadius: hp(100),
            paddingBottom: hp(10),
            justifyContent: 'center',
            marginHorizontal: wp(24),
            backgroundColor: Colors.provider_primary,
            direction: language === 'ar' ? 'rtl' : 'ltr',
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            const {icon, iconUnSelected} =
              tabs.find(tab => tab.name === route.name) || {};
            const tabIcon = focused ? icon : iconUnSelected;
            return (
              <View style={[styles.iconContainer]}>
                <FastImage
                  source={tabIcon}
                  defaultSource={tabIcon}
                  style={{
                    width: wp(30),
                    height: hp(25),
                  }}
                  resizeMode={FastImage.resizeMode.contain}
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
            options={tab?.options}
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
