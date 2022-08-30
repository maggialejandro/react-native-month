import React, { ReactElement, useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { DayType, ThemeType, DayDot } from '../../types';
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
      date,
      isWeekend,
      isToday,
    } = props;

    return (
      <View
        style={[
          styles.container,
          theme.dayContainerStyle,
          theme.nonTouchableDayContainerStyle,
          isWeekend ? theme.weekendContainerStyle : {},
          isToday && !isActive ? theme.todayContainerStyle : {},
          isActive ? styles.activeDate : {},
          isActive ? theme.activeDayContainerStyle : {},
          isOutOfRange ? theme.dayOutOfRangeContainerStyle : {},
          isEndDate ? styles.endDate : {},
          isEndDate ? theme.endDateContainerStyle : {},
          isStartDate ? styles.startDate : {},
          isStartDate ? theme.startDateContainerStyle : {},
        ]}
      >
        <View
          style={[
            styles.content,
            theme.dayContentStyle,
            isWeekend ? theme.weekendContentStyle : {},
            isActive ? theme.activeDayContentStyle : {},
          ]}
        >
          <Text
            style={[
              styles.nonTouchableDayText,
              theme.nonTouchableDayTextStyle,
              isWeekend ? theme.weekendTextStyle : {},
              isMonthDate ? theme.nonTouchableLastMonthDayTextStyle : {},
              isToday ? theme.todayTextStyle : {},
              isOutOfRange ? theme.dayOutOfRangeTextStyle : {},
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
      return <View style={[styles.container]} />;
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
        style={[
          styles.container,
          theme.dayContainerStyle,
          isWeekend ? theme.weekendContainerStyle : {},
          isToday && !isActive ? theme.todayContainerStyle : {},
          isActive ? styles.activeDate : {},
          isActive ? theme.activeDayContainerStyle : {},
          isStartDate ? styles.startDate : {},
          isStartDate ? theme.startDateContainerStyle : {},
          isEndDate ? styles.endDate : {},
          isEndDate ? theme.endDateContainerStyle : {},
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
              isWeekend ? theme.weekendContentStyle : {},
              isActive ? theme.activeDayContentStyle : {},
            ]}
          >
            <Text
              style={[
                dayTextStyle,
                theme.dayTextStyle,
                isWeekend ? theme.weekendTextStyle : {},
                isToday ? theme.todayTextStyle : {},
                isActive ? theme.activeDayTextStyle : {},
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
      prevProps.item.isActive === nextProps.item.isActive &&
      prevProps.item.isVisible === nextProps.item.isVisible &&
      prevProps.item.isStartDate === nextProps.item.isStartDate &&
      prevProps.item.isEndDate === nextProps.item.isEndDate &&
      prevProps.renderDayContent === nextProps.renderDayContent
    );
  }
);

export default Day;
