import React, { useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';

import './Cart.scss';
import CartProductCard from './CartProductCard/CartProductCard';
import ModalPage from '../ModalPage/ModalPage';

interface CartProps {
  allProducts: LineItem[];
  totalPrice: number;
  totalCount: number | undefined;
  removeFromCart: (id: string, count: number) => void;
  removeCart: () => void;
  changeCount: (idProd: string, count: number) => void;
}

const Cart: React.FC<CartProps> = ({
  allProducts,
  totalPrice,
  totalCount,
  removeFromCart,
  removeCart,
  changeCount,
}) => {
  const [modalActive, setModalActive] = useState<boolean>(true);

  return (
    <div className="cart">
      <div className="cart__wrapper">
        <div className="cart__header">
          <button
            onClick={(): void => removeCart()}
            className="cart__button"
            type="button"
          >
            Clear Shopping Cart
          </button>
          <h2 className="cart__title">Shopping Cart</h2>
        </div>
        <div className="tables__wrapper">
          <table className="cart-table">
            <thead className="cart-table__head">
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Del</th>
              </tr>
            </thead>
            <tbody className="cart-table__body">
              {allProducts.map((product) => (
                <CartProductCard
                  title={product.name['en-US']}
                  price={
                    product.price.discounted
                      ? (
                          product.price.discounted.value.centAmount / 100
                        ).toFixed(2)
                      : (product.price.value.centAmount / 100).toFixed(2)
                  }
                  image={
                    product.variant.images ? product.variant.images[0].url : ''
                  }
                  count={product.quantity}
                  totalPriceProduct={(
                    product.totalPrice.centAmount / 100
                  ).toFixed(2)}
                  discountPrice={product.price.discounted !== undefined}
                  key={product.id}
                  id={product.id}
                  onClick={(): void =>
                    removeFromCart(product.id, product.quantity)
                  }
                  changeCount={changeCount}
                />
              ))}
            </tbody>
          </table>
          <table className="total-table">
            <thead className="total-table__head">
              <tr>
                <th>Cart totals</th>
              </tr>
            </thead>
            <tbody className="total-table__body">
              <tr className="total-table__price">
                <td>TOTAL price: $ {(totalPrice / 100).toFixed(2)}</td>
              </tr>
              <tr className="total-table__count">
                <td>TOTAL count: {totalCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ModalPage active={modalActive} setActive={setModalActive}>
        <p className="modal-text">
          Are you sure you want to empty the cart completely?
        </p>
        <div className="modal-buttons">
          <button className="modal-buttons__button" type="button">
            Yes
          </button>
          <button className="modal-buttons__button" type="button">
            Exit
          </button>
        </div>
      </ModalPage>
    </div>
  );
};

export default Cart;
