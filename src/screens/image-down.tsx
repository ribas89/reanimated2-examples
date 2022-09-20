import React, {useEffect, useRef} from 'react';
import {StatusBar} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {objToRNStyle} from 'react-native-string-style';

import heart from '../assets/heart.png';
import {View} from '../components';

export const ImageDownScreen = () => {
  const titlePosition = useSharedValue(30);
  const imageScale = useSharedValue(2);
  const heartClickSize = useSharedValue(3);

  const loveButtonRef = useRef(null);
  const loveTextRef = useRef(null);

  useEffect(() => {
    imageScale.value = withSequence(
      withTiming(
        0.5,
        {
          duration: 500,
        },
        () => {
          titlePosition.value = withTiming(-80, {
            duration: 1000,
            easing: Easing.bezier(0.37, 0.96, 0.72, 1),
          });
        },
      ),
      withRepeat(
        withSequence(
          withTiming(1.5, {duration: 500}),
          withTiming(1, {duration: 500}),
        ),
        -1,
        true,
      ),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{translateY: titlePosition.value}],
    opacity: interpolate(imageScale.value, [1, 2], [0, 1], Extrapolate.CLAMP),
  }));

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{scale: imageScale.value}],
  }));

  const eventHandler = useAnimatedGestureHandler({
    onStart: () => {
      const _heartClickSize = heartClickSize.value + 0.8;
      heartClickSize.value = _heartClickSize;
      imageScale.value = withSequence(
        withTiming(_heartClickSize, {duration: 500}),
        withTiming(1, {duration: 500}),
        withRepeat(
          withSequence(
            withTiming(1.5, {duration: 500}),
            withTiming(1, {duration: 500}),
          ),
          -1,
          true,
        ),
      );
    },
  }) as any;

  return (
    <View sstyle="jcc aic fg bg-white">
      <StatusBar barStyle="light-content" backgroundColor="red" />

      <TapGestureHandler ref={loveButtonRef} onGestureEvent={eventHandler}>
        <Animated.Image source={heart} style={[styles.heart, heartStyle]} />
      </TapGestureHandler>
      <TapGestureHandler ref={loveTextRef} onGestureEvent={eventHandler}>
        <Animated.Text style={[styles.text, titleStyle]}>
          ❤ LOVE ❤
        </Animated.Text>
      </TapGestureHandler>
    </View>
  );
};

const styles = objToRNStyle({
  heart: 'w-100 h-100',
  text: 'pd-b-12 fs-32 c-white',
});
