import React from 'react';

import './Cart.scss';

const Cart: React.FC = () => {
  return (
    <div className="cart">
      <div className="cart__wrapper">
        <h2 className="cart__title">Shopping Cart</h2>
        <div className="tables__wrapper">
          <table className="cart-table">
            <thead className="cart-table__head">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody className="cart-table__body">
              <tr>
                <td>products1</td>
              </tr>
              <tr>
                <td>products2</td>
              </tr>
              <tr>
                <td>products3</td>
              </tr>
              <tr>
                <td>products4</td>
              </tr>
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
                <td>Total cost!</td>
              </tr>
              <tr className="total-table__count">
                <td>Total count!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
