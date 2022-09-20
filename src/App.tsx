/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {navigationRef} from './screens/root-navigation';
import {StackNavigator} from './screens/stack-navigator';
import Animated from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({text: true});

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
