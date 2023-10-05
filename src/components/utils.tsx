import { addDays, getNumberOfDaysInMonth } from '../utils/date';
import { changedDate, changeMarkedDays, sameDate } from '../utils/validations';
import { MonthProps, DayType } from '../types';

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
  startDate?: Date,
  endDate?: Date,
  minDate?: Date,
  maxDate?: Date,
  showSixWeeks?: boolean
): DayType[] {
  if (minDate instanceof Date) minDate.setHours(0, 0, 0, 0);
  if (maxDate instanceof Date) maxDate.setHours(0, 0, 0, 0);
  if (startDate instanceof Date) startDate.setHours(0, 0, 0, 0);
  if (endDate instanceof Date) endDate.setHours(0, 0, 0, 0);

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
    const id = `${date.getFullYear()}-${fullMonth}-${fullDay}`;

    let isOnSelectableRange = !minDate && !maxDate;

    isOnSelectableRange =
      (!minDate || (minDate && date >= minDate)) &&
      (!maxDate || (maxDate && date <= maxDate));

    const isOutOfRange = !!(
      (minDate && date < minDate) ||
      (maxDate && date > maxDate)
    );
    const isMonthDate = i >= 0 && i < daysToAdd;
    let isStartDate = false;
    let isEndDate = false;
    let isActive = false;

    if (endDate && startDate && !disableRange) {
      isStartDate = isMonthDate && sameDate(date, startDate);
      isEndDate = isMonthDate && sameDate(date, endDate);

      if (!isMonthDate) {
        isActive = false;
      } else {
        isActive = date >= startDate && date <= endDate;
      }
    } else if (isMonthDate && startDate && sameDate(date, startDate)) {
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
      key: `${localMonth}-${id}`,
      id: id,
      date,
      isToday,
      isWeekend,
      isMonthDate,
      isActive,
      isStartDate,
      isEndDate,
      isOutOfRange,
      isVisible: isOnSelectableRange && isMonthDate && !disabledDays[id],
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
    !changedDate(prevProps.startDate, nextProps.startDate) &&
    !changedDate(prevProps.endDate, nextProps.endDate) &&
    !changedDate(prevProps.minDate, nextProps.minDate) &&
    !changedDate(prevProps.maxDate, nextProps.maxDate)
  );
}
