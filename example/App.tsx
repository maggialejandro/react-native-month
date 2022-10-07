import React, { useCallback, useState } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { Month, ThemeType, MarkedDays } from 'react-native-month';

const BLUE = '#6d95da';

const THEME: ThemeType = {
  weekColumnsContainerStyle: {},
  weekColumnStyle: {
    paddingVertical: 10,
  },
  weekColumnTextStyle: {
    color: '#b6c1cd',
    fontSize: 13,
  },
  nonTouchableDayContainerStyle: {},
  nonTouchableDayTextStyle: {},
  startDateContainerStyle: {},
  endDateContainerStyle: {},
  dayContainerStyle: {
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
  dayContentStyle: {
    width: 36,
    height: 36,
  },
  activeDayContentStyle: {
    backgroundColor: '#1890FF',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDayTextStyle: {
    color: 'white',
  },
  dayTextStyle: {
    color: '#2d4150',
    fontWeight: '200',
    fontSize: 15,
  },
  dayOutOfRangeContainerStyle: {},
  dayOutOfRangeTextStyle: {},
  weekendContainerStyle: {
    backgroundColor: 'rgb(249,250,252)',
  },
  todayContainerStyle: {},
  todayTextStyle: {
    color: BLUE,
  },
  activeDayContainerStyle: {
    backgroundColor: 'transparent',
  },
  nonTouchableLastMonthDayTextStyle: {},
};

const truthyValue = true;

const DISABLED_DAYS = {
  '2020-03-20': truthyValue,
  '2020-03-10': truthyValue,
  '2022-10-15': truthyValue,
};

const markedDays: MarkedDays = {
  '2022-10-12': {
    dots: [
      {
        color: 'red',
        selectedColor: 'green',
      },
      {
        color: 'blue',
        selectedColor: 'yellow',
      },
    ],
    theme: {
      dayContentStyle: {
        backgroundColor: 'green',
        borderRadius: 8,
      },
      dayTextStyle: {
        color: 'lightgrey',
      },
    },
  },
};

const INITIAL_STATE = {
  startDate: new Date(2022, 9, 11),
  endDate: new Date(2022, 9, 12),
  minDate: new Date(2022, 9, 6),
  maxDate: new Date(2022, 9, 20),
};

const App = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    INITIAL_STATE.startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    INITIAL_STATE.endDate
  );

  const handleChangeDate = useCallback(
    (date) => {
      if (startDate) {
        if (endDate) {
          setStartDate(date);
          setEndDate(undefined);
        } else if (date < startDate) {
          setStartDate(date);
        } else if (date > startDate) {
          setEndDate(date);
        } else {
          setStartDate(date);
          setEndDate(date);
        }
      } else {
        setStartDate(date);
      }
    },
    [startDate, endDate]
  );

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Month
          month={startDate.getMonth()}
          year={startDate.getFullYear()}
          onPress={handleChangeDate}
          theme={THEME}
          showWeekdays
          locale="en"
          firstDayMonday
          minDate={INITIAL_STATE.minDate}
          maxDate={INITIAL_STATE.maxDate}
          markedDays={markedDays}
          disableRange={false}
          startDate={startDate}
          endDate={endDate}
          disabledDays={DISABLED_DAYS}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
