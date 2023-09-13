import React, { useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';

import Cart from '../../components/Cart/Catr';
import CartEmpty from '../../components/Cart/CartEmpty/CartEmpty';
import { getCart, getCartCustomer } from '../../api/getCart';
import Loader from '../../components/Loader/Loader';

const CartPage: React.FC = () => {
  const cartId: string | null = localStorage.getItem('idCartWin4ik');
  const user: string | null = localStorage.getItem('userWin4ik');
  const [allProducts, setAllProducts] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);

  React.useEffect(() => {
    if (!cartId && !user) {
      setIsloading(false);
      setCartEmpty(true);
    }
  }, []);

  if (cartId && !user) {
    React.useEffect(() => {
      getCart(cartId)
        .then((data) => {
          console.log(data.body.lineItems);
          setAllProducts(data.body.lineItems);
          setTotalPrice(data.body.totalPrice.centAmount);
          setTotalCount(data.body.totalLineItemQuantity);
          return data.body.lineItems;
        })
        .then((data) => {
          if (data.length === 0) {
            setCartEmpty(true);
          } else {
            setIsloading(false);
            setCartEmpty(false);
          }
        });
    }, []);
  }

  if (user) {
    React.useEffect(() => {
      getCartCustomer()
        .then((data) => {
          console.log(data.body);
          setAllProducts(data.body.lineItems);
          setTotalPrice(data.body.totalPrice.centAmount);
          setTotalCount(data.body.totalLineItemQuantity);
          return data.body.lineItems;
        })
        .then((data) => {
          if (data.length === 0) {
            setCartEmpty(true);
          } else {
            setIsloading(false);
            setCartEmpty(false);
          }
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
