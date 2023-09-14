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
}) => {
  return (
    <tr className="cart-table__row">
      <td className="cart-table__img">
        <img src={image} alt="wine" />
      </td>
      <td>{title}</td>
      <td className={discountPrice ? 'discount-price' : ''}>$ {price}</td>
      <td>{count}</td>
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
