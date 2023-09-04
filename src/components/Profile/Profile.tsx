import React, { useEffect, useState } from 'react';
import { BaseAddress, ErrorResponse } from '@commercetools/platform-sdk';
import ProfileField from '../ProfileField/ProfileField';
import './Profile.scss';
import getCustomer from '../../api/getCustomer';
import {
  updateCustomerEmail,
  updateCustomerName,
  updateCustomerLastName,
  updateCustomerDateBirth,
} from '../../api/updateCustomer';
import ModalChangePassword from '../ModalChangePassword/ModalChangePassword';
import checkLogin from '../../helpers/checkLogin';
import { checkSubmitField } from '../../helpers/checkSubmitField';
import checkSimpleField from '../../helpers/checkSimpleField';
import checkDateBirthForProfile from '../../helpers/checkDateBirthForProfile';
import { Button } from '../Button/Button';
import AddressesList from '../AddressesList/AddressesList';
import Loader from '../Loader/Loader';
import ModalAddAddress from '../ModalAddAddress/ModalAddAddress';
import Modal from '../Modal/Modal';

const messageSuccess = 'changed successfully!';

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
  const [version, setVersion] = useState(1);
  const [loginError, setLoginError] = useState('');
  const [fistNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [birthError, setBirthError] = useState('');
  const [addresses, setAddresses] = useState<BaseAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState('');
  const [defaultBillingAddress, setDefaultBillingAddress] = useState('');
  const [showModalAddress, setShowModalAddress] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [resultType, setResultType] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getCustomer().then((obj) => {
      setCustomerEmail(obj.body.email);
      setCustomerFirstName(obj.body.firstName as string);
      setCustomerLastName(obj.body.lastName as string);
      setCustomerDateBirth(obj.body.dateOfBirth as string);
      setAddresses(obj.body.addresses);
      setVersion(obj.body.version);
      setLoading(false);
      if (obj.body.defaultShippingAddressId) {
        setDefaultShippingAddress(obj.body.defaultShippingAddressId);
      }
      if (obj.body.defaultBillingAddressId) {
        setDefaultBillingAddress(obj.body.defaultBillingAddressId);
      }
    });
  }, []);

  const openModalMessage = (): void => {
    setModalActive(true);
    setTimeout(() => {
      setModalActive(false);
    }, 4000);
  };

  const setNewFirstName = (): void => {
    if (checkSubmitField(fistNameError, customerFirstName, setFirstNameError))
      return;
    if (customerFirstName.length === 0) {
      setCustomerFirstName(customerFirstName);
    }
    updateCustomerName(customerFirstName, version)
      .then((resp) => {
        setCustomerFirstName(resp.body.firstName);
        setVersion(resp.body.version);
        setMessage(`Name ${messageSuccess}`);
        setResultType('success');
        openModalMessage();
      })
      .catch((error: ErrorResponse) => {
        setMessage(error.message);
        setResultType('error');
        openModalMessage();
      });
  };
  const setNewLastName = (): void => {
    if (checkSubmitField(lastNameError, customerLastName, setLastNameError))
      return;
    if (customerLastName.length === 0) {
      setCustomerLastName(customerLastName);
    }
    updateCustomerLastName(customerLastName, version)
      .then((resp) => {
        setCustomerLastName(resp.body.lastName);
        setVersion(resp.body.version);
        setMessage(`Last name ${messageSuccess}`);
        setResultType('success');
        openModalMessage();
      })
      .catch((error: ErrorResponse) => {
        setMessage(error.message);
        setResultType('error');
        openModalMessage();
      });
  };
  const setNewEmail = (): void => {
    if (checkSubmitField(loginError, customerEmail, setLoginError)) return;
    if (customerEmail.length === 0) {
      setCustomerEmail(customerEmail);
    }
    updateCustomerEmail(customerEmail, version)
      .then((resp) => {
        setCustomerEmail(resp.body.email);
        setVersion(resp.body.version);
        setMessage(`Email ${messageSuccess}`);
        setResultType('success');
        openModalMessage();
      })
      .catch((error) => {
        setMessage(error.message);
        setResultType('error');
        openModalMessage();
      });
  };
  const setNewDate = (): void => {
    if (checkSubmitField(birthError, customerDateBirth, setBirthError)) return;
    if (customerDateBirth.length === 0) {
      setCustomerDateBirth(customerDateBirth);
    }
    updateCustomerDateBirth(customerDateBirth, version)
      .then((resp) => {
        setCustomerDateBirth(resp.body.dateOfBirth);
        setVersion(resp.body.version);
        setMessage(`Date of birth ${messageSuccess}`);
        setResultType('success');
        openModalMessage();
      })
      .catch((error) => {
        setMessage(error.message);
        setResultType('error');
        openModalMessage();
      });
  };

  const openModalAddAddress = (): void => {
    setShowModalAddress(!showModalAddress);
  };

  return (
    <div className="profile">
      {loading ? (
        <Loader />
      ) : (
        <>
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
          {!!fistNameError && (
            <span className="input-error">{fistNameError}</span>
          )}
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
          {!!lastNameError && (
            <span className="input-error">{lastNameError}</span>
          )}
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
          <AddressesList
            addresses={addresses}
            version={version}
            setVersion={setVersion}
            defaultShippingAddress={defaultShippingAddress}
            defaultBillingAddress={defaultBillingAddress}
            setDefaultBillingAddress={setDefaultBillingAddress}
            setDefaultShippingAddress={setDefaultShippingAddress}
            setMessage={setMessage}
            openModal={openModalMessage}
            setTypeError={setResultType}
          />
          <Button
            className="button__add-address"
            textContent="Add address"
            type="button"
            onClick={openModalAddAddress}
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
            setMessage={setMessage}
            openModal={openModalMessage}
            setTypeError={setResultType}
          />
          <ModalAddAddress
            isOpen={showModalAddress}
            setIsOpen={setShowModalAddress}
            version={version}
            setVersion={setVersion}
            setMessage={setMessage}
            openModal={openModalMessage}
            setTypeError={setResultType}
          />
          <Modal
            active={modalActive}
            resultType={resultType}
            message={message}
          />
          <div
            className={isOpen ? 'modal-overlay' : 'modal-overlay open'}
            id="modal-overlay"
          />
          <div
            className={
              showModalAddress ? 'modal-overlay' : 'modal-overlay open'
            }
            id="modal-overlay"
          />
        </>
      )}
    </div>
  );
};

export default Profile;
