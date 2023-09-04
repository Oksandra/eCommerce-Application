import React, { Dispatch, SetStateAction, useState } from 'react';
import Select from 'react-select';
import { postcodeValidator } from 'postcode-validator';
import { BaseAddress, ErrorResponse } from '@commercetools/platform-sdk';
import Label from '../Label/Label';
import { Button } from '../Button/Button';
import { ArrayObjectSelectState, Option } from '../../interfaces/interfaces';
import { countries } from '../Addresses/countries';
import checkSimpleField from '../../helpers/checkSimpleField';
import checkStreet from '../../helpers/checkStreet';
import './ModalAddAddress.scss';
import {
  addCustomerAddress,
  addShippingAddressId,
  addBillingAddressId,
  addDefaultShippingAddressId,
  addDefaultBillingAddressId,
} from '../../api/updateCustomer';
import { checkSubmitAddress } from '../../helpers/checkSubmitAddress';

const options = [
  {
    value: 'Billing',
    label: 'Billing',
  },
  {
    value: 'Shipping',
    label: 'Shipping',
  },
];

interface ModalAddressProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  version: number;
  setVersion: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
  openModal: () => void;
  setTypeError: Dispatch<SetStateAction<string>>;
}

const ModalAddAddress: React.FC<ModalAddressProps> = ({
  isOpen,
  setIsOpen,
  version,
  setVersion,
  setMessage,
  openModal,
  setTypeError,
}): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<ArrayObjectSelectState>({
    selectedOption: null,
  });
  const [code, setCode] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [codeError, setCodeError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [cityError, setCityError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [errorAdding, setErrorAdding] = useState('');
  const [defaultAddress, setDefaultAddress] = useState(false);

  const checkPostalCode = (data: string): string => {
    const selected = country;
    const codeUser = countries.find((el) => el.country === selected)
      ?.code as string;
    if (!country) {
      return 'Please enter country!';
    }
    if (!postcodeValidator(data, codeUser)) return 'Incorrect postal code';
    return '';
  };

  const checkCountry = (data: string): string => {
    const countrySelected = countries.find((el) => el.country === data)
      ?.country as string;
    if (!countrySelected) {
      return 'Please enter correct name of country!';
    }
    if (countrySelected) {
      const countryCode = countries.find((el) => el.country === countrySelected)
        ?.code as string;
      if (!postcodeValidator(code, countryCode)) return 'Incorrect postal code';
    }
    return '';
  };

  const clickCancel = (): void => {
    setIsOpen(true);
    window.location.reload();
  };

  const clickSave = (): void => {
    if (
      checkSubmitAddress(
        codeError,
        countryError,
        cityError,
        streetError,
        code,
        country,
        city,
        street,
        setCodeError,
        setCountryError,
        setCityError,
        setStreetError
      )
    )
      return;
    const countryRequest = countries.find((el) => el.country === country)
      ?.code as string;
    addCustomerAddress(
      code,
      countryRequest,
      city,
      street,
      version,
      selectedOption.selectedOption?.value as string
    )
      .then((obj) => {
        const shippingIds: string[] = obj.body.shippingAddressIds;
        const billingIds: string[] = obj.body.billingAddressIds;
        (obj.body.addresses as BaseAddress[]).forEach(
          (element: BaseAddress) => {
            if (
              element.key === 'Shipping' &&
              !shippingIds.includes(element.id as string)
            ) {
              addShippingAddressId(obj.body.version, element.id as string).then(
                (resp) => {
                  setVersion(resp.body.version);
                  if (defaultAddress) {
                    addDefaultShippingAddressId(
                      resp.body.version,
                      element.id as string
                    ).then((response) => {
                      setVersion(response.body.version);
                    });
                  }
                }
              );
            }
            if (
              element.key === 'Billing' &&
              !billingIds.includes(element.id as string)
            ) {
              addBillingAddressId(obj.body.version, element.id as string).then(
                (resp) => {
                  setVersion(resp.body.version);
                  if (defaultAddress) {
                    addDefaultBillingAddressId(
                      resp.body.version,
                      element.id as string
                    ).then((response) => {
                      setVersion(response.body.version);
                    });
                  }
                }
              );
            }
          }
        );
        setMessage(
          `${selectedOption.selectedOption?.value} address successfully added`
        );
        setTypeError('success');
        openModal();
      })
      .catch((errorMes: ErrorResponse) => {
        setErrorAdding(errorMes.message);
      });
  };

  return (
    <div className={isOpen ? 'modal-address' : 'modal-address open'}>
      <h3 className="modal-address__title">Choose type of address</h3>
      <Select
        className="modal-address__add-type"
        options={options}
        value={selectedOption.selectedOption}
        onChange={(option: Option | null): void => {
          setSelectedOption({ selectedOption: option });
        }}
      />
      <Label
        text="Country"
        id="country-add"
        isDisabled={false}
        type="text"
        value={country}
        setRequestInfo={setCountry}
        handleChange={checkCountry}
        setError={setCountryError}
      />
      {!!countryError && <span className="input-error">{countryError}</span>}
      <Label
        text="Postal code"
        id="postal-code-add"
        isDisabled={false}
        type="text"
        value={code}
        setRequestInfo={setCode}
        handleChange={checkPostalCode}
        setError={setCodeError}
      />
      {!!codeError && <span className="input-error">{codeError}</span>}
      <Label
        text="City"
        id="city-add"
        isDisabled={false}
        type="text"
        value={city}
        setRequestInfo={setCity}
        handleChange={checkSimpleField}
        setError={setCityError}
      />
      {!!cityError && <span className="input-error">{cityError}</span>}
      <Label
        text="Street"
        id="street-add"
        isDisabled={false}
        type="text"
        value={street}
        setRequestInfo={setStreet}
        handleChange={checkStreet}
        setError={setStreetError}
      />
      {!!streetError && <span className="input-error">{streetError}</span>}
      <label htmlFor="add-default" className="modal-address__default">
        <input
          id="add-default"
          type="checkbox"
          onChange={(event): void => setDefaultAddress(event.target.checked)}
        />
        Save as default address
      </label>
      <Button
        className="modal-address__button-cancel"
        type="button"
        textContent="Cancel"
        onClick={clickCancel}
      />
      <Button
        className="modal-address__button-save"
        type="button"
        textContent="Save"
        onClick={clickSave}
      />
      {!!errorAdding && <span className="input-error">{errorAdding}</span>}
    </div>
  );
};

export default ModalAddAddress;
