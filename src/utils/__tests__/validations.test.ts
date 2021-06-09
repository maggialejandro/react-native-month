import { MarkedDays } from '../../types';
import {
  isDay,
  isMonth,
  isYear,
  sameDate,
  changedDate,
  changeMarkedDays,
} from '../validations';

describe('validations', () => {
  it('should validate a day number', () => {
    expect(isDay(1)).toBe(true);
    expect(isDay(32)).toBe(false);
    expect(isDay(0)).toBe(false);
    expect(isDay(-1)).toBe(false);
  });

  it('should validate a month number', () => {
    expect(isMonth(1)).toBe(true);
    expect(isMonth(12)).toBe(false);
    expect(isMonth(0)).toBe(true);
    expect(isMonth(-1)).toBe(false);
  });

  it('should validate a year number', () => {
    expect(isYear(2020)).toBe(true);
    expect(isYear(-1)).toBe(true);
    expect(isYear(8640000000000001)).toBe(false);
    expect(isYear(0.2)).toBe(false);
  });

  it('should validate two date objects equality', () => {
    const one = new Date(2020, 1, 1);
    const two = new Date(2020, 1, 2);

    expect(sameDate(one, two)).toBe(false);
    expect(sameDate(one, one)).toBe(true);
  });

  it('should validate that a date has changed', () => {
    const one = new Date(2020, 1, 1);
    const two = new Date(2020, 1, 2);
    expect(changedDate(undefined, undefined)).toBe(false);
    expect(changedDate(one, undefined)).toBe(true);
    expect(changedDate(undefined, one)).toBe(true);
    expect(changedDate(one, one)).toBe(false);
    expect(changedDate(one, two)).toBe(true);
  });

  it('should validate adding a markedDay dot', () => {
    const markedDays: MarkedDays = {
      '2020-02-12': {
        dots: [
          {
            color: 'red',
            selectedColor: 'blue',
          },
        ],
      },
    };

    const nextMarkedDays: MarkedDays = {
      '2020-02-12': {
        dots: [
          {
            color: 'red',
            selectedColor: 'blue',
          },
        ],
      },
      '2020-02-13': {
        dots: [
          {
            color: 'red',
            selectedColor: 'blue',
          },
        ],
      },
    };

    expect(changeMarkedDays(markedDays, nextMarkedDays)).toBe(true);
  });
});
