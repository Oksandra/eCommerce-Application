import React from 'react';

interface CartProductCardProps {
  image: string | undefined;
  title: string;
  price: string;
  count: number;
  totalPriceProduct: string;
  discountPrice: boolean;
}

const CartProductCard: React.FC<CartProductCardProps> = ({
  image,
  title,
  price,
  count,
  totalPriceProduct,
  discountPrice,
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
    </tr>
  );
};

export default CartProductCard;
