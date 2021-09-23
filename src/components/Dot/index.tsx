import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { DayDot, DotTheme } from '../../types';

const styles = StyleSheet.create({
  container: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

interface Props extends DayDot, DotTheme {
  active: boolean;
  index: number;
}

function Dot({
  active,
  color,
  index,
  selectedColor,
  dotContainerStyle,
}: Props) {
  const style = useMemo(() => ({ marginLeft: index === 0 ? 0 : 2 }), [index]);

  return (
    <View
      style={[
        styles.container,
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
