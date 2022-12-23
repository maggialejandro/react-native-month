import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DayType, MonthProps } from '../../types';
import { getDayNames } from '../../utils/date';
import Day from '../Day';
import { areEqual, getMonthDays } from '../utils';
import WeekDays from '../WeekDays';

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
  },
});

export default React.memo<MonthProps>((props: MonthProps) => {
  const {
    month,
    year,
    onPress,
    locale = 'en',
    dayNames,
    showWeekdays,
    disabledDays = {},
    disableRange = false,
    disableOffsetDays = false,
    firstDayMonday = true,
    startDate,
    endDate,
    minDate,
    maxDate,
    markedDays = {},
    theme = {},
    renderDayContent,
    showSixWeeks = false,
    selectedDate,
  } = props;

  const DAY_NAMES =
    Array.isArray(dayNames) && dayNames.length === 7
      ? dayNames
      : getDayNames(locale, firstDayMonday);

  const days = getMonthDays(
    month,
    year,
    firstDayMonday,
    disableRange,
    disabledDays,
    disableOffsetDays,
    startDate,
    endDate,
    minDate,
    maxDate,
    showSixWeeks,
    selectedDate
  );

  const weeks = [];

  while (days.length) {
    weeks.push(days.splice(0, 7));
  }

  return (
    <>
      {showWeekdays && <WeekDays days={DAY_NAMES} theme={theme} />}
      {weeks.map((week: DayType[], index: number) => (
        <View key={String(index)} style={styles.weekContainer}>
          {week.map((day: DayType) => (
            <Day
              key={day.key}
              item={day}
              dots={markedDays[day.id]?.dots}
              dayTheme={markedDays[day.id]?.theme}
              onPress={onPress}
              theme={theme}
              renderDayContent={renderDayContent}
            />
          ))}
        </View>
      ))}
    </>
  );
}, areEqual);
