import { addDays, getDayNames, getNumberOfDaysInMonth } from '../date';

describe('Date', () => {
  it('should add days', () => {
    const one = new Date(2020, 1, 1);
    const added = addDays(one, 2);

    expect(added.getDate()).toBe(3);
  });

  it('should subtract days', () => {
    const one = new Date(2020, 1, 1);
    const added = addDays(one, -3);

    expect(added.getDate()).toBe(29);
    expect(added.getMonth()).toBe(0);
  });
});

describe('date utils', () => {
  it('should return the number of days in a month', () => {
    const leap = getNumberOfDaysInMonth(1, 2020);
    expect(leap).toBe(29);

    const notLeap = getNumberOfDaysInMonth(1, 2019);
    expect(notLeap).toBe(28);
  });

  it('should get day names', () => {
    const days = getDayNames('br', false);
    expect(days).toBeDefined();
    expect(days[0]).toBe('Dom');
  });
});
