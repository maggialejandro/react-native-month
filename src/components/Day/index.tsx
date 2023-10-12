import React, { ReactElement, useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { DayType, ThemeType, DayDot, DayTheme } from '../../types';
import Dot from '../Dot';

const styles = StyleSheet.create({
  activeDate: {
    backgroundColor: '#3b5998',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    marginVertical: 5,
    paddingVertical: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: { position: 'absolute', bottom: -5, flexDirection: 'row' },
  endDate: {
    borderBottomRightRadius: 60,
    borderTopRightRadius: 60,
  },
  startDate: {
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
  },
  nonTouchableDayText: { color: '#d3d3d3' },
});

interface NonTouchableDayProps {
  date: Date;
  isActive: boolean;
  isMonthDate: boolean;
  isOutOfRange: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isVisible: boolean;
  isWeekend: boolean;
  isToday: boolean;
  theme: ThemeType;
  dayTheme?: DayTheme;
}

const NonTouchableDay = React.memo<NonTouchableDayProps>(
  (props: NonTouchableDayProps) => {
    const {
      isMonthDate,
      isActive,
      isOutOfRange,
      isStartDate,
      isEndDate,
      theme,
      dayTheme,
      date,
      isWeekend,
      isToday,
    } = props;

    return (
      <View
        style={[
          styles.container,
          theme.dayContainerStyle,
          dayTheme?.dayContainerStyle,
          theme.nonTouchableDayContainerStyle,
          dayTheme?.nonTouchableDayContainerStyle,
          isWeekend ? theme.weekendContainerStyle : {},
          isWeekend ? dayTheme?.weekendContainerStyle : {},
          isToday && !isActive ? theme.todayContainerStyle : {},
          isToday && !isActive ? dayTheme?.todayContainerStyle : {},
          isActive ? styles.activeDate : {},
          isActive ? theme.activeDayContainerStyle : {},
          isActive ? dayTheme?.activeDayContainerStyle : {},
          isOutOfRange ? theme.dayOutOfRangeContainerStyle : {},
          isOutOfRange ? dayTheme?.dayOutOfRangeContainerStyle : {},
          isEndDate ? styles.endDate : {},
          isEndDate ? theme.endDateContainerStyle : {},
          isEndDate ? dayTheme?.endDateContainerStyle : {},
          isStartDate ? styles.startDate : {},
          isStartDate ? theme.startDateContainerStyle : {},
          isStartDate ? dayTheme?.startDateContainerStyle : {},
        ]}
      >
        <View
          style={[
            styles.content,
            theme.dayContentStyle,
            dayTheme?.dayContentStyle,
            isWeekend ? theme.weekendContentStyle : {},
            isWeekend ? dayTheme?.weekendContentStyle : {},
            isActive ? theme.activeDayContentStyle : {},
            isActive ? dayTheme?.activeDayContentStyle : {},
          ]}
        >
          <Text
            style={[
              styles.nonTouchableDayText,
              theme.nonTouchableDayTextStyle,
              dayTheme?.nonTouchableDayTextStyle,
              isWeekend ? theme.weekendTextStyle : {},
              isWeekend ? dayTheme?.weekendTextStyle : {},
              isMonthDate ? theme.nonTouchableLastMonthDayTextStyle : {},
              isMonthDate ? dayTheme?.nonTouchableLastMonthDayTextStyle : {},
              isToday ? theme.todayTextStyle : {},
              isOutOfRange ? theme.dayOutOfRangeTextStyle : {},
              isOutOfRange ? dayTheme?.dayOutOfRangeTextStyle : {},
            ]}
          >
            {date.getDate()}
          </Text>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isActive === nextProps.isActive &&
      prevProps.isVisible === nextProps.isVisible &&
      prevProps.isStartDate === nextProps.isStartDate &&
      prevProps.isEndDate === nextProps.isEndDate
    );
  }
);

interface Props {
  onPress: (date: Date) => void;
  dots?: DayDot[];
  dayTheme?: DayTheme;
  item: DayType;
  theme: ThemeType;
  renderDayContent?: (day: DayType) => ReactElement;
}

const Day = React.memo<Props>(
  (props: Props) => {
    const {
      item: {
        date,
        isVisible,
        isActive,
        isStartDate,
        isEndDate,
        isMonthDate,
        isOutOfRange,
        isToday,
        isWeekend,
        isHidden,
      },
      dots = [],
      dayTheme,
      theme,
    } = props;

    const dayTextStyle = useMemo(
      () => ({
        color: isActive ? 'white' : 'black',
      }),
      [isActive]
    );

    const renderDot = useCallback(
      (d: DayDot, i) => {
        return (
          <Dot
            key={i.toString()}
            active={isActive}
            index={i}
            {...d}
            dotContainerStyle={theme.dotContainerStyle}
          />
        );
      },
      [isActive, theme.dotContainerStyle]
    );

    if (isHidden) {
      return <View style={[styles.container, theme.hiddenDayContainerStyle]} />;
    }

    if (!isVisible) {
      return (
        <NonTouchableDay
          isActive={isActive}
          date={date}
          theme={theme}
          isMonthDate={isMonthDate}
          isOutOfRange={isOutOfRange}
          isStartDate={isStartDate}
          isEndDate={isEndDate}
          isVisible={isVisible}
          isWeekend={isWeekend}
          isToday={isToday}
        />
      );
    }

    // Should render a maximum of 3 dots
    const finalDots = dots.slice(0, 3);

    return (
      <TouchableOpacity
        testID="day-pressable"
        style={[
          styles.container,
          theme.dayContainerStyle,
          dayTheme?.dayContainerStyle,
          isWeekend ? theme.weekendContainerStyle : {},
          isWeekend ? dayTheme?.weekendContainerStyle : {},
          isToday && !isActive ? theme.todayContainerStyle : {},
          dayTheme && !isActive ? dayTheme.todayContainerStyle : {},
          isActive ? styles.activeDate : {},
          isActive ? theme.activeDayContainerStyle : {},
          isActive ? dayTheme?.activeDayContainerStyle : {},
          isStartDate ? styles.startDate : {},
          isStartDate ? theme.startDateContainerStyle : {},
          isStartDate ? dayTheme?.startDateContainerStyle : {},
          isEndDate ? styles.endDate : {},
          isEndDate ? theme.endDateContainerStyle : {},
          isEndDate ? dayTheme?.endDateContainerStyle : {},
        ]}
        onPress={() => props.onPress(props.item.date)}
      >
        {props.renderDayContent ? (
          props.renderDayContent(props.item)
        ) : (
          <View
            style={[
              styles.content,
              theme.dayContentStyle,
              dayTheme ? dayTheme.dayContentStyle : {},
              isWeekend ? theme.weekendContentStyle : {},
              isWeekend ? dayTheme?.weekendContentStyle : {},
              isActive ? theme.activeDayContentStyle : {},
              isActive ? dayTheme?.activeDayContentStyle : {},
            ]}
          >
            <Text
              style={[
                dayTextStyle,
                theme.dayTextStyle,
                dayTheme && dayTheme.dayTextStyle,
                isWeekend ? theme.weekendTextStyle : {},
                isToday ? theme.todayTextStyle : {},
                isToday ? dayTheme?.todayTextStyle : {},
                isActive ? theme.activeDayTextStyle : {},
                isActive ? dayTheme?.activeDayTextStyle : {},
              ]}
            >
              {date.getDate()}
            </Text>
            <View style={styles.dotsContainer}>{finalDots.map(renderDot)}</View>
          </View>
        )}
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.onPress === nextProps.onPress &&
      prevProps.item.isActive === nextProps.item.isActive &&
      prevProps.item.isVisible === nextProps.item.isVisible &&
      prevProps.item.isStartDate === nextProps.item.isStartDate &&
      prevProps.item.isEndDate === nextProps.item.isEndDate &&
      prevProps.renderDayContent === nextProps.renderDayContent &&
      prevProps.dots?.length === nextProps.dots?.length
    );
  }
);

export default Day;
