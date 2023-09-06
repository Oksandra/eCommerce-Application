import React, { useState } from 'react';
import './Filtr.scss';

const Filtr = (): JSX.Element => {
  const [active, setActive] = useState<null | number>(null);

  function handleClick(id: number): void {
    setActive(id);
  }
  return (
    <aside className="categories">
      <div className="categories__title">CATEGORIES</div>
      <button
        id="0f78b7da-5e69-4600-a8a0-2083bc4d173a"
        className={
          active === 1 ? 'categories__button active' : 'categories__button'
        }
        type="button"
        onClick={(): void => handleClick(1)}
      >
        Sparkling wines
      </button>
      <button
        id="96e7295c-116f-409d-8b66-faeb0238964d"
        className={
          active === 2 ? 'categories__button active' : 'categories__button'
        }
        type="button"
        onClick={(): void => handleClick(2)}
      >
        Red Wines
      </button>
      <button
        id="6b625304-5b48-44fb-b675-ab852dd4f831"
        className={
          active === 3 ? 'categories__button active' : 'categories__button'
        }
        type="button"
        onClick={(): void => handleClick(3)}
      >
        White Wines
      </button>
      <button
        id="57ce0b9c-ff63-4a17-a906-4f87f9069c9c"
        className={
          active === 4 ? 'categories__button active' : 'categories__button'
        }
        type="button"
        onClick={(): void => handleClick(4)}
      >
        Rose Wines
      </button>
    </aside>
  );
};

export default Filtr;
