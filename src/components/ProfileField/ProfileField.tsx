import React, { Dispatch, SetStateAction } from 'react';
import './ProfileField.scss';
import { Button } from '../Button/Button';
import Label from '../Label/Label';

interface ProfileFieldProps {
  text: string;
  isDisabled: boolean;
  id: string;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  text,
  isDisabled,
  id,
  setDisabled,
}): JSX.Element => {
  const clickButtonEdit = (): void => {
    setDisabled(false);
  };

  const clickButtonSave = (): void => {
    setDisabled(true);
  };

  return (
    <div className="profile-field">
      <Label text={text} id={id} isDisabled={isDisabled} type="text" />
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
