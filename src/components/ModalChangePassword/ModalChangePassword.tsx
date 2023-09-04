import React, { Dispatch, SetStateAction, useState } from 'react';
import { _ErrorResponse } from '@commercetools/platform-sdk';
import Label from '../Label/Label';
import changePassword from '../../api/changePassword';
import { Button } from '../Button/Button';
import { checkPassword } from '../../helpers/checkPassword';
import { checkSubmitPassword } from '../../helpers/checkSubmitPassword';

interface ModalChangePasswordProps {
  customerCurrentPassword: string;
  isOpen: boolean;
  setCustomerCurrentPassword: Dispatch<SetStateAction<string>>;
  customerNewPassword: string;
  setCustomerNewPassword: Dispatch<SetStateAction<string>>;
  confirmNewPassword: string;
  setConfirmNewPassword: Dispatch<SetStateAction<string>>;
  setVersion: Dispatch<SetStateAction<number>>;
  version: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  openModal: () => void;
  setTypeError: Dispatch<SetStateAction<string>>;
}

const ModalChangePassword: React.FC<ModalChangePasswordProps> = ({
  customerCurrentPassword,
  isOpen,
  setCustomerCurrentPassword,
  customerNewPassword,
  setCustomerNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  setVersion,
  version,
  setOpen,
  setMessage,
  openModal,
  setTypeError,
}): JSX.Element => {
  const [passwordCurrentError, setCurrentPasswordError] = useState('');
  const [passwordNewError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setCorfimNewPasswordError] = useState('');
  const [errorSubmit, setErrorSubmit] = useState('');

  const clickChangePassword = (): void => {
    setOpen(!isOpen);
    setCustomerCurrentPassword('');
    setCustomerNewPassword('');
    setConfirmNewPassword('');
    setCurrentPasswordError('');
    setNewPasswordError('');
    setCorfimNewPasswordError('');
    setErrorSubmit('');
  };

  const changeCustomerPassword = (): void => {
    if (
      checkSubmitPassword(
        passwordCurrentError,
        passwordNewError,
        confirmNewPasswordError,
        customerCurrentPassword,
        customerNewPassword,
        confirmNewPassword,
        setCurrentPasswordError,
        setNewPasswordError
      )
    )
      return;
    changePassword(version, customerCurrentPassword, customerNewPassword)
      .then((obj) => {
        setVersion(obj.body.version);
        setMessage(`Password changed successfully`);
        setTypeError('success');
        openModal();
      })
      .catch((error: _ErrorResponse) => {
        setErrorSubmit(error.message);
      });
  };

  const checkConfirmPassword = (value: string): string => {
    if (customerNewPassword !== value) {
      return 'Password does not match!';
    }
    return '';
  };

  const clickCancel = (): void => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Button
        className="button-change"
        textContent="Change password"
        type="button"
        onClick={clickChangePassword}
      />
      <form
        className={
          isOpen ? 'profile__change-password' : 'profile__change-password open'
        }
      >
        <Label
          text="Current password"
          id="current-password"
          value={customerCurrentPassword}
          isDisabled={false}
          type="password"
          setRequestInfo={setCustomerCurrentPassword}
          handleChange={checkPassword}
          setError={setCurrentPasswordError}
        />
        {!!passwordCurrentError && (
          <span className="input-error">{passwordCurrentError}</span>
        )}
        <Label
          text="New password"
          id="new-password"
          value={customerNewPassword}
          isDisabled={false}
          type="password"
          setRequestInfo={setCustomerNewPassword}
          handleChange={checkPassword}
          setError={setNewPasswordError}
        />
        {!!passwordNewError && (
          <span className="input-error">{passwordNewError}</span>
        )}
        <Label
          text="Confirm new password"
          id="cofirm-password"
          value={confirmNewPassword}
          isDisabled={false}
          type="password"
          setRequestInfo={setConfirmNewPassword}
          handleChange={checkConfirmPassword}
          setError={setCorfimNewPasswordError}
        />
        {!!confirmNewPasswordError && (
          <span className="input-error">{confirmNewPasswordError}</span>
        )}
        <Button
          className="button-cancel"
          textContent="Cancel"
          type="button"
          onClick={clickCancel}
        />
        <Button
          className="button-save__password"
          textContent="Save"
          type="button"
          onClick={changeCustomerPassword}
        />
        {!!errorSubmit && <span className="input-error">{errorSubmit}</span>}
      </form>
    </>
  );
};

export default ModalChangePassword;
