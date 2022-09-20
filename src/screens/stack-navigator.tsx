import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {DragonBallScreen} from './dragon-ball-screen';
import {FallBallScreen} from './fall-ball-screen';
import {HomeScreen} from './home-screen';
import {ImageDownScreen} from './image-down';
import {ScrollListScreen} from './scroll-list';
import {TextUpScreen} from './text-up-screen';

const Stack = createNativeStackNavigator<{[key: string]: any}>();
export const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Text Up" component={TextUpScreen} />
      <Stack.Screen name="Image Down" component={ImageDownScreen} />
      <Stack.Screen name="Fall Ball" component={FallBallScreen} />
      <Stack.Screen name="Scroll List" component={ScrollListScreen} />
      <Stack.Screen name="Dragon ball" component={DragonBallScreen} />
    </Stack.Navigator>
  );
};
