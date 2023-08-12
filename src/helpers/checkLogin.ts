export default function checkLogin(value: string): string {
  if (value.length < 5) return 'Email is too small';
  if (value !== value.trim())
    return 'Email address must not contain leading or trailing whitespace.';
  if (value.split('@').length < 2)
    return "Email address must contain an '@' symbol.";
  if (value.split('@').length > 2 || value.split(' ').length > 1)
    return 'Email address is not correct.';
  const domain: string = value.split('@')[1];
  if (domain.split('.').length < 2 || !domain.split('.')[1])
    return 'Email address must contain a domain name';
  return '';
}
