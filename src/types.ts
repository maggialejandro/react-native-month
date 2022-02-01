import { ComponentType } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type LocaleType = 'es' | 'en' | 'fr' | 'br' | 'zh';

interface DayTheme {
  activeDayColor?: string;
  activeDayContainerStyle?: ViewStyle;
  activeDayContentStyle?: ViewStyle;
  activeDayTextStyle?: TextStyle;
  dayContainerStyle?: ViewStyle;
  dayContentStyle?: ViewStyle;
  dayOutOfRangeContainerStyle?: ViewStyle;
  dayOutOfRangeTextStyle?: TextStyle;
  dayTextStyle?: TextStyle;
  startDateContainerStyle?: ViewStyle;
  endDateContainerStyle?: ViewStyle;
  nonTouchableDayContainerStyle?: ViewStyle;
  nonTouchableDayTextStyle?: TextStyle;
  nonTouchableLastMonthDayTextStyle?: TextStyle;
  todayContainerStyle?: ViewStyle;
  todayTextStyle?: TextStyle;
}

export interface DotTheme {
  dotContainerStyle?: ViewStyle;
}

export interface ThemeType extends DayTheme, DotTheme {
  weekColumnsContainerStyle?: ViewStyle;
  weekColumnStyle?: ViewStyle;
  weekColumnTextStyle?: TextStyle;
}

export type DayDot = {
  /**
   * Color used when the day is not selected
   *
   * @type {string}
   */
  color: string;

  /**
   * Color used when the day is selected
   *
   * @type {string}
   */
  selectedColor: string;
};

export type DayType = {
  date: Date;
  id: string;
  key: string;
  isActive: boolean;
  isEndDate: boolean;
  isHidden: boolean;
  isMonthDate: boolean;
  isOutOfRange: boolean;
  isStartDate: boolean;
  isToday: boolean;
  isVisible: boolean;
};

type MarkedDay = {
  dots: DayDot[];
};

export type MarkedDays = Record<string, MarkedDay>;

export interface MonthProps {
  /**
   * Month number [0 - 11]
   *
   * @type {number}
   * @memberof MonthProps
   */
  month: number;

  /**
   * Year number
   *
   * @type {number}
   * @memberof MonthProps
   */
  year: number;

  /**
   * Day pressed callback
   *
   * @memberof MonthProps
   * @returns {Date}
   */
  onPress: (date: Date) => void;

  locale?: LocaleType;
  dayNames?: string[];

  /**
   *
   *
   * @type {boolean}
   * @memberof MonthProps
   */
  showWeekdays?: boolean;

  /**
   * Disable range selection
   *
   * @type {boolean}
   * @default false
   * @memberof MonthProps
   */
  disableRange?: boolean;

  /**
   * Hide days that do not belong to the month
   *
   * @type {boolean}
   * @default false
   * @memberof MonthProps
   */
  disableOffsetDays?: boolean;

  /**
   * Show monday as first day of the week
   *
   * @type {boolean}
   * @default true
   * @description Monday is the first day of the week according to the international standard ISO 8601
   * @memberof MonthProps
   */
  firstDayMonday?: boolean;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  markedDays?: MarkedDays;
  theme?: ThemeType;
  renderDayContent?: (day: DayType) => ComponentType;
  disabledDays?: { [key: string]: any };
}
