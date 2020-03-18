import React from 'react';
import { View, Text } from 'react-native';
import { ThemeType } from '../../types';

const SHOULD_NOT_UPDATE = true;

interface WeekColumnProps {
  day: string;
  theme: ThemeType;
}

const WeekColumn = React.memo<WeekColumnProps>(
  (props: WeekColumnProps) => (
    <View
      style={[{ flex: 1, alignItems: 'center' }, props.theme.weekColumnStyle]}
    >
      <Text allowFontScaling={false} style={props.theme.weekColumnTextStyle}>
        {props.day}
      </Text>
    </View>
  ),
  () => SHOULD_NOT_UPDATE
);

interface WeekColumnsProps {
  days: string[];
  theme: ThemeType;
}

export default React.memo<WeekColumnsProps>(
  (props: WeekColumnsProps) => (
    <View
      style={[{ flexDirection: 'row' }, props.theme.weekColumnsContainerStyle]}
    >
      {props.days.map((day: string) => (
        <WeekColumn key={day} day={day} theme={props.theme} />
      ))}
    </View>
  ),
  () => SHOULD_NOT_UPDATE
);
