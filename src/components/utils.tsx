import { addDays, getNumberOfDaysInMonth, clearTime } from '../utils/date';
import { changedDate, sameDate } from '../utils/validations';
import { MonthProps, DayType } from '../types';

const MONDAY_FIRST = [6, 0, 1, 2, 3, 4, 5];

function dayShouldBeActive(
  date: Date,
  startDate: Date,
  endDate: Date,
  firstDayOfMonth: Date,
  lastDayOfMonth: Date
) {
  if (date > lastDayOfMonth) {
    return endDate > lastDayOfMonth && startDate < lastDayOfMonth;
  }

  return startDate < firstDayOfMonth && endDate >= firstDayOfMonth;
}

export function getMonthDays(
  month: number,
  year: number,
  firstDayMonday: boolean,
  disableRange: boolean,
  disabledDays: { [key: string]: any },
  disableOffsetDays: boolean,
  startDate?: Date,
  endDate?: Date,
  minDate?: Date,
  maxDate?: Date
): DayType[] {
  const _minDate = minDate instanceof Date ? clearTime(minDate) : minDate;
  const _maxDate = maxDate instanceof Date ? clearTime(maxDate) : maxDate;
  const _startDate =
    startDate instanceof Date ? clearTime(startDate) : startDate;
  const _endDate = endDate instanceof Date ? clearTime(endDate) : endDate;

  const firstMonthDay = new Date(year, month, 1);
  const lastMonthDay = new Date(year, month + 1, 0);

  const daysToAdd = getNumberOfDaysInMonth(month, year);
  const days: DayType[] = [];

  const startWeekOffset = firstDayMonday
    ? MONDAY_FIRST[firstMonthDay.getDay()]
    : firstMonthDay.getDay();
  const daysToCompleteRows = (startWeekOffset + daysToAdd) % 7;
  const lastRowNextMonthDays = daysToCompleteRows ? 7 - daysToCompleteRows : 0;

  for (let i = -startWeekOffset; i < daysToAdd + lastRowNextMonthDays; i++) {
    const date: Date = addDays(firstMonthDay, i);
    const day = date.getDate();
    const month = date.getMonth();
    const fullDay = day < 10 ? `0${day}` : day.toString();
    const fullMonth = month < 10 ? `0${month + 1}` : (month + 1).toString();
    const id = `${date.getFullYear()}-${fullMonth}-${fullDay}`;

    let isOnSelectableRange = !_minDate && !_maxDate;

    isOnSelectableRange =
      (!_minDate || (_minDate && date >= _minDate)) &&
      (!_maxDate || (_maxDate && date <= _maxDate));

    const isOutOfRange = !!(
      (_minDate && date < _minDate) ||
      (_maxDate && date > _maxDate)
    );
    const isMonthDate = i >= 0 && i < daysToAdd;
    let isStartDate = false;
    let isEndDate = false;
    let isActive = false;

    if (_endDate && _startDate && !disableRange) {
      isStartDate = isMonthDate && sameDate(date, _startDate);
      isEndDate = isMonthDate && sameDate(date, _endDate);

      if (!isMonthDate) {
        isActive = dayShouldBeActive(
          date,
          _startDate,
          _endDate,
          firstMonthDay,
          lastMonthDay
        );
      } else {
        isActive = date >= _startDate && date <= _endDate;
      }
    } else if (
      isMonthDate &&
      _startDate &&
      sameDate(date, _startDate) &&
      isOnSelectableRange
    ) {
      isStartDate = true;
      isEndDate = true;
      isActive = true;
    }

    const today = new Date();
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    days.push({
      id: `${month}-${id}`,
      date,
      isToday,
      isMonthDate,
      isActive,
      isStartDate,
      isEndDate,
      isOutOfRange,
      isVisible:
        isOnSelectableRange &&
        isMonthDate &&
        !disabledDays[`${year}-${fullMonth}-${day}`],
      isHidden: disableOffsetDays && !isMonthDate,
    });
  }

  return days;
}

export function areEqual(prevProps: MonthProps, nextProps: MonthProps) {
  return (
    prevProps.month === nextProps.month &&
    prevProps.year === nextProps.year &&
    prevProps.locale === nextProps.locale &&
    Array.isArray(prevProps.dayNames) === Array.isArray(nextProps.dayNames) &&
    prevProps.showWeekdays === nextProps.showWeekdays &&
    prevProps.disableRange === nextProps.disableRange &&
    prevProps.disableOffsetDays === nextProps.disableOffsetDays &&
    prevProps.firstDayMonday === nextProps.firstDayMonday &&
    !changedDate(prevProps.startDate, nextProps.startDate) &&
    !changedDate(prevProps.endDate, nextProps.endDate) &&
    !changedDate(prevProps.minDate, nextProps.minDate) &&
    !changedDate(prevProps.maxDate, nextProps.maxDate)
  );
}
