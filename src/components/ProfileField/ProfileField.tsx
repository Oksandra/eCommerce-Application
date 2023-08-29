import React, { Dispatch, SetStateAction } from 'react';
import './ProfileField.scss';
import { Button } from '../Button/Button';
import Label from '../Label/Label';

interface ProfileFieldProps {
  text: string;
  isDisabled: boolean;
  id: string;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  value: string;
  setRequestInfo: Dispatch<SetStateAction<string>>;
  clickSave: () => void;
  type: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  text,
  isDisabled,
  id,
  value,
  setDisabled,
  setRequestInfo,
  clickSave,
  type,
}): JSX.Element => {
  const clickButtonEdit = (): void => {
    setDisabled(false);
  };

  const clickButtonSave = (): void => {
    setDisabled(true);
    clickSave();
  };

  return (
    <div className="profile-field">
      <Label
        text={text}
        id={id}
        isDisabled={isDisabled}
        type={type}
        value={value}
        setRequestInfo={setRequestInfo}
      />
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
    </div>
  );
};

export default ProfileField;
