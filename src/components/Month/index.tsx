import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DayType, MonthProps } from '../../types';
import { getDayNames } from '../../utils/date';
import { getMonthDays, areEqual } from '../utils';
import WeekDays from '../WeekDays';
import Day from '../Day';
import { isValidDate } from '../../utils/validations';

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
  } = props;

  if (startDate && !isValidDate(startDate)) {
    console.error('Invalid startDate format, should be a string YYYY-MM-DD');
  }
  if (endDate && !isValidDate(endDate)) {
    console.error('Invalid endDate format, should be a string YYYY-MM-DD');
  }
  if (minDate && !isValidDate(minDate)) {
    console.error('Invalid minDate format, should be a string YYYY-MM-DD');
  }
  if (maxDate && !isValidDate(maxDate)) {
    console.error('Invalid maxDate format, should be a string YYYY-MM-DD');
  }

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
    showSixWeeks
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
