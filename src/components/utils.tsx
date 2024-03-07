import { addDays, getNumberOfDaysInMonth } from '../utils/date';
import { changeMarkedDays } from '../utils/validations';
import { MonthProps, DayType, DateString } from '../types';

const SATURDAY = 6;
const SUNDAY = 0;
const MONDAY_FIRST = [6, 0, 1, 2, 3, 4, 5];

export function getMonthDays(
  month: number,
  year: number,
  firstDayMonday: boolean,
  disableRange: boolean,
  disabledDays: { [key: string]: any },
  disableOffsetDays: boolean,
  startDate?: DateString,
  endDate?: DateString,
  minDate?: DateString,
  maxDate?: DateString,
  showSixWeeks?: boolean
): DayType[] {
  const firstMonthDay = new Date(year, month, 1);

  const daysToAdd = getNumberOfDaysInMonth(month, year);
  const days: DayType[] = [];

  const startWeekOffset = firstDayMonday
    ? MONDAY_FIRST[firstMonthDay.getDay()]
    : firstMonthDay.getDay();
  const daysToCompleteRows = (startWeekOffset + daysToAdd) % 7;
  let lastRowNextMonthDays = daysToCompleteRows ? 7 - daysToCompleteRows : 0;
  const totalDays = startWeekOffset + daysToAdd + lastRowNextMonthDays;
  const sixWeekDays = 42;

  if (showSixWeeks && totalDays !== sixWeekDays) {
    lastRowNextMonthDays += sixWeekDays - totalDays;
  }

  for (let i = -startWeekOffset; i < daysToAdd + lastRowNextMonthDays; i++) {
    const date: Date = addDays(firstMonthDay, i);
    const day = date.getDate();
    const localMonth = date.getMonth();
    const fullDay = day < 10 ? `0${day}` : day.toString();
    const fullMonth =
      localMonth < 9 ? `0${localMonth + 1}` : (localMonth + 1).toString();
    const dateString = `${date.getFullYear()}-${fullMonth}-${fullDay}`;

    let isOnSelectableRange = !minDate && !maxDate;

    isOnSelectableRange =
      (!minDate || (!!minDate && dateString >= minDate)) &&
      (!maxDate || (!!maxDate && dateString <= maxDate));

    const isOutOfRange = !!(
      (minDate && dateString < minDate) ||
      (maxDate && dateString > maxDate)
    );
    const isMonthDate = i >= 0 && i < daysToAdd;
    let isStartDate = false;
    let isEndDate = false;
    let isActive = false;

    if (endDate && startDate && !disableRange) {
      isStartDate = isMonthDate && dateString === startDate;
      isEndDate = isMonthDate && dateString === endDate;

      if (!isMonthDate) {
        isActive = false;
      } else {
        isActive = dateString >= startDate && dateString <= endDate;
      }
    } else if (isMonthDate && startDate && dateString === startDate) {
      isStartDate = true;
      isEndDate = true;
      isActive = true;
    }

    const today = new Date();
    const dow = date.getDay();
    const isWeekend = dow === SATURDAY || dow === SUNDAY;
    const isToday =
      day === today.getDate() &&
      localMonth === today.getMonth() &&
      year === today.getFullYear();

    days.push({
      key: `${localMonth}-${dateString}`,
      id: dateString,
      date: dateString,
      isToday,
      isWeekend,
      isMonthDate,
      isActive,
      isStartDate,
      isEndDate,
      isOutOfRange,
      isVisible:
        isOnSelectableRange && isMonthDate && !disabledDays[dateString],
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
    !changeMarkedDays(prevProps.markedDays, nextProps.markedDays) &&
    prevProps.startDate === nextProps.startDate &&
    prevProps.endDate === nextProps.endDate &&
    prevProps.minDate === nextProps.minDate &&
    prevProps.maxDate === nextProps.maxDate
  );
}
