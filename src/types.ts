/* eslint-disable flowtype/no-types-missing-file-annotation */

import { ComponentType } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type LocaleType = 'es' | 'en' | 'fr' | 'br';

interface DayTheme {
  activeDayColor?: string;
  activeDayContainerStyle?: ViewStyle;
  activeDayTextStyle?: TextStyle;
  dayContainerStyle?: ViewStyle;
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

export interface ThemeType extends DayTheme {
  weekColumnsContainerStyle?: ViewStyle;
  weekColumnStyle?: ViewStyle;
  weekColumnTextStyle?: TextStyle;
}

export type DayType = {
  date: Date;
  id: string;
  isActive: boolean;
  isEndDate: boolean;
  isHidden: boolean;
  isMonthDate: boolean;
  isOutOfRange: boolean;
  isStartDate: boolean;
  isToday: boolean;
  isVisible: boolean;
};

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
  theme?: ThemeType;
  renderDayContent?: (day: DayType) => ComponentType;
  disabledDays?: { [key: string]: any };
}
