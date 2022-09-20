import React from 'react';
import Animated from 'react-native-reanimated';
import {objToRNStyle} from 'react-native-string-style';

type TextPropss = {
  sstyle?: string;
  children?: any;
  style?: any;
};

export const Text: React.FC<TextPropss> = ({
  children,
  sstyle,
  style,
  ...props
}) => {
  const stringStyle = sstyle ? objToRNStyle({sstyle}).sstyle : {};
  return (
    <Animated.Text style={[stringStyle, style]} {...props}>
      {children}
    </Animated.Text>
  );
};
