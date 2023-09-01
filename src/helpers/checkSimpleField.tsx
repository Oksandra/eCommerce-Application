export default function checkSimpleField(value: string): string {
  if (value.length < 1)
    return 'The field is required and must contain at least one character!';
  if (value !== value.trim())
    return 'The field must not contain leading or trailing whitespace.';
  if (/[0-9]/.test(value)) return 'The field must not contain digits.';
  if (/[!@#$%^&*]/.test(value))
    return 'The field must not contain special characters (e.g., !@#$%^&*).';
  return '';
}
