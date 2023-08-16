import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
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

export default function Addresses(): JSX.Element {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<MyForm>({
    mode: 'all',
  });

  const [value, setValue] = useState(false);

  const [selectedOption, setSelectedOption] = useState<ArrayObjectSelectState>({
    selectedOption: null,
  });

  const [selectedCountry, setSelectedCountry] =
    useState<ArrayObjectSelectState>({
      selectedOption: null,
    });

  const watchValues = watch([
    'shipping.street',
    'shipping.city',
    'shipping.postcode',
  ]);

  const [valueBillingStreet, setBillingStreet] = useState('');

  const [valueBillingCity, setBillingCity] = useState('');

  const [valueBillingPostalCode, setBillingPostalCode] = useState('');

  const chooseAddress = (e: ChangeEvent): void => {
    const addressInput = e.target as HTMLInputElement;
    setValue(addressInput.checked);
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
    const selected = selectedCountry.selectedOption?.value;
    const code = countries.find((el) => el.country === selected)
      ?.code as string;
    if (!selectedCountry.selectedOption) {
      return false;
    }
    return postcodeValidator(data, code);
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
          />
          <div className="input-error">
            {errors.shipping?.street && (
              <p>
                The field is required and must contain at least one character!
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
                  'The field is required and must contain at least one character!',
              },
              pattern: /^[A-z][a-z]*$/g,
            })}
          />
          <div className="input-error">
            {errors.shipping?.city && (
              <p>
                {errors.shipping.city.message ||
                  'Last name must not contain special characters or numbers!'}
              </p>
            )}
          </div>
          <div className="address__country">
            Country <span className="star">*</span>
            <Select
              className="address__country-select"
              aria-invalid={errors.shipping?.country ? 'true' : 'false'}
              {...register('shipping.country', {
                required: {
                  value: true,
                  message: 'The field is required!',
                },
              })}
              value={selectedOption.selectedOption}
              options={options}
              onChange={(option: Option | null): void => {
                setSelectedOption({ selectedOption: option });
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
                message: 'The field is required!',
              },
              validate: checkPostalCodeShipping,
            })}
          />
          <div className="input-error">
            {errors.shipping?.postcode && (
              <p>
                {errors.shipping.postcode.message || 'Incorrect postal code!'}
              </p>
            )}
          </div>
          <label
            htmlFor="check-shipping"
            className="registration-form__check-address"
          >
            <input id="check-shipping" type="checkbox" />
            Save as default address
          </label>
          <label htmlFor="check" className="registration-form__check-address">
            <input
              id="check"
              type="checkbox"
              className="compare-address"
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
            value={value ? watchValues[0] : valueBillingStreet}
            placeholder="Street"
            aria-invalid={errors.shipping?.street ? 'true' : 'false'}
            {...register('billing.street', { required: true, minLength: 1 })}
            onChange={(e): void => setBillingStreet(e.target.value)}
            disabled={value}
          />
          <div className="input-error">
            {errors.billing?.street && (
              <p>
                The field is required and must contain at least one character!
              </p>
            )}
          </div>
          <input
            type="text"
            placeholder="City"
            value={value ? watchValues[1] : valueBillingCity}
            aria-invalid={errors.billing?.city ? 'true' : 'false'}
            {...register('billing.city', {
              required: {
                value: true,
                message:
                  'The field is required and must contain at least one character!',
              },
              pattern: /^[A-z][a-z]*$/g,
            })}
            onChange={(e): void => setBillingCity(e.target.value)}
            disabled={value}
          />
          <div className="input-error">
            {errors.billing?.city && (
              <p>
                {errors.billing.city.message ||
                  'Last name must not contain special characters or numbers!'}
              </p>
            )}
          </div>
          <div className="address__country">
            Country
            <Select
              className="address__country-select"
              aria-invalid={errors.billing?.country ? 'true' : 'false'}
              {...register('billing.country', {
                required: {
                  value: true,
                  message: 'The field is required!',
                },
              })}
              value={
                value
                  ? selectedOption.selectedOption
                  : selectedCountry.selectedOption
              }
              options={options}
              onChange={(option: Option | null): void => {
                setSelectedCountry({ selectedOption: option });
              }}
              isDisabled={value}
            />
          </div>
          <div className="input-error">
            {errors.billing?.country && <p>{errors.billing.country.message}</p>}
          </div>
          <input
            type="text"
            placeholder="Postal code"
            value={value ? watchValues[2] : valueBillingPostalCode}
            aria-invalid={errors.billing?.postcode ? 'true' : 'false'}
            {...register('billing.postcode', {
              required: {
                value: true,
                message: 'The field is required!',
              },
              validate: checkPostalCodeBilling,
            })}
            onChange={(e): void => setBillingPostalCode(e.target.value)}
            disabled={value}
          />{' '}
          <div className="input-error">
            {errors.billing?.postcode && (
              <p>
                {errors.billing.postcode.message || 'Incorrect postal code!'}
              </p>
            )}
          </div>
          <label
            htmlFor="check-billing"
            className="registration-form__check-address"
          >
            <input id="check-billing" type="checkbox" />
            Save as default address
          </label>
        </section>
      </div>
    </div>
  );
}
