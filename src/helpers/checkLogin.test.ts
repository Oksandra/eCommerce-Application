import checkLogin from './checkLogin';

describe('checkLogin function', () => {
  test('returns empty string for valid email', () => {
    expect(checkLogin('test@example.com')).toBe('');
  });

  test('returns error message for email with leading/trailing whitespace', () => {
    expect(checkLogin('  test@example.com  ')).toBe(
      'Email address must not contain leading or trailing whitespace.'
    );
  });

  test('returns error message for email without "@" symbol', () => {
    expect(checkLogin('testexample.com')).toBe(
      "Email address must contain an '@' symbol."
    );
  });

  test('returns error message for email with multiple "@" symbols', () => {
    expect(checkLogin('test@exa@mple.com')).toBe(
      'Email address is not correct.'
    );
  });

  test('returns error message for email with incorrect domain', () => {
    expect(checkLogin('test@domain')).toBe(
      'Email address must contain a domain name'
    );
  });

  test('returns error message for email without domain name', () => {
    expect(checkLogin('test@domain.')).toBe(
      'Email address must contain a domain name'
    );
  });
});
