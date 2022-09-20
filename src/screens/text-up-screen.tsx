import React, {useRef} from 'react';
import {Dimensions, StatusBar} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {defaultConfig, objToRNStyle} from 'react-native-string-style';

import {Text, View} from '../components';

export const TextUpScreen = () => {
  const {height} = Dimensions.get('window');
  const {vscale} = defaultConfig;
  const initialPositions = {
    title: vscale(height - 160),
    goButton: vscale(height - 160),
  };
  const titlePosition = useSharedValue(initialPositions.title);
  const goPosition = useSharedValue(initialPositions.goButton);
  const goButtonRef = useRef(null);

  const eventHandler = useAnimatedGestureHandler({
    onStart: () => {
      titlePosition.value = withTiming(0, {
        duration: 1000,
        easing: Easing.bezier(0.42, 0.86, 0.63, 0.03),
      });
    },
    onEnd: () => {
      titlePosition.value = withTiming(initialPositions.title, {
        duration: 200,
        easing: Easing.bezier(0.17, 0.67, 0.59, 0.96),
      });
    },
  }) as any;

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{translateY: titlePosition.value}],
  }));

  const goStyle = useAnimatedStyle(() => ({
    transform: [{translateY: goPosition.value}],
  }));

  return (
    <View sstyle="aic fg pd-32">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Text sstyle="fs-64 c-black" style={titleStyle}>
        Text Up
      </Text>
      <TapGestureHandler ref={goButtonRef} onGestureEvent={eventHandler}>
        <Animated.View style={[styles.button, goStyle]}>
          <Text sstyle="fs-32 c-white">Go</Text>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

const styles = objToRNStyle({
  button: 'pd-v-4 bd-ra-12 bg-grey bd-c-black aic w-100% bd-width-1',
});
