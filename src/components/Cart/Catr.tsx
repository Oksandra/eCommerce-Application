import React from 'react';

import './Cart.scss';
import CartProductCard from './CartProductCard/CartProductCard';
import bottle from '../../assets/GER_the_bench_cs.jpg';

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
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody className="cart-table__body">
              <CartProductCard
                image={bottle}
                count={1}
                price={50.12}
                title="The Bench Cabernet Sauvignon"
              />
              <CartProductCard
                image={bottle}
                count={5}
                price={120.27}
                title="La Colombina Brunello di Montalcino DOCG"
              />
              <CartProductCard
                image={bottle}
                count={3}
                price={99.31}
                title="Masseria Borgo dei Trulli Vermentino IGP Puglia"
              />
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
                <td>TOTAL price:</td>
              </tr>
              <tr className="total-table__count">
                <td>TOTAL count:</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
