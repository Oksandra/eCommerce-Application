import React, { useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';

import Cart from '../../components/Cart/Catr';
// import CartEmpty from '../../components/Cart/CartEmpty/CartEmpty';
import { getCart } from '../../api/getCart';

const CartPage: React.FC = () => {
  const user = localStorage.getItem('idCartWin4ik');
  const [allProducts, setAllProducts] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number | undefined>();

  if (user) {
    React.useEffect(() => {
      getCart(user).then((data) => {
        console.log(data.body);
        setAllProducts(data.body.lineItems);
        setTotalPrice(data.body.totalPrice.centAmount);
        setTotalCount(data.body.totalLineItemQuantity);
      });
    }, []);
  }
  return (
    <Cart
      allProducts={allProducts}
      totalPrice={totalPrice}
      totalCount={totalCount}
    />
  );
};

export default CartPage;
