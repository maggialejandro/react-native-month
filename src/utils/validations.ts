import { MarkedDays } from '../types';

const MAX_DATE = new Date(8640000000000000);
const MIN_DATE = new Date(-8640000000000000);

export function isDay(day: number) {
  return Number.isInteger(day) && day >= 1 && day <= 31;
}

export function isMonth(month: number) {
  return Number.isInteger(month) && month >= 0 && month < 12;
}

export function isYear(year: number) {
  return (
    Number.isInteger(year) &&
    year >= MIN_DATE.getFullYear() &&
    year <= MAX_DATE.getFullYear()
  );
}

export function leapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isLeapYear(year: number) {
  return isYear(year) && leapYear(year);
}

export function sameDate(one: Date, other: Date) {
  return (
    one.getDate() === other.getDate() &&
    one.getMonth() === other.getMonth() &&
    one.getFullYear() === other.getFullYear()
  );
}

export function changedDate(one?: Date, other?: Date) {
  return (
    one instanceof Date !== other instanceof Date ||
    (one instanceof Date && other instanceof Date && !sameDate(one, other))
  );
}

export function changeMarkedDays(
  markedDays: MarkedDays = {},
  nextMarkedDays: MarkedDays = {}
) {
  return Object.keys(markedDays).length !== Object.keys(nextMarkedDays).length;
}
