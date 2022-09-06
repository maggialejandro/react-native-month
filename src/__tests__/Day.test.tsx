import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Day from '../components/Day';

const defaultDay = {
  id: '1',
  key: '1-1',
  date: new Date(),
  isToday: false,
  isActive: false,
  isMonthDate: true,
  isStartDate: false,
  isEndDate: false,
  isVisible: true,
  isWeekend: false,
  isOutOfRange: false,
  isHidden: false,
};

describe('Day', () => {
  it('should render today', () => {
    const today = new Date();
    const props = {
      theme: {},
      onPress: () => {},
      item: {
        ...defaultDay,
        isToday: true,
      },
    };

    const { unmount } = render(<Day {...props} />);

    expect(screen.getByText(today.getDate().toString())).toBeTruthy();

    unmount();
  });

  it('should change from disabled to enabled', () => {
    const onPressHandler = jest.fn();
    const props = {
      theme: {},
      onPress: onPressHandler,
      item: {
        ...defaultDay,
        isVisible: false,
      },
    };

    const { queryByTestId } = render(<Day {...props} />);
    expect(queryByTestId('day-pressable')).toBeNull();

    const { getByTestId } = render(
      <Day {...{ ...props, item: { ...props.item, isVisible: true } }} />
    );

    expect(getByTestId('day-pressable')).toBeDefined();
  });

  it('should return a date', () => {
    const onPressHandler = jest.fn((date) => date);
    const props = {
      theme: {},
      onPress: onPressHandler,
      item: {
        ...defaultDay,
      },
    };

    const { getByTestId } = render(<Day {...props} />);
    const dayPressable = getByTestId('day-pressable');

    fireEvent.press(dayPressable);

    expect(onPressHandler).toHaveReturnedWith(props.item.date);
  });
});
