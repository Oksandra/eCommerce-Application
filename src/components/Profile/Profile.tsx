import React, { useEffect, useState } from 'react';
import ProfileField from '../ProfileField/ProfileField';
import './Profile.scss';
import ProfileAddress from '../ProfileAddress.tsx/ProfileAddress';
import getCustomer from '../../api/getCustomer';
import {
  updateCustomerEmail,
  updateCustomerName,
  updateCustomerLastName,
  updateCustomerDateBirth,
} from '../../api/updateCustomer';
import { countries } from '../Addresses/countries';
import ModalChangePassword from '../ModalChangePassword/ModalChangePassword';
import checkLogin from '../../helpers/checkLogin';
import { checkSubmitField } from '../../helpers/checkSubmitField';
import checkSimpleField from '../../helpers/checkSimpleField';
import checkDateBirthForProfile from '../../helpers/checkDateBirthForProfile';

const Profile = (): JSX.Element => {
  const [isDisabledFirstName, setDisabledFirstName] = useState(true);
  const [isDisabledLastName, setDisabledLastName] = useState(true);
  const [isDisabledDateBirth, setDisabledDateBirth] = useState(true);
  const [isDisabledEmail, setDisabledEmail] = useState(true);
  const [isOpen, setOpen] = useState(true);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerDateBirth, setCustomerDateBirth] = useState('');
  const [customerCurrentPasword, setCustomerCurrentPassword] = useState('');
  const [customerNewPassword, setCustomerNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [customerShippingCode, setCustomerShippingCode] = useState('');
  const [customerShippingCountry, setCustomerShippingCountry] = useState('');
  const [customerShippingCity, setCustomerShippingCity] = useState('');
  const [customerShippingStreet, setCustomerShippingStreet] = useState('');
  const [customerBillingCode, setCustomerBillingCode] = useState('');
  const [customerBillingCountry, setCustomerBillingCountry] = useState('');
  const [customerBillingCity, setCustomerBillingCity] = useState('');
  const [customerBillingStreet, setCustomerBillingStreet] = useState('');
  const [version, setVersion] = useState(1);
  const [addressIdShipping, setAddressIdShipping] = useState('');
  const [addressIdBilling, setAddressIdBilling] = useState('');
  const [loginError, setLoginError] = useState('');
  const [fistNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [birthError, setBirthError] = useState('');

  useEffect(() => {
    getCustomer().then((obj) => {
      setCustomerEmail(obj.body.email);
      setCustomerFirstName(obj.body.firstName as string);
      setCustomerLastName(obj.body.lastName as string);
      setCustomerDateBirth(obj.body.dateOfBirth as string);
      let countryName: string | undefined;
      if (obj.body.addresses[0]) {
        countryName = countries.find(
          (country) => country.code === obj.body.addresses[0].country
        )?.country;
        setCustomerShippingCode(obj.body.addresses[0].postalCode as string);
        setCustomerShippingCountry(countryName as string);
        setCustomerShippingCity(obj.body.addresses[0].city as string);
        setCustomerShippingStreet(obj.body.addresses[0].streetName as string);
      }
      if (obj.body.addresses[1]) {
        const countryBillingName = countries.find(
          (country) => country.code === obj.body.addresses[1].country
        )?.country;
        setCustomerBillingCode(obj.body.addresses[0].postalCode as string);
        setCustomerBillingCountry(countryBillingName as string);
        setCustomerBillingCity(obj.body.addresses[1].city as string);
        setCustomerBillingStreet(obj.body.addresses[1].streetName as string);
        setAddressIdBilling(obj.body.billingAddressIds[1] as string);
      }
      setAddressIdShipping(obj.body.shippingAddressIds[0] as string);
      if (
        addressIdBilling === addressIdShipping &&
        addressIdBilling.length !== 0
      ) {
        setCustomerBillingCode(obj.body.addresses[0].postalCode as string);
        setCustomerBillingCountry(countryName as string);
        setCustomerBillingCity(obj.body.addresses[0].city as string);
        setCustomerBillingStreet(obj.body.addresses[0].streetName as string);
        setAddressIdBilling(obj.body.billingAddressIds[0] as string);
      }
      setVersion(obj.body.version);
      console.log(version);
    });
  }, []);

  const setNewFirstName = (): void => {
    if (checkSubmitField(fistNameError, customerFirstName, setFirstNameError))
      return;
    if (customerFirstName.length === 0) {
      setCustomerFirstName(customerFirstName);
    }
    updateCustomerName(customerFirstName, version).then((resp) => {
      setCustomerFirstName(resp.body.firstName);
      setVersion(resp.body.version);
    });
  };
  const setNewLastName = (): void => {
    if (checkSubmitField(lastNameError, customerLastName, setLastNameError))
      return;
    if (customerLastName.length === 0) {
      setCustomerLastName(customerLastName);
    }
    updateCustomerLastName(customerLastName, version).then((resp) => {
      setCustomerLastName(resp.body.lastName);
      setVersion(resp.body.version);
    });
  };
  const setNewEmail = (): void => {
    if (checkSubmitField(loginError, customerEmail, setLoginError)) return;
    if (customerEmail.length === 0) {
      setCustomerEmail(customerEmail);
    }
    updateCustomerEmail(customerEmail, version).then((resp) => {
      setCustomerEmail(resp.body.email);
      setVersion(resp.body.version);
    });
  };
  const setNewDate = (): void => {
    if (checkSubmitField(birthError, customerDateBirth, setBirthError)) return;
    if (customerDateBirth.length === 0) {
      setCustomerDateBirth(customerDateBirth);
    }
    updateCustomerDateBirth(customerDateBirth, version).then((resp) => {
      setCustomerDateBirth(resp.body.dateOfBirth);
      setVersion(resp.body.version);
    });
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Profile</h2>
      <ProfileField
        text="Email"
        id="email"
        value={customerEmail}
        isDisabled={isDisabledEmail}
        setDisabled={setDisabledEmail}
        clickSave={setNewEmail}
        setRequestInfo={setCustomerEmail}
        type="text"
        handleChange={checkLogin}
        setError={setLoginError}
      />
      {!!loginError && <span className="input-error">{loginError}</span>}
      <ProfileField
        text="First name"
        id="first-name"
        value={customerFirstName}
        isDisabled={isDisabledFirstName}
        setDisabled={setDisabledFirstName}
        setRequestInfo={setCustomerFirstName}
        clickSave={setNewFirstName}
        type="text"
        handleChange={checkSimpleField}
        setError={setFirstNameError}
      />
      {!!fistNameError && <span className="input-error">{fistNameError}</span>}
      <ProfileField
        text="Last name"
        id="last-name"
        value={customerLastName}
        isDisabled={isDisabledLastName}
        setDisabled={setDisabledLastName}
        setRequestInfo={setCustomerLastName}
        clickSave={setNewLastName}
        type="text"
        handleChange={checkSimpleField}
        setError={setLastNameError}
      />
      {!!lastNameError && <span className="input-error">{lastNameError}</span>}
      <ProfileField
        text="Date of birth"
        id="date-birth"
        value={customerDateBirth}
        isDisabled={isDisabledDateBirth}
        setDisabled={setDisabledDateBirth}
        setRequestInfo={setCustomerDateBirth}
        clickSave={setNewDate}
        type="date"
        handleChange={checkDateBirthForProfile}
        setError={setBirthError}
      />
      {!!birthError && <span className="input-error">{birthError}</span>}
      <h3 className="profile__address-title">Shipping address</h3>
      <ProfileAddress
        typeAddress="shipping"
        setCode={setCustomerShippingCode}
        setCity={setCustomerShippingCity}
        setCountry={setCustomerShippingCountry}
        setStreet={setCustomerShippingStreet}
        customerCode={customerShippingCode}
        customerCity={customerShippingCity}
        customerCountry={customerShippingCountry}
        customerStreet={customerShippingStreet}
        idAddress={addressIdShipping}
        version={version}
        setIdAddress={setAddressIdShipping}
        setVersion={setVersion}
      />
      <h3 className="profile__address-title">Billing address</h3>
      <ProfileAddress
        typeAddress="billing"
        setCode={setCustomerBillingCode}
        setCountry={setCustomerBillingCountry}
        setCity={setCustomerBillingCity}
        setStreet={setCustomerBillingStreet}
        customerCode={customerBillingCode}
        customerCity={customerBillingCity}
        customerCountry={customerBillingCountry}
        customerStreet={customerBillingStreet}
        idAddress={addressIdBilling}
        version={version}
        setIdAddress={setAddressIdShipping}
        setVersion={setVersion}
      />
      <ModalChangePassword
        customerCurrentPassword={customerCurrentPasword}
        isOpen={isOpen}
        setCustomerCurrentPassword={setCustomerCurrentPassword}
        customerNewPassword={customerNewPassword}
        setCustomerNewPassword={setCustomerNewPassword}
        confirmNewPassword={confirmNewPassword}
        setConfirmNewPassword={setConfirmNewPassword}
        setVersion={setVersion}
        version={version}
        setOpen={setOpen}
      />
      <div
        className={isOpen ? 'modal-overlay' : 'modal-overlay open'}
        id="modal-overlay"
      />
    </div>
  );
};

export default Profile;
