import { DateString, MarkedDays } from '../types';

const MAX_DATE = new Date(8640000000000000);
const MIN_DATE = new Date(-8640000000000000);

export function isYear(year: number) {
  return (
    Number.isInteger(year) &&
    year >= MIN_DATE.getFullYear() &&
    year <= MAX_DATE.getFullYear()
  );
}

export function isValidDate(str: string): str is DateString {
  return (
    str.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/) !== null
  );
}

export function leapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isLeapYear(year: number) {
  return isYear(year) && leapYear(year);
}

export function changeMarkedDays(
  markedDays: MarkedDays = {},
  nextMarkedDays: MarkedDays = {}
) {
  return Object.keys(markedDays).length !== Object.keys(nextMarkedDays).length;
}
