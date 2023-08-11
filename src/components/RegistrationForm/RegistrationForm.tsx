import React from 'react';
import './RegistrationForm.scss';

interface MyForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: Address;
}

interface Address {
  street: string;
  city: string;
  postcode: string;
  country: string;
}

function RegistrationForm(): JSX.Element {
  return (
    <form className="registration-form">
      <h2 className="registration-form__title">Registration:</h2>
      <div className="registration-form__customer-info">
        <label htmlFor="email">
          Email
          <input type="email" id="email-field" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" />
        </label>
        <label htmlFor="first-name">
          First name
          <input type="text" id="first-name" />
        </label>
        <label htmlFor="last-name">
          Last name
          <input type="text" id="last-name" />
        </label>
        <label htmlFor="date-birth">
          Date of birth
          <input type="date" id="date-birth" />
        </label>
      </div>
      <div className="registration-form__address">Address:</div>
      <label htmlFor="street">
        Street
        <input type="text" id="street" />
      </label>
      <label htmlFor="city">
        City
        <input type="text" id="city" />
      </label>
      <label htmlFor="postal-code">
        Postal code
        <input type="text" id="postal-code" />
      </label>
      <label htmlFor="country">
        Country
        <input type="text" id="country" />
      </label>
      <button className="registration-form__button" type="button">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
