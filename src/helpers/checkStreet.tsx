export default function checkStreet(value: string): string {
  if (value.length < 1)
    return 'The field is required and must contain at least one character!';
  return '';
}
