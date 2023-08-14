import React from 'react';
import { countries } from '../../RegistrationForm/countries';

const SelectCountries: React.FC = () => {
  const selectCountry = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const optionsArr = event.target.options;
    for (let i = 0; i < optionsArr.length; i += 1) {
      if (optionsArr[i].selected) {
        optionsArr[i].classList.add('selected');
      } else {
        optionsArr[i].classList.remove('selected');
      }
    }
  };

  return (
    <select onChange={selectCountry}>
      {countries.map((country) => (
        <option key={country.code}>{country.country}</option>
      ))}
    </select>
  );
};

export default SelectCountries;
