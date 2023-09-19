import React, { Dispatch, SetStateAction } from 'react';
import './Promocode.scss';
import { Button } from '../Button/Button';

interface PromocodeProps {
  promocode: string;
  setPromocode: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  clickApply: () => void;
}

const Promocode: React.FC<PromocodeProps> = ({
  promocode,
  setPromocode,
  isDisabled,
  setDisabled,
  clickApply,
}): JSX.Element => {
  if (promocode) {
    if (promocode.length === 0) {
      setDisabled(true);
    }
  }
  return (
    <tr>
      <td className="promocode">
        <input
          value={promocode}
          className="promocode__input"
          placeholder="Enter: WIN4IK, RSSCHOOL"
          onChange={(event): void => {
            setPromocode(event.target.value.toUpperCase());
            setDisabled(false);
          }}
        />
        <Button
          className="promocode__button"
          type="button"
          textContent="Apply promocode"
          disabled={isDisabled}
          onClick={clickApply}
        />
      </td>
    </tr>
  );
};

export default Promocode;
