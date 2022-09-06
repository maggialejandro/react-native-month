import * as React from 'react';
import renderer from 'react-test-renderer';
import Month from '../components/Month';
import { MonthProps } from '../types';

const defaultProps = {
  month: 2,
  year: 2020,
  onPress: jest.fn(),
};

describe('Month', () => {
  it('should render without week days', () => {
    const props: MonthProps = {
      ...defaultProps,
      showWeekdays: false,
    };

    const tree = renderer.create(<Month {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with week days', () => {
    const props: MonthProps = {
      ...defaultProps,
      showWeekdays: true,
    };

    const tree = renderer.create(<Month {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render ISO month', () => {
    const props: MonthProps = {
      ...defaultProps,
      showWeekdays: true,
      firstDayMonday: true,
    };

    const tree = renderer.create(<Month {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should not render ISO month', () => {
    const props: MonthProps = {
      ...defaultProps,
      showWeekdays: true,
      firstDayMonday: false,
    };

    const tree = renderer.create(<Month {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show six weeks', () => {
    const props: MonthProps = {
      ...defaultProps,
      showSixWeeks: true,
    };

    const tree = renderer.create(<Month {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
