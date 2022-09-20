import React, {useRef} from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import {objToRNStyle, defaultConfig} from 'react-native-string-style';

import {View, Text} from '../components';

export const FallBallScreen = () => {
  const {height, width} = Dimensions.get('window');

  const {vscale, scale} = defaultConfig;
  const ground = vscale(height - 100);
  const xground = scale(width / 2 - 50);
  const ballY = useSharedValue(0);
  const ballX = useSharedValue(0);

  const fallBallRef = useRef(null);

  const animBallStyle = useAnimatedStyle(() => ({
    transform: [{translateY: ballY.value}, {translateX: ballX.value}],
  }));

  const ballEvent = useAnimatedGestureHandler({
    onStart: () => {
      let xPos = xground * (Math.random() < 0.5 ? -1 : 1);

      ballX.value = withSequence(
        withTiming(0, {duration: 100}),
        withTiming(xPos, {duration: 200}),
        withDelay(1000, withSpring(0)),
      );
      ballY.value = withSequence(
        withTiming(ground, {
          duration: 100,
          easing: Easing.bezier(0.19, -0.07, 0.44, 0.95),
        }),
        withRepeat(
          withSequence(
            withTiming(ground - 128, {
              duration: 100,
              easing: Easing.bezier(0.16, 0.5, 0.56, 0.94),
            }),
            withTiming(ground, {
              duration: 100,
              easing: Easing.bezier(0.16, 0.5, 0.56, 0.94),
            }),
          ),
          1,
          true,
        ),
        withDelay(1000, withSpring(ground)),
        withSpring(0),
      );
    },
  }) as any;

  return (
    <View sstyle="aic pd-t-24 fg bg-white">
      <StatusBar barStyle="light-content" backgroundColor="blue" />

      <TapGestureHandler ref={fallBallRef} onGestureEvent={ballEvent}>
        <Animated.View style={[styles.ball, animBallStyle]}>
          <Text sstyle="pd-b-12 fs-32 c-white">Touch</Text>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

const styles = objToRNStyle({
  ball: 'w-100 h-100 bg-blue bd-ra-50 aic jcc',
});
