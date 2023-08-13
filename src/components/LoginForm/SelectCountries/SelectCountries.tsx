import React, { useState } from 'react';
import { countries } from '../../RegistrationForm/countries';

const SelectCountries: React.FC = () => {
  const [codeAlpha, setCodeAlpha] = useState<string>('');

  const getCountryCode = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedCountry = event.target.value;
    const selectedCountryObject = countries.find(
      (country) => country.country === selectedCountry
    );
    if (selectedCountryObject) {
      setCodeAlpha(selectedCountryObject.code);
    }
  };

  return (
    <select onChange={getCountryCode}>
      {countries.map((country) => (
        <option key={codeAlpha}>{country.country}</option>
      ))}
    </select>
  );
};

export default SelectCountries;
