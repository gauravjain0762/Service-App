import {Colors} from '@/constants/Colors';
import {getFontSize} from '@/utils/responsiveFn';
import React, {useEffect, useRef, memo, useCallback} from 'react';
import {TouchableOpacity, Animated, StyleSheet, Easing} from 'react-native';

interface Props {
  isToggleOn?: boolean;
  onToggleSwitch?: () => void;
}

const CommonSwitch = ({
  isToggleOn = false,
  onToggleSwitch = () => {},
}: Props) => {
  const togglePosition = useRef(new Animated.Value(isToggleOn ? 1 : 0));

  useEffect(() => {
    Animated.timing(togglePosition.current, {
      toValue: isToggleOn ? 1 : 0,
      duration: 300,
      easing: Easing.elastic(2),
      useNativeDriver: false,
    }).start();
  }, [isToggleOn]);

  const toggleSwitch = useCallback(() => {
    onToggleSwitch();
  }, [onToggleSwitch]);

  const interpolatedBackgroundColor = togglePosition.current.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors._D6F6E7, Colors._D6F6E7],
  });

  const interpolatedTranslateX = togglePosition.current.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 23],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.switchContainer,
          {backgroundColor: interpolatedBackgroundColor},
        ]}>
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: !isToggleOn ? Colors.white : Colors._03B463,
            },
            {transform: [{translateX: interpolatedTranslateX}]},
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: getFontSize(7),
    height: getFontSize(3.5),
    borderRadius: getFontSize(3),
    padding: 4,
    justifyContent: 'center',
  },
  circle: {
    width: getFontSize(2.8),
    height: getFontSize(2.8),
    borderRadius: 13,
    backgroundColor: Colors.white,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default memo(CommonSwitch);
