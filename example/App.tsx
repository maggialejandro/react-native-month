import React from 'react';
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
  dayTextStyle: {
    color: '#2d4150',
    fontWeight: '200',
    fontSize: 15,
  },
  dayOutOfRangeContainerStyle: {},
  dayOutOfRangeTextStyle: {},
  todayContainerStyle: {},
  todayTextStyle: {
    color: BLUE,
  },
  activeDayContainerStyle: {
    backgroundColor: 'transparent',
  },
  activeDayTextStyle: {
    color: 'white',
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
  '2020-03-12': {
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
  },
};

type Props = {};

type State = {
  disableRange: boolean;
  offsets: boolean;
  minDate?: Date;
  maxDate?: Date;
  startDate: Date;
  endDate?: Date;
};

export default class App extends React.PureComponent<Props, State> {
  state = {
    disableRange: true,
    offsets: false,
    startDate: new Date(2022, 9, 11),
    endDate: new Date(2022, 9, 12),
    minDate: new Date(2022, 9, 6),
    maxDate: new Date(2022, 9, 20),
  };

  handlePress = (date: Date) => {
    const { startDate, endDate } = this.state;
    let newStartDate;
    let newEndDate;

    if (this.state.disableRange) {
      newStartDate = date;
      newEndDate = date;
    } else if (startDate) {
      if (endDate) {
        newStartDate = date;
        newEndDate = undefined;
      } else if (date < startDate!) {
        newStartDate = date;
      } else if (date > startDate!) {
        newStartDate = startDate;
        newEndDate = date;
      } else {
        newStartDate = date;
        newEndDate = date;
      }
    } else {
      newStartDate = date;
    }

    const newRange = {
      startDate: newStartDate as Date,
      endDate: newEndDate,
    };

    this.setState(newRange);
  };

  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
          }}
        >
          <Month
            month={this.state.startDate.getMonth()}
            year={this.state.startDate.getFullYear()}
            onPress={this.handlePress}
            theme={THEME}
            showWeekdays
            locale="en"
            firstDayMonday
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            markedDays={markedDays}
            disableRange={this.state.disableRange}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            disabledDays={DISABLED_DAYS}
          />
        </View>
      </SafeAreaView>
    );
  }
}
