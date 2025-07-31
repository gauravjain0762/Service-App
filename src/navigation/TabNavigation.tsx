import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {getFontSize} from '../utils/responsiveFn';
import {IMAGES} from '../assets/images';
import {Colors} from '../constants/Colors';
import CustomShadow from '../components/common/CustomShadow';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const insets = useSafeAreaInsets();

  const CreateScreen = () => {
    return <></>;
  };

  const CustomTabBarButton = ({children, onPress, route, ...props}: any) => {
    const handlePress = () => {
      if (route.name === 'Create') {
        console.log('helloeeee');
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
    <CustomShadow shadowStyle={{flex: 1}}>
      <Tab.Navigator
        // initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          animation: 'shift',
          tabBarStyle: {
            backgroundColor: Colors.black,
            height:
              Platform.OS === 'ios'
                ? getFontSize(10) + insets.bottom
                : getFontSize(10),
            marginHorizontal: getFontSize(2.5),
            borderRadius: getFontSize(3),
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 0 : getFontSize(1.3),
            left: 0,
            right: 0,
            borderTopWidth: 0,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.white,
          tabBarInactiveTintColor: Colors._4E4E4E,
          tabBarIcon: ({focused, color}) => {
            let iconName;
            let iconSize = getFontSize(3.5);

            if (route.name === 'Home') {
              iconName = focused ? IMAGES.home : IMAGES.home;
            } else if (route.name === 'Create') {
              iconName = IMAGES.create;
              iconSize = getFontSize(4.5);
            } else if (route.name === 'Profile') {
              iconName = focused ? IMAGES.profile : IMAGES.profile;
            }
            return (
              <View
                style={[
                  styles.iconContainer,
                  route.name === 'Create' && styles.createIconContainer,
                ]}>
                <FastImage
                  source={iconName}
                  defaultSource={iconName}
                  style={{
                    height: iconSize,
                    width: iconSize,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={route.name === 'Create' ? undefined : color}
                />
              </View>
            );
          },
          tabBarButton: props => (
            <CustomTabBarButton {...props} route={route} />
          ),
        })}>
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          listeners={{
            tabPress: e => {
              e.preventDefault();
            },
          }}
        />
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
  createIconContainer: {
    backgroundColor: 'transparent',
    borderRadius: getFontSize(1.5),
    padding: getFontSize(0.5),
  },
});

export default TabNavigation;
