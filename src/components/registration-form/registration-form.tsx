import React from 'react';
import './registration-form.scss';

function RegistrationForm(): JSX.Element {
  return (
    <form className="form__registration">
      <h2 className="form__registration-title">Registration:</h2>
      <div className="customer__info">
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
      <div className="address__title">Address:</div>
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
      <button className="registration__button" type="button">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
