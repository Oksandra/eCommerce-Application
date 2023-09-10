import React from 'react';
import { Link } from 'react-router-dom';

import cartEmpty from '../../../assets/images/cart_empty.jpg';
import './CartEmpty.scss';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart-empty">
      <h2>Cart is still empty</h2>
      <img src={cartEmpty} alt="cart-empty" className="cart-empty__image" />
      <p className="cart-empty__text">You haven&apos;t chosen anything yet</p>
      <div className="catalog-link">
        <span>Please go to the catalog to order</span>
        <Link to="/catalog">
          <button className="things__button" type="button">
            CATALOGUE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
