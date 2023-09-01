import React, { useState, Dispatch, SetStateAction } from 'react';
import { postcodeValidator } from 'postcode-validator';
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
  typeAddress: string;
  setCode: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  setCountry: Dispatch<SetStateAction<string>>;
  setStreet: Dispatch<SetStateAction<string>>;
  customerCode: string;
  customerCountry: string;
  customerCity: string;
  customerStreet: string;
  idAddress: string;
  version: number;
  setIdAddress: Dispatch<SetStateAction<string>>;
  setVersion: Dispatch<SetStateAction<number>>;
}

const ProfileAddress: React.FC<ProfileAddressProps> = ({
  typeAddress,
  setCode,
  setCity,
  setCountry,
  setStreet,
  customerCode,
  customerCountry,
  customerCity,
  customerStreet,
  idAddress,
  version,
  setIdAddress,
  setVersion,
}): JSX.Element => {
  const [isDisabbleField, setDisaebledField] = useState(true);
  const [codeError, setCodeError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [cityError, setCityError] = useState('');
  const [streetError, setStreetError] = useState('');

  const updateAddress = (): void => {
    const countryCode = countries.find(
      (country) => country.country === customerCountry
    )?.code as string;
    if (idAddress === undefined || idAddress === '') {
      addCustomerAddress(
        customerCode,
        countryCode,
        customerCity,
        customerStreet,
        version,
        typeAddress
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
        customerCode,
        countryCode,
        customerCity,
        customerStreet,
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
        customerCode,
        customerCountry,
        customerCity,
        customerStreet,
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
    const selected = customerCountry;
    const code = countries.find((el) => el.country === selected)
      ?.code as string;
    if (!customerCountry) {
      return 'Please enter country!';
    }
    if (!postcodeValidator(data, code)) return 'Incorrect postal code';
    return '';
  };

  const checkCountry = (data: string): string => {
    const country = countries.find((el) => el.country === data)
      ?.country as string;
    if (!country) {
      return 'Please enter correct name of country!';
    }
    if (country) {
      const countryCode = countries.find((el) => el.country === country)
        ?.code as string;
      if (!postcodeValidator(customerCode, countryCode))
        return 'Incorrect postal code';
    }
    return '';
  };

  return (
    <div className="profile__address-container">
      <Label
        text="Postal code"
        id={`${typeAddress}-code`}
        value={customerCode}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setCode}
        handleChange={checkPostalCode}
        setError={setCodeError}
      />
      {!!codeError && <span className="input-error">{codeError}</span>}
      <Label
        text="Country"
        id={`${typeAddress}-country`}
        value={customerCountry}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setCountry}
        handleChange={checkCountry}
        setError={setCountryError}
      />
      {!!countryError && <span className="input-error">{countryError}</span>}
      <Label
        text="City"
        id={`${typeAddress}-city`}
        value={customerCity}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setCity}
        handleChange={checkSimpleField}
        setError={setCityError}
      />
      {!!cityError && <span className="input-error">{cityError}</span>}
      <Label
        text="Street"
        id={`${typeAddress}-street`}
        value={customerStreet}
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
