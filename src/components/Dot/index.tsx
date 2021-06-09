import React from 'react';
import { View, ViewStyle } from 'react-native';

import { DayDot, DotTheme } from '../../types';

interface Props extends DayDot, DotTheme {
  active: boolean;
  style: ViewStyle;
}

function Dot({
  active,
  color,
  selectedColor,
  dotContainerStyle,
  style,
}: Props) {
  return (
    <View
      style={[
        {
          width: 4,
          height: 4,
          borderRadius: 2,
        },
        style,
        dotContainerStyle,
        {
          backgroundColor: active ? selectedColor : color,
        },
      ]}
    />
  );
}

export default Dot;
