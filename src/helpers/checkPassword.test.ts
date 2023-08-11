import { checkPassword } from './checkPassword';

describe('checkPassword function', () => {
  test('returns empty string for valid password', () => {
    expect(checkPassword('SecurePa$$123')).toBe('');
  });

  test('returns error message for password that is too short', () => {
    expect(checkPassword('short')).toBe(
      'Password must be at least 8 characters long.'
    );
  });

  test('returns error message for password without uppercase letter', () => {
    expect(checkPassword('nopassword')).toBe(
      'Password must contain at least one uppercase letter.'
    );
  });

  test('returns error message for password without lowercase letter', () => {
    expect(checkPassword('NOPASSWORD123')).toBe(
      'Password must contain at least one lowercase letter.'
    );
  });

  test('returns error message for password without digit', () => {
    expect(checkPassword('NoDigitsHere')).toBe(
      'Password must contain at least one digit.'
    );
  });

  test('returns error message for password with leading/trailing whitespace', () => {
    expect(checkPassword('  Password123  ')).toBe(
      'Password must not contain leading or trailing whitespace.'
    );
  });

  test('returns error message for password without special character', () => {
    expect(checkPassword('SecurePassword123')).toBe(
      'Password must contain at least one special character (e.g., !@#$%^&*).'
    );
  });
});
