import React from 'react';

interface CartProductCardProps {
  image: string;
  title: string;
  price: number;
  count: number;
}

const CartProductCard: React.FC<CartProductCardProps> = ({
  image,
  title,
  price,
  count,
}) => {
  return (
    <tr className="cart-table__row">
      <td className="cart-table__img">
        <img src={image} alt="wine" />
      </td>
      <td>{title}</td>
      <td>$ {price}</td>
      <td>{count}</td>
      <td>$ {count * price}</td>
    </tr>
  );
};

export default CartProductCard;
