import React from 'react';

import './Cart.scss';
import CartEmpty from './CartEmpty/CartEmpty';

const Cart: React.FC = () => {
  return (
    <div className="cart">
      <CartEmpty />
    </div>
  );
};

export default Cart;
