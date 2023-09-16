import React, { Dispatch, SetStateAction, useState } from 'react';
import { DiscountCodeInfo, LineItem } from '@commercetools/platform-sdk';

import './Cart.scss';
import CartProductCard from './CartProductCard/CartProductCard';
import ModalPage from '../ModalPage/ModalPage';
import Promocode from '../Promocode/Promocode';

interface CartProps {
  allProducts: LineItem[];
  totalPrice: number;
  totalCount: number | undefined;
  removeFromCart: (id: string) => void;
  removeCart: () => void;
  changeCount: (idProd: string, count: number) => void;
  promocode: string;
  setPromocode: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  clickApply: () => void;
  discountCode: DiscountCodeInfo[];
}

const Cart: React.FC<CartProps> = ({
  allProducts,
  totalPrice,
  totalCount,
  removeFromCart,
  removeCart,
  changeCount,
  promocode,
  setPromocode,
  isDisabled,
  setDisabled,
  clickApply,
  discountCode,
}) => {
  const [modalActive, setModalActive] = useState<boolean>(false);

  return (
    <div className="cart">
      <div className="cart__wrapper">
        <div className="cart__header">
          <button
            onClick={(): void => setModalActive(true)}
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
                  onClick={(): void => removeFromCart(product.id)}
                  changeCount={changeCount}
                  discountCodeValue={
                    product.discountedPricePerQuantity.length > 0
                      ? (
                          product.discountedPricePerQuantity[0].discountedPrice
                            .value.centAmount / 100
                        ).toFixed(2)
                      : ''
                  }
                  discountCode={discountCode}
                />
              ))}
            </tbody>
            <tfoot>
              <Promocode
                promocode={promocode}
                setPromocode={setPromocode}
                isDisabled={isDisabled}
                setDisabled={setDisabled}
                clickApply={clickApply}
              />
            </tfoot>
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
          <button
            onClick={(): void => {
              removeCart();
              setModalActive(false);
            }}
            className="modal-buttons__button"
            type="button"
          >
            Yes
          </button>
          <button
            onClick={(): void => setModalActive(false)}
            className="modal-buttons__button"
            type="button"
          >
            Exit
          </button>
        </div>
      </ModalPage>
    </div>
  );
};

export default Cart;
