import { MarkedDays } from '../../types';
import { isYear, changeMarkedDays, isValidDate } from '../validations';

describe('validations', () => {
  it('should validate a date string', () => {
    expect(isValidDate('2020-02-12')).toBe(true);
    expect(isValidDate('2020-02-1')).toBe(false);
    expect(isValidDate('2020-02-32')).toBe(false);
    expect(isValidDate('2020-02-00')).toBe(false);
    expect(isValidDate('20020-02-01')).toBe(false);
  });

  it('should validate a year number', () => {
    expect(isYear(2020)).toBe(true);
    expect(isYear(-1)).toBe(true);
    expect(isYear(8640000000000001)).toBe(false);
    expect(isYear(0.2)).toBe(false);
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
