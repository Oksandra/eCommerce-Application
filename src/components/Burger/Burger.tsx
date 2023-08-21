import React, { FC, useState } from 'react';
import './Burger.scss';

interface BurgerProps {
  state: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Burger: FC<BurgerProps> = ({ state }) => {
  const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false);
  state(isBurgerActive);
  function clickBurger(): void {
    setIsBurgerActive(!isBurgerActive);
    state(isBurgerActive);
  }
  return (
    <button
      type="button"
      className={`burger ${isBurgerActive ? 'burger_active' : ''}`}
      onClick={(): void => clickBurger()}
    >
      <span className="burger__line-1" />
      <span className="burger__line-2" />
      <span className="burger__line-3" />
    </button>
  );
};
