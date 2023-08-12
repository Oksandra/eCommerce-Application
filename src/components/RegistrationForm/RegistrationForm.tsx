import React from 'react';
import './RegistrationForm.scss';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
/* import checkLogin from '../../helpers/checkLogin'; */

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
    reset,
    formState: { errors, isValid },
  } = useForm<MyForm>({
    mode: 'all',
  });

  const submit: SubmitHandler<MyForm> = (data) => {
    console.log(data);
    reset();
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
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: {
                value: true,
                message: 'The field is required',
              },
              pattern: /^(.+)@(.+)\.(.+)$/,
            })}
          />
        </label>
        <div className="input-error">
          {errors.email && <p>{errors.email.message || 'Incorrect email!'}</p>}
        </div>
        <label htmlFor="password">
          Password <span className="star">*</span>
          <input
            type="password"
            id="password"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', {
              required: true,
              minLength: {
                value: 8,
                message: 'Minimum 8 characters!',
              },
              pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g,
            })}
          />
        </label>
        <div className="input-error">
          {errors.password && (
            <p>
              {errors.password.message ||
                'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number!'}
            </p>
          )}
        </div>
        <label htmlFor="first-name">
          First name <span className="star">*</span>
          <input
            type="text"
            id="first-name"
            aria-invalid={errors.firstName ? 'true' : 'false'}
            {...register('firstName', {
              required: {
                value: true,
                message:
                  'The field is required and must contain at least one character!',
              },
              pattern: /^[A-z][a-z]*$/g,
            })}
          />
        </label>
        <div className="input-error">
          {errors.firstName && (
            <p>
              {errors.firstName.message ||
                'First name must not contain special characters or numbers!'}
            </p>
          )}
        </div>
        <label htmlFor="last-name">
          Last name <span className="star">*</span>
          <input
            type="text"
            id="last-name"
            aria-invalid={errors.lastName ? 'true' : 'false'}
            {...register('lastName', {
              required: {
                value: true,
                message:
                  'The field is required and must contain at least one character!',
              },
              pattern: /^[A-z][a-z]*$/g,
            })}
          />
        </label>
        <div className="input-error">
          {errors.lastName && (
            <p>
              {errors.lastName.message ||
                'Last name must not contain special characters or numbers!'}
            </p>
          )}
        </div>
        <label htmlFor="date-birth">
          Date of birth <span className="star">*</span>
          <input
            type="date"
            id="date-birth"
            aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
            {...register('dateOfBirth', {
              required: {
                value: true,
                message: 'The field is required!',
              },
              validate: (data): boolean => {
                const userDate = new Date(data).getTime();
                const currentDate = new Date().getTime();
                const msInYear = 1000 * 60 * 60 * 24 * 365;
                const age = Math.floor((currentDate - userDate) / msInYear);
                return age >= 18;
              },
            })}
          />
        </label>
        <div className="input-error">
          {errors.dateOfBirth && (
            <p>
              {errors.dateOfBirth.message ||
                'Customer of store must be 18 years older!'}
            </p>
          )}
        </div>
      </div>
      <div className="registration-form__address">Address:</div>
      <label htmlFor="street">
        Street <span className="star">*</span>
        <input
          type="text"
          id="street"
          aria-invalid={errors.address?.street ? 'true' : 'false'}
          {...register('address.street', { required: true })}
        />
      </label>
      <label htmlFor="city">
        City <span className="star">*</span>
        <input
          type="text"
          id="city"
          aria-invalid={errors.address?.city ? 'true' : 'false'}
          {...register('address.city', { required: true })}
        />
      </label>
      <label htmlFor="postal-code">
        Postal code <span className="star">*</span>
        <input
          type="text"
          id="postal-code"
          aria-invalid={errors.address?.postcode ? 'true' : 'false'}
          {...register('address.postcode', { required: true })}
        />
      </label>
      <label htmlFor="country">
        Country <span className="star">*</span>
        <input
          type="text"
          id="country"
          aria-invalid={errors.address?.country ? 'true' : 'false'}
          {...register('address.country', { required: true })}
        />
      </label>
      <button
        className="registration-form__button"
        type="submit"
        disabled={!isValid}
      >
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
