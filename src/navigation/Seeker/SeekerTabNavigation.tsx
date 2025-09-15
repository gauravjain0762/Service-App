/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
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
import {SEEKER_SCREENS} from '../screenNames';
import MyRequest from '@/screens/SeekerScreens/Tabs/MyRequest';
import MyBookingsTab from '@/screens/SeekerScreens/Tabs/MyBookingsTab';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setGuestLogin, setGuestUserModal} from '@/features/authSlice';
import {useAppDispatch} from '@/Hooks/hooks';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

const Tab = createBottomTabNavigator();

const SeekerTabNavigation = () => {
  const guestUser = useSelector((state: RootState) => state.auth?.guestUser);
  const dashboard = useSelector((state: RootState) => state.auth?.dashboard);
  const language = useSelector((state: RootState) => state.auth?.language);
  const dispatch = useAppDispatch();

  const CustomTabBarButton = ({children, route, ...props}: any) => {
    const handlePress = () => {
      if (
        guestUser &&
        [
          SEEKER_SCREENS.MyBookingsTab,
          SEEKER_SCREENS.MyRequest,
          SEEKER_SCREENS.Profile,
        ].includes(route?.name)
      ) {
        dispatch(setGuestUserModal(true));
        return;
      } else {
        navigateTo(route.name);
      }
    };

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={[props.style, styles.tabButton]}>{children}</View>
      </TouchableWithoutFeedback>
    );
  };

  const tabScreens = [
    {
      name: SEEKER_SCREENS.Home,
      component: HomeScreen,
      options: {}
    },
    {
      name: SEEKER_SCREENS.MyBookingsTab,
      component: MyBookingsTab,
      options: {}
    },
    {
      name: SEEKER_SCREENS.MyRequest,
      component: MyRequest,
      options: dashboard?.offers_unread > 0
        ? {tabBarBadge: dashboard?.offers_unread}
        : {}
    },
    {
      name: SEEKER_SCREENS.Profile,
      component: Profile,
      options: {}
    }
  ];

  // Reverse the order for RTL
  const orderedScreens = language === 'ar' ? [...tabScreens].reverse() : tabScreens;

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: Colors.white, flex: 1}}>
      <Tab.Navigator
        initialRouteName={SEEKER_SCREENS.Home}
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
            backgroundColor: Colors.seeker_primary,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            let iconName;
            let iconWidth = wp(30);
            let iconHeight = hp(25);

            if (route.name === SEEKER_SCREENS.Home) {
              iconName = focused ? IMAGES.home : IMAGES.homeUnSelected;
            } else if (route.name === SEEKER_SCREENS.MyRequest) {
              iconName = focused ? IMAGES.feed : IMAGES.feedUnselected;
            } else if (route.name === SEEKER_SCREENS.MyBookingsTab) {
              iconName = focused ? IMAGES.calendar : IMAGES.calendarUnselected;
            } else if (route.name === SEEKER_SCREENS.Profile) {
              iconName = focused ? IMAGES.profile : IMAGES.profileUnselected;
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
                />
              </View>
            );
          },
          tabBarButton: props => (
            <CustomTabBarButton {...props} route={route} />
          ),
        })}>
        
        {/* Render screens in the correct order based on RTL */}
        {orderedScreens.map((screen, index) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
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

export default SeekerTabNavigation;