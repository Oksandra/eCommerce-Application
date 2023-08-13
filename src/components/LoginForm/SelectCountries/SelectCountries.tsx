import React from 'react';
import { countries } from '../../RegistrationForm/countries';

export default function SelectCountries(): JSX.Element {
  const arr = [];
  for (let i = 1; i < countries.length; i += 1) {
    arr.push(<option>{countries[i].country}</option>);
  }
  return <select className="address__select">{arr}</select>;
}
