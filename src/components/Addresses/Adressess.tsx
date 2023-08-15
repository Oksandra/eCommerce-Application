import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectCountries from '../SelectCountries/SelectCountries';
import checkPostalCode from '../../helpers/checkPostalCode';
import { MyForm } from '../../interfaces/interfaces';

export default function Addresses(): JSX.Element {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<MyForm>({
    mode: 'all',
  });

  const [value, setValue] = useState(false);

  const watchValues = watch([
    'shipping.street',
    'shipping.city',
    'shipping.country',
    'shipping.postcode',
  ]);

  console.log(watchValues);

  const chooseAddress = (e: ChangeEvent): void => {
    const addressInput = e.target as HTMLInputElement;
    setValue(addressInput.checked);
  };

  const clickButton = (event: React.MouseEvent): void => {
    const tabButtons = document.querySelectorAll(
      '.registration-form__tab-button'
    );
    const tabContents = document.querySelectorAll(
      '.registration-form__tab-content'
    );
    const tabIndex = Number((event.target as HTMLButtonElement).id);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('open');
    });
    tabButtons.forEach((tabButton) => {
      tabButton.classList.remove('active');
    });
    tabContents[tabIndex].classList.add('open');
    tabButtons[tabIndex].classList.add('active');
  };

  return (
    <div>
      <button
        className="registration-form__tab-button active"
        type="button"
        id="0"
        aria-label="Tab"
        onClick={clickButton}
      >
        Shipping address: <span className="star">*</span>
      </button>
      <button
        className="registration-form__tab-button"
        type="button"
        id="1"
        aria-label="Tab"
        onClick={clickButton}
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
            <div
              aria-invalid={errors.shipping?.country ? 'true' : 'false'}
              {...register('shipping.country', { required: true })}
            >
              <SelectCountries />
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
              validate: checkPostalCode,
            })}
          />{' '}
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
        <section className="registration-form__tab-content">
          <input
            type="text"
            value={value ? watchValues[0] : ''}
            placeholder="Street"
            aria-invalid={errors.shipping?.street ? 'true' : 'false'}
            {...register('billing.street', { required: true, minLength: 1 })}
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
            value={value ? watchValues[1] : ''}
            aria-invalid={errors.billing?.city ? 'true' : 'false'}
            {...register('billing.city', {
              required: {
                value: true,
                message:
                  'The field is required and must contain at least one character!',
              },
              pattern: /^[A-z][a-z]*$/g,
            })}
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
            <div
              aria-invalid={errors.billing?.country ? 'true' : 'false'}
              {...register('billing.country', { required: true })}
            >
              <SelectCountries />
            </div>
          </div>
          <input
            type="text"
            placeholder="Postal code"
            value={value ? watchValues[2] : ''}
            aria-invalid={errors.billing?.postcode ? 'true' : 'false'}
            {...register('billing.postcode', {
              required: {
                value: true,
                message: 'The field is required!',
              },
              validate: checkPostalCode,
            })}
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
