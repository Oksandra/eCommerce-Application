import React from 'react';
import './RegistrationForm.scss';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyForm>();

  const submit: SubmitHandler<MyForm> = (data) => {
    console.log(data);
  };

  const error: SubmitErrorHandler<MyForm> = (data) => {
    console.log(data);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit(submit, error)}>
      <h2 className="registration-form__title">Creat your account:</h2>
      <div className="registration-form__customer-info">
        <label htmlFor="email">
          Email <span className="star">*</span>
          <input
            type="email"
            id="email-field"
            {...register('email', { required: true })}
          />
        </label>
        <div className="input-error">
          {errors.email && <p>Incorrect email!</p>}
        </div>
        <label htmlFor="password">
          Password <span className="star">*</span>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
        </label>
        <label htmlFor="first-name">
          First name <span className="star">*</span>
          <input
            type="text"
            id="first-name"
            {...register('firstName', { required: true })}
          />
        </label>
        <label htmlFor="last-name">
          Last name <span className="star">*</span>
          <input
            type="text"
            id="last-name"
            {...register('lastName', { required: true })}
          />
        </label>
        <label htmlFor="date-birth">
          Date of birth <span className="star">*</span>
          <input
            type="date"
            id="date-birth"
            {...register('dateOfBirth', { required: true })}
          />
        </label>
      </div>
      <div className="registration-form__address">Address:</div>
      <label htmlFor="street">
        Street <span className="star">*</span>
        <input
          type="text"
          id="street"
          {...register('address.street', { required: true })}
        />
      </label>
      <label htmlFor="city">
        City <span className="star">*</span>
        <input
          type="text"
          id="city"
          {...register('address.city', { required: true })}
        />
      </label>
      <label htmlFor="postal-code">
        Postal code <span className="star">*</span>
        <input
          type="text"
          id="postal-code"
          {...register('address.postcode', { required: true })}
        />
      </label>
      <label htmlFor="country">
        Country <span className="star">*</span>
        <input
          type="text"
          id="country"
          {...register('address.country', { required: true })}
        />
      </label>
      <button className="registration-form__button" type="submit">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
