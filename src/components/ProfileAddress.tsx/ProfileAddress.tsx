import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { postcodeValidator } from 'postcode-validator';
import { BaseAddress } from '@commercetools/platform-sdk';
import { Button } from '../Button/Button';
import './ProfileAddress.scss';
import Label from '../Label/Label';
import {
  addCustomerAddress,
  addShippingAddressId,
  deleteCustomerAddress,
  updateCustomerAddress,
  addBillingAddressId,
} from '../../api/updateCustomer';
import { countries } from '../Addresses/countries';
import checkSimpleField from '../../helpers/checkSimpleField';
import checkStreet from '../../helpers/checkStreet';
import { checkSubmitAddress } from '../../helpers/checkSubmitAddress';

interface ProfileAddressProps {
  address: BaseAddress;
  version: number;
  setVersion: Dispatch<SetStateAction<number>>;
  defaultShippingAddress: string;
  defaultBillingAddress: string;
}

const ProfileAddress: React.FC<ProfileAddressProps> = ({
  address,
  version,
  setVersion,
  defaultShippingAddress,
  defaultBillingAddress,
}): JSX.Element => {
  const { id, key, postalCode, country, city, streetName } = address;
  const [isDisabbleField, setDisaebledField] = useState(true);
  const [codeError, setCodeError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [cityError, setCityError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [code, setCode] = useState('');
  const [countryUser, setCountry] = useState('');
  const [cityUser, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [idAddress, setIdAddress] = useState('');

  useEffect(() => {
    setCode(postalCode as string);
    const countryCustomer = countries.find((el) => el.code === country)
      ?.country;
    setCountry(countryCustomer as string);
    setCity(city as string);
    setStreet(streetName as string);
    setIdAddress(id as string);
  }, []);

  const updateAddress = (): void => {
    const countryCode = countries.find(
      (countrySelected) => countrySelected.country === countryUser
    )?.code as string;
    if (idAddress === undefined || idAddress === '') {
      addCustomerAddress(
        code,
        countryCode,
        cityUser,
        street,
        version,
        key as string
      ).then((obj) => {
        if (obj.body.addresses[0].key === 'shipping') {
          addShippingAddressId(obj.body.version, obj.body.addresses[0].id).then(
            (resp) => {
              setVersion(resp.body.version);
            }
          );
        } else if (obj.body.addresses[0].key === 'billing') {
          addBillingAddressId(obj.body.version, obj.body.addresses[0].id).then(
            (response) => {
              setVersion(response.body.version);
            }
          );
        } else if (obj.body.addresses[1].key === 'billing') {
          addBillingAddressId(obj.body.version, obj.body.addresses[1].id).then(
            (object) => {
              setVersion(object.body.version);
            }
          );
        }
      });
    } else {
      updateCustomerAddress(
        code,
        countryUser,
        cityUser,
        street,
        version,
        idAddress
      ).then((obj) => {
        setVersion(obj.body.version);
      });
    }
  };

  const clickButtonEdit = (): void => {
    setDisaebledField(false);
  };

  const clickButtonSave = (): void => {
    if (
      checkSubmitAddress(
        codeError,
        countryError,
        cityError,
        streetError,
        code,
        countryUser,
        cityUser,
        street,
        setCodeError,
        setCountryError,
        setCityError,
        setStreetError
      )
    )
      return;
    setDisaebledField(true);
    updateAddress();
  };

  const clickButtonDelete = (): void => {
    if (!idAddress) return;
    deleteCustomerAddress(version, idAddress).then((obj) => {
      setCode('');
      setCity('');
      setStreet('');
      setCountry('');
      setIdAddress('');
      setVersion(obj.body.version);
    });
  };

  const checkPostalCode = (data: string): string => {
    const selected = countryUser;
    const codeUser = countries.find((el) => el.country === selected)
      ?.code as string;
    if (!countryUser) {
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

  return (
    <div className="profile__address-container">
      <h3 className="profile__address-title">{key} address</h3>
      <span
        className={
          defaultBillingAddress === id || defaultShippingAddress === id
            ? 'profile__address-default show'
            : 'profile__address-default'
        }
      >
        Defaul address
      </span>
      <Label
        text="Postal code"
        id={`${key}-code`}
        value={code}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setCode}
        handleChange={checkPostalCode}
        setError={setCodeError}
      />
      {!!codeError && <span className="input-error">{codeError}</span>}
      <Label
        text="Country"
        id={`${key}-country`}
        value={countryUser}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setCountry}
        handleChange={checkCountry}
        setError={setCountryError}
      />
      {!!countryError && <span className="input-error">{countryError}</span>}
      <Label
        text="City"
        id={`${key}-city`}
        value={cityUser}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setCity}
        handleChange={checkSimpleField}
        setError={setCityError}
      />
      {!!cityError && <span className="input-error">{cityError}</span>}
      <Label
        text="Street"
        id={`${key}-street`}
        value={street}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setStreet}
        handleChange={checkStreet}
        setError={setStreetError}
      />
      {!!streetError && <span className="input-error">{streetError}</span>}
      <Button
        className="button-edit"
        textContent="Edit"
        type="button"
        onClick={clickButtonEdit}
      />
      <Button
        className="button-save"
        textContent="Save"
        type="button"
        onClick={clickButtonSave}
      />
      <Button
        className="button-delete"
        textContent="Delete address"
        type="button"
        onClick={clickButtonDelete}
      />
    </div>
  );
};

export default ProfileAddress;
