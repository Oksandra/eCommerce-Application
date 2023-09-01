import checkDateBirth from './checkDateBirth';

export default function checkDateBirthForProfile(value: string): string {
  if (!checkDateBirth(value))
    return 'Customer of store must be 18 years older!';
  return '';
}
