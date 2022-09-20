import React, {useState} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {objToRNStyle, View} from 'react-native-string-style';

import dragonball from '../assets/dragonball.png';
import goku from '../assets/goku.png';
import gokusad from '../assets/gokusad.png';

export const DragonBallScreen = () => {
  const ballx = useSharedValue(0);
  const bally = useSharedValue(0);
  const ballrotate = useSharedValue(0);
  const [gokuHappy, setGokuHappy] = useState(true);

  const onDrag = useAnimatedGestureHandler({
    onStart: () => {
      runOnJS(setGokuHappy)(false);
      ballrotate.value = withRepeat(
        withTiming(360, {
          duration: 500,
          easing: Easing.linear,
        }),
        -1,
      );
    },
    onActive: (event: any) => {
      ballx.value = event.translationX;
      bally.value = event.translationY;
    },
    onEnd: () => {
      ballx.value = withSpring(0);
      bally.value = withSpring(0);
      ballrotate.value = withTiming(0, {duration: 800}, () => {
        runOnJS(setGokuHappy)(true);
      });
    },
  });

  const animBallStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: ballx.value},
      {translateY: bally.value},
      {rotateZ: `${ballrotate.value}deg`},
    ],
  }));

  return (
    <SafeAreaView style={styles.safe}>
      <Image
        style={styles.goku}
        source={gokuHappy ? goku : gokusad}
        resizeMethod="scale"
      />

      <View sstyle="fg pd-l-10 pd-b-80 jcfe aic">
        <PanGestureHandler onGestureEvent={onDrag}>
          <Animated.Image
            style={[styles.image, animBallStyle]}
            source={dragonball}
            resizeMethod="scale"
          />
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
};

const styles = objToRNStyle({
  goku: 'pos-abs w-100% h-100%',
  safe: 'fg position-relative',
  image: 'w-180 h-180 bd-ra-90',
});
