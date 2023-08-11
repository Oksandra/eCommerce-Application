export function checkPassword(value: string): string {
  if (value.length < 8) return 'Password must be at least 8 characters long.';
  if (!/[A-Z]/.test(value))
    return 'Password must contain at least one uppercase letter.';
  if (!/[a-z]/.test(value))
    return 'Password must contain at least one lowercase letter.';
  if (!/[0-9]/.test(value)) return 'Password must contain at least one digit.';
  if (value.trim() !== value)
    return 'Password must not contain leading or trailing whitespace.';
  if (!/[!@#$%^&*]/.test(value))
    return 'Password must contain at least one special character (e.g., !@#$%^&*).';
  return '';
}
