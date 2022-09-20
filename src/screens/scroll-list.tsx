import React from 'react';
import {objToRNStyle, View, Text} from 'react-native-string-style';
import {StatusBar, SafeAreaView} from 'react-native';
import barrel from '../assets/barrel.jpg';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

export const ScrollListScreen = () => {
  const totalItems = 30;
  const array = Array(totalItems).fill(0);

  const scrolled = useSharedValue(0);
  const animScrollHandler = useAnimatedScrollHandler((event: any) => {
    const contentOffset = event.contentOffset.y;
    scrolled.value = contentOffset;
  });

  const animHeaderStyle = useAnimatedStyle(() => ({
    height: interpolate(scrolled.value, [0, 570], [258, 64], Extrapolate.CLAMP),
    paddingBottom: interpolate(
      scrolled.value,
      [0, 570],
      [8, 0],
      Extrapolate.CLAMP,
    ),
  }));

  const animImageStyle = useAnimatedStyle(() => ({
    height: interpolate(scrolled.value, [0, 570], [200, 50], Extrapolate.CLAMP),
    width: interpolate(scrolled.value, [0, 570], [200, 50], Extrapolate.CLAMP),
  }));

  const animTextStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(scrolled.value, [0, 570], [24, 8], Extrapolate.CLAMP),
    opacity: interpolate(scrolled.value, [0, 570], [1, 0], Extrapolate.CLAMP),
    height: interpolate(scrolled.value, [0, 570], [40, 8], Extrapolate.CLAMP),
  }));

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="gray" />

      <Animated.ScrollView
        contentContainerStyle={styles.scroll}
        onScroll={animScrollHandler}>
        {array.map((_v, i) => (
          <View sstyle={`pd-16${i % 2 === 0 ? ' bg-#c1c1c1' : ''}`} key={i}>
            <Text sstyle="c-black">Item number {i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      <Animated.View style={[styles.header, animHeaderStyle]}>
        <Animated.Image
          style={[styles.image, animImageStyle]}
          source={barrel}
        />

        <Animated.Text style={[styles.text, animTextStyle]}>
          Total items: {totalItems}
        </Animated.Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = objToRNStyle({
  header:
    'bg-#999 jcfe pd-b-8 aic bd-width-b-1 bd-color-#777 pos-abs w-100% overflow-hidden',
  scroll: 'pd-t-258 bg-white',
  image: 'h-200 w-200 bd-ra-100',
  text: 'pd-t-8 fs-24 c-white',
});
