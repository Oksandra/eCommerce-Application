import { postcodeValidator } from 'postcode-validator';
import { countries } from '../components/SelectCountries/countries';

export default function checkPostalCode(data: string): boolean {
  const country = document.querySelector('option.selected')?.textContent;
  const code = countries.find((el) => el.country === country)?.code as string;
  return postcodeValidator(data, code);
}
