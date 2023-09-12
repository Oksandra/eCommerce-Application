import React, { useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';

import Cart from '../../components/Cart/Catr';
import CartEmpty from '../../components/Cart/CartEmpty/CartEmpty';
import { getCart } from '../../api/getCart';
import Loader from '../../components/Loader/Loader';

const CartPage: React.FC = () => {
  const user: string | null = localStorage.getItem('idCartWin4ik');
  const [allProducts, setAllProducts] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);

  React.useEffect(() => {
    if (!user) {
      setIsloading(false);
      setCartEmpty(true);
    }
  }, [user]);

  if (user) {
    React.useEffect(() => {
      getCart(user).then((data) => {
        console.log(data.body);
        setAllProducts(data.body.lineItems);
        setTotalPrice(data.body.totalPrice.centAmount);
        setTotalCount(data.body.totalLineItemQuantity);
        setIsloading(false);
        setCartEmpty(false);
      });
    }, []);
  }

  return (
    <>
      {cartEmpty ? <CartEmpty /> : ''}
      {!cartEmpty && isLoading ? <Loader /> : ''}
      {!cartEmpty && !isLoading ? (
        <Cart
          allProducts={allProducts}
          totalPrice={totalPrice}
          totalCount={totalCount}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default CartPage;
