import React, { FC } from 'react';
import { ButtonOptions } from '../../interfaces/interfaces';
import './_button.scss';

export const Button: FC<ButtonOptions> = ({
  className,
  textContent,
  type,
  onClick,
}) => {
  return (
    <button
      className={`button ${className}`}
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
    >
      {textContent}
    </button>
  );
};
