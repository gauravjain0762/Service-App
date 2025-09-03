/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  total: number; // total value (e.g. 25)
  value: number; // current value (e.g. 10)
  size?: number;
  strokeWidth?: number;
  duration?: number; // animation duration
  children?: any;
};

export default function AnimatedCircleProgress({
  total,
  value,
  size = 200,
  strokeWidth = 12,
  duration = 1500,
  children,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0); // between 0 and 1

  useEffect(() => {
    const targetProgress = Math.min(value / total, 1); // clamp max 1
    progress.value = withTiming(targetProgress, {duration});
  }, [value, total, progress, duration]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Svg height={size} width={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#7ED6DF"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
        {/* Animated progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FBC531"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
      </Svg>

      {/* Center Content (like trophy) */}
      <View style={styles.centerContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophy: {
    width: 50,
    height: 50,
    backgroundColor: 'gold',
    borderRadius: 25,
  },
});
