import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeType } from '../../types';

const SHOULD_NOT_UPDATE = true;

interface WeekColumnProps {
  day: string;
  theme: ThemeType;
}

const styles = StyleSheet.create({
  weekColumnContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weekDaysContainer: {
    flexDirection: 'row',
  },
});

const WeekColumn = React.memo<WeekColumnProps>(
  (props: WeekColumnProps) => (
    <View style={[styles.weekColumnContainer, props.theme.weekColumnStyle]}>
      <Text allowFontScaling={false} style={props.theme.weekColumnTextStyle}>
        {props.day}
      </Text>
    </View>
  ),
  () => SHOULD_NOT_UPDATE
);

interface WeekDaysProps {
  days: string[];
  theme: ThemeType;
}

export default React.memo<WeekDaysProps>(
  (props: WeekDaysProps) => (
    <View
      style={[styles.weekDaysContainer, props.theme.weekColumnsContainerStyle]}
    >
      {props.days.map((day: string) => (
        <WeekColumn key={day} day={day} theme={props.theme} />
      ))}
    </View>
  ),
  () => SHOULD_NOT_UPDATE
);
