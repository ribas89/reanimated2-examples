import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StatusBar} from 'react-native';

import {Text, View} from '../components';
import {navigate, navigationRef} from './root-navigation';

export const HomeScreen: React.FC<any> = () => {
  const [routes, setRoutes] = useState<any>([]);
  useEffect(() => {
    setTimeout(() => {
      const _routes = navigationRef?.current?.getRootState?.()?.routeNames;
      setRoutes(_routes);
    }, 100);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View>
        {routes
          ?.filter(r => r !== 'Home')
          .map((r: string, i: number) => (
            <TouchableOpacity key={i} onPress={() => navigate({name: r})}>
              <View sstyle="pd-16 mg-t-8 bg-#e1e1e1">
                <Text sstyle="fs-24">{r}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </>
  );
};
