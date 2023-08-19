import React, { useState } from 'react';
import './RegistrationForm.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import checkDateBirth from '../../helpers/checkDateBirth';
import {
  MyForm,
  Customer,
  ArrayObjectSelectState,
} from '../../interfaces/interfaces';
import Addresses from '../Addresses/Adressess';
import createCustomer from '../../api/createCustomer';
import { countries } from '../Addresses/countries';

const keyShipping = 'shipping';
const keyBilling = 'billing';

function RegistrationForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<MyForm>({
    mode: 'all',
  });

  const [selectedOption, setSelectedOption] = useState<ArrayObjectSelectState>({
    selectedOption: null,
  });

  const [selectedCountry, setSelectedCountry] =
    useState<ArrayObjectSelectState>({
      selectedOption: null,
    });

  const [isBillingAddressSame, setIsBillingAddressSame] = useState(false);

  const submit: SubmitHandler<MyForm> = (data) => {
    const countryCodeShipping = countries.find(
      (country) => country.country === selectedOption.selectedOption?.value
    )?.code as string;
    const countryCodeBilling = countries.find(
      (country) => country.country === selectedCountry.selectedOption?.value
    )?.code as string;
    const body: Customer = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      addresses: [
        {
          key: keyShipping,
          country: countryCodeShipping,
          city: data.shipping.city,
          streetName: data.shipping.street,
          postalCode: data.shipping.postcode,
        },
        {
          key: keyBilling,
          country: countryCodeBilling,
          city: data.billing.city,
          streetName: data.billing.street,
          postalCode: data.billing.postcode,
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
    };
    createCustomer(body).then((resp) => console.log(resp));
    reset();
  };

  return (
    <div className="registration-form__wrapper">
      <form className="registration-form" onSubmit={handleSubmit(submit)}>
        <h2 className="registration-form__title">Creat your account:</h2>
        <div className="registration-form__customer-info">
          <input
            type="email"
            id="email-field"
            placeholder="Email *"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: {
                value: true,
                message: 'The field is required',
              },
              pattern: /^(.+)@(.+)\.(.+)$/,
            })}
          />
          <div className="input-error">
            {errors.email && (
              <p>{errors.email.message || 'Incorrect email!'}</p>
            )}
          </div>
          <input
            type="password"
            id="password"
            placeholder="Password *"
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
          <div className="input-error">
            {errors.password && (
              <p>
                {errors.password.message ||
                  'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number!'}
              </p>
            )}
          </div>
          <input
            type="text"
            id="first-name"
            placeholder="First name *"
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
          <div className="input-error">
            {errors.firstName && (
              <p>
                {errors.firstName.message ||
                  'First name must not contain special characters or numbers!'}
              </p>
            )}
          </div>
          <input
            type="text"
            id="last-name"
            placeholder="Last name *"
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
                validate: checkDateBirth,
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
        <Addresses
          register={register}
          errors={errors}
          isValid={isValid}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          isBillingAddressSame={isBillingAddressSame}
          setIsBillingAddressSame={setIsBillingAddressSame}
        />
      </form>
    </div>
  );
}

export default RegistrationForm;
