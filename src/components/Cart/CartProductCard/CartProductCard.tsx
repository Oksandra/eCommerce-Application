import React from 'react';

import del from '../../../assets/svg/delete-icon.svg';

interface CartProductCardProps {
  image: string | undefined;
  title: string;
  price: string;
  count: number;
  totalPriceProduct: string;
  discountPrice: boolean;
  id: string;
  onClick: (id: string, count: number) => void;
  changeCount: (idProd: string, count: number) => void;
}

const CartProductCard: React.FC<CartProductCardProps> = ({
  image,
  title,
  price,
  count,
  totalPriceProduct,
  discountPrice,
  id,
  onClick,
  changeCount,
}) => {
  const [valueInput, setValueInput] = React.useState<number>(count);

  return (
    <tr className="cart-table__row">
      <td className="cart-table__img">
        <img src={image} alt="wine" />
      </td>
      <td>{title}</td>
      <td className={discountPrice ? 'discount-price' : ''}>$ {price}</td>
      <td className="quantity">
        <div className="cart-quantity">
          <button
            onClick={(): void => {
              setValueInput(valueInput - 1);
              changeCount(id, valueInput - 1);
            }}
            type="button"
            className="cart-quantity__minus"
          >
            -
          </button>
          <input
            className="cart-quantity__input"
            type="number"
            value={valueInput}
            onChange={(): null => {
              return null;
            }}
          />
          <button
            onClick={(): void => {
              setValueInput(valueInput + 1);
              changeCount(id, valueInput + 1);
            }}
            type="button"
            className="cart-quantity__plus"
          >
            +
          </button>
        </div>
      </td>
      <td>$ {totalPriceProduct}</td>
      <td>
        <button type="button" onClick={(): void => onClick(id, count)}>
          <img className="cart-table__delete" src={del} alt="delete" />
        </button>
      </td>
    </tr>
  );
};

export default CartProductCard;
