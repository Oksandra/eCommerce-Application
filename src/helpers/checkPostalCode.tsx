import { postcodeValidator } from 'postcode-validator';
import { countries } from '../components/SelectCountries/countries';

export default function checkPostalCode(data: string): boolean {
  const countryElement = document.querySelector('option.selected');
  let country: string;
  if (countryElement instanceof HTMLElement) {
    country = countryElement?.textContent as string;
  } else {
    country = 'Andora';
  }
  const code = countries.find((el) => el.country === country)?.code as string;
  return postcodeValidator(data, code);
}
