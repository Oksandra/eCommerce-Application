import React from 'react';
import './Promocode.scss';
import { Button } from '../Button/Button';

const Promocode = (): JSX.Element => {
  return (
    <tr className="promocode">
      <td>
        <input
          className="promocode__input"
          placeholder="Enter: WIN4IK, RSSCHOOL"
        />
        <Button
          className="promocode__button"
          type="button"
          textContent="Apply promocode"
        />
      </td>
    </tr>
  );
};

export default Promocode;
