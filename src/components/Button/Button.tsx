import React, { FC } from 'react';
import { ButtonOptions } from '../../interfaces/interfaces';
import './Button.scss';

export const Button: FC<ButtonOptions> = ({
  className,
  textContent,
  type,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`button ${className}`}
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
    >
      {textContent}
    </button>
  );
};
