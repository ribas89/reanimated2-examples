import React from 'react';
import Animated from 'react-native-reanimated';
import {objToRNStyle} from 'react-native-string-style';

type ViewProps = {
  sstyle?: string;
  children?: any;
  style?: any;
};

export const View: React.FC<ViewProps> = ({
  children,
  sstyle,
  style,
  ...props
}) => {
  const stringStyle = sstyle ? objToRNStyle({sstyle}).sstyle : {};
  return (
    <Animated.View style={[stringStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};
