import checkDateBirth from './checkDateBirth';

describe('checkDateBirth function', () => {
  test('returns true for valid date of birth', () => {
    expect(checkDateBirth('1999-08-20')).toBe(true);
  });

  test('returns false for unvalid date of birth', () => {
    expect(checkDateBirth('2010-08-20')).toBe(false);
  });

  test('returns true for date of birth today', () => {
    expect(checkDateBirth('2005-08-13')).toBe(true);
  });

  test('returns false for date of birth in several days', () => {
    expect(checkDateBirth('2005-08-18')).toBe(false);
  });
});
