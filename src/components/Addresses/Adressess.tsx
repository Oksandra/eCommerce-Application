import React, { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import Select from 'react-select';
import { postcodeValidator } from 'postcode-validator';
import {
  MyForm,
  ArrayObjectSelectState,
  Option,
} from '../../interfaces/interfaces';
import { countries } from './countries';
import options from './options';
import clickButtonAddress from '../../helpers/clickButtonAddress';

interface AddressesProps {
  register: UseFormRegister<MyForm>;
  errors: FieldErrors<MyForm>;
  isValid: boolean;
  setSelectedOption: Dispatch<SetStateAction<ArrayObjectSelectState>>;
  selectedOption: ArrayObjectSelectState;
  selectedCountry: ArrayObjectSelectState;
  setSelectedCountry: Dispatch<SetStateAction<ArrayObjectSelectState>>;
  isBillingAddressSame: boolean;
  setIsBillingAddressSame: Dispatch<SetStateAction<boolean>>;
  setShippingAddressDefault: Dispatch<SetStateAction<boolean>>;
  setBillingAddressDefault: Dispatch<SetStateAction<boolean>>;
}

const Addresses: React.FC<AddressesProps> = ({
  register,
  errors,
  setSelectedOption,
  selectedOption,
  selectedCountry,
  setSelectedCountry,
  isBillingAddressSame,
  setIsBillingAddressSame,
  setShippingAddressDefault,
  setBillingAddressDefault,
}): JSX.Element => {
  const { clearErrors, setFocus } = useForm<MyForm>({
    mode: 'all',
  });

  const [valueShippingStreet, setShippingStreet] = useState('');

  const [valueShippingCity, setShippingCity] = useState('');

  const [valueShippingPostalCode, setShippingPostalCode] = useState('');

  const [valueBillingStreet, setBillingStreet] = useState('');

  const [valueBillingCity, setBillingCity] = useState('');

  const [valueBillingPostalCode, setBillingPostalCode] = useState('');

  const chooseAddress = (e: ChangeEvent): void => {
    const addressInput = e.target as HTMLInputElement;
    setIsBillingAddressSame(addressInput.checked);
    clearErrors('billing.street');
    clearErrors('billing.city');
    clearErrors('billing.postcode');
  };

  const chooseShippingAddressDefault = (e: ChangeEvent): void => {
    const addressInput = e.target as HTMLInputElement;
    setShippingAddressDefault(addressInput.checked);
  };

  const chooseBillingAddressDefault = (e: ChangeEvent): void => {
    const addressInput = e.target as HTMLInputElement;
    setBillingAddressDefault(addressInput.checked);
  };

  function checkPostalCodeShipping(data: string): boolean {
    const selected = selectedOption.selectedOption?.value;
    const code = countries.find((el) => el.country === selected)
      ?.code as string;
    if (!selectedOption.selectedOption) {
      return false;
    }
    return postcodeValidator(data, code);
  }

  function checkPostalCodeBilling(data: string): boolean {
    let postalCode = data;
    const selected = selectedCountry.selectedOption?.value;
    const code = countries.find((el) => el.country === selected)
      ?.code as string;
    if (!selectedCountry.selectedOption) {
      return false;
    }
    if (isBillingAddressSame) {
      postalCode = valueShippingPostalCode;
    }
    return postcodeValidator(postalCode, code);
  }

  return (
    <div>
      <button
        className="registration-form__tab-button active"
        type="button"
        id="0"
        aria-label="Tab"
        onClick={clickButtonAddress}
      >
        Shipping address: <span className="star">*</span>
      </button>
      <button
        className="registration-form__tab-button"
        type="button"
        id="1"
        aria-label="Tab"
        onClick={clickButtonAddress}
      >
        Billing address:
      </button>
      <div className="registration-form__tab">
        <section className="registration-form__tab-content open">
          <input
            type="text"
            placeholder="Street *"
            aria-invalid={errors.shipping?.street ? 'true' : 'false'}
            {...register('shipping.street', { required: true, minLength: 1 })}
            onChange={(e): void => setShippingStreet(e.target.value)}
            aria-describedby="shipping-street-error"
          />
          <div className="input-error">
            {errors.shipping?.street && (
              <p id="shipping-street-error">
                Shipping street is required and must contain at least one
                character!
              </p>
            )}
          </div>
          <input
            type="text"
            placeholder="City *"
            aria-invalid={errors.shipping?.city ? 'true' : 'false'}
            {...register('shipping.city', {
              required: {
                value: true,
                message:
                  'Shipping city is required and must contain at least one character!',
              },
              pattern: /^[A-z][a-z]*$/g,
            })}
            onChange={(e): void => setShippingCity(e.target.value)}
            aria-describedby="shipping-city-error"
          />
          <div className="input-error">
            {errors.shipping?.city && (
              <p id="shipping-city-error">
                {errors.shipping.city.message ||
                  'Shipping city must not contain special characters or numbers!'}
              </p>
            )}
          </div>
          <div className="address__country">
            Country <span className="star">*</span>
            <Select
              className="address__country-select"
              value={selectedOption.selectedOption}
              options={options}
              onChange={(option: Option | null): void => {
                setSelectedOption({ selectedOption: option });
                setSelectedCountry({ selectedOption: option });
              }}
            />
            <div className="input-error">
              {errors.shipping?.country && (
                <p>{errors.shipping.country.message}</p>
              )}
            </div>
          </div>
          <input
            type="text"
            placeholder="Postal code *"
            aria-invalid={errors.shipping?.postcode ? 'true' : 'false'}
            {...register('shipping.postcode', {
              required: {
                value: true,
                message: 'Shipping postal code is required!',
              },
              validate: checkPostalCodeShipping,
            })}
            onChange={(e): void => {
              setShippingPostalCode(e.target.value);
              setFocus('billing.postcode');
            }}
            aria-describedby="shipping-code-error"
          />
          <div className="input-error">
            {errors.shipping?.postcode && (
              <p id="shipping-code-error">
                {errors.shipping.postcode.message || 'Incorrect postal code!'}
              </p>
            )}
          </div>
          <label
            htmlFor="check-shipping"
            className="registration-form__check-address"
          >
            <input
              id="check-shipping"
              type="checkbox"
              onChange={chooseShippingAddressDefault}
            />
            Save as default address
          </label>
          <label htmlFor="check" className="registration-form__check-address">
            <input
              id="check"
              type="checkbox"
              className="compare-address"
              checked={isBillingAddressSame}
              onChange={chooseAddress}
            />
            Set as address for shipping and billing
          </label>
        </section>
      </div>
      <div className="registration-form__tab">
        <section className="registration-form__tab-content tab-second">
          <input
            type="text"
            value={
              isBillingAddressSame ? valueShippingStreet : valueBillingStreet
            }
            placeholder="Street"
            aria-invalid={errors.billing?.street ? 'true' : 'false'}
            {...register('billing.street', {
              required: isBillingAddressSame
                ? false
                : 'Billing street is required',
              minLength: 1,
            })}
            onChange={(e): void => setBillingStreet(e.target.value)}
            aria-describedby="billing-street-error"
            disabled={isBillingAddressSame}
          />
          <div className="input-error">
            {errors.billing?.street && (
              <p id="billing-street-error">
                Billing street is required and must contain at least one
                character!
              </p>
            )}
          </div>
          <input
            type="text"
            placeholder="City"
            value={isBillingAddressSame ? valueShippingCity : valueBillingCity}
            aria-invalid={errors.billing?.city ? 'true' : 'false'}
            {...register('billing.city', {
              required: isBillingAddressSame
                ? false
                : 'Billing city is required and must contain at least one character!',
              pattern: /^[A-z][a-z]*$/g,
            })}
            onChange={(e): void => setBillingCity(e.target.value)}
            aria-describedby="billing-city-error"
            disabled={isBillingAddressSame}
          />
          <div className="input-error">
            {errors.billing?.city && (
              <p id="billing-city-error">
                {errors.billing.city.message ||
                  'Billing city must not contain special characters or numbers!'}
              </p>
            )}
          </div>
          <div className="address__country">
            Country
            <Select
              className="address__country-select"
              value={
                isBillingAddressSame
                  ? selectedOption.selectedOption
                  : selectedCountry.selectedOption
              }
              options={options}
              onChange={(option: Option | null): void => {
                setSelectedCountry({ selectedOption: option });
              }}
              isDisabled={isBillingAddressSame}
            />
          </div>
          <div className="input-error">
            {errors.billing?.country && <p>{errors.billing.country.message}</p>}
          </div>
          <input
            type="text"
            placeholder="Postal code"
            value={
              isBillingAddressSame
                ? valueShippingPostalCode
                : valueBillingPostalCode
            }
            aria-invalid={errors.billing?.postcode ? 'true' : 'false'}
            {...register('billing.postcode', {
              required: isBillingAddressSame
                ? false
                : 'Billing postal code is required!',
              validate: checkPostalCodeBilling,
            })}
            onChange={(e): void => setBillingPostalCode(e.target.value)}
            aria-describedby="billing-code-error"
            disabled={isBillingAddressSame}
          />{' '}
          <div className="input-error">
            {errors.billing?.postcode && (
              <p id="billing-code-error">
                {errors.billing.postcode.message || 'Incorrect postal code!'}
              </p>
            )}
          </div>
          <label
            htmlFor="check-billing"
            className="registration-form__check-address"
          >
            <input
              id="check-billing"
              type="checkbox"
              onChange={chooseBillingAddressDefault}
              disabled={isBillingAddressSame}
            />
            Save as default address
          </label>
        </section>
      </div>
      <button className="registration-form__button" type="submit">
        Sign in
      </button>
    </div>
  );
};

export default Addresses;
