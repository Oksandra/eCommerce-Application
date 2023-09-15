import React, { useContext, useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';

import Cart from '../../components/Cart/Catr';
import CartEmpty from '../../components/Cart/CartEmpty/CartEmpty';
import { getCart, getCartCustomer } from '../../api/getCart';
import Loader from '../../components/Loader/Loader';
import {
  removeProductFromCart,
  removeProductFromCartAnonimous,
} from '../../api/removeProductFromCart';
import { deleteCart } from '../../api/deleteCart';
import { changeCountProduct } from '../../api/changeCountProduct';
import { QuantityContext } from '../../hoc/QuantityProvider';

const CartPage: React.FC = () => {
  const cartId: string | null = localStorage.getItem('idCartWin4ik');
  const user: string | null = localStorage.getItem('userWin4ik');
  const [allProducts, setAllProducts] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);
  const { setCount } = useContext(QuantityContext);

  const removeFromCart = (id: string, count: number): void => {
    const version = Number(localStorage.getItem('versionWin4ik'));
    const idCustomer = localStorage.getItem('userWin4ik');
    const idCart = localStorage.getItem('idCartWin4ik');
    const lineItemId = id;
    const productQuantity = count;
    if (idCustomer) {
      removeProductFromCart(
        idCart as string,
        version,
        lineItemId,
        productQuantity
      ).then((obj) => {
        setTotalPrice(obj.body.totalPrice.centAmount);
        localStorage.setItem('versionWin4ik', String(obj.body.version));
      });
    }
    if (!idCustomer) {
      removeProductFromCartAnonimous(
        idCart as string,
        version,
        lineItemId,
        productQuantity
      )
        .then((resp) => {
          setTotalPrice(resp.body.totalPrice.centAmount);
          localStorage.setItem('versionWin4ik', String(resp.body.version));
        })
        .catch((e) => console.log(e));
    }
  };

  const removeCart = (): void => {
    const version = Number(localStorage.getItem('versionWin4ik'));
    const idCart = localStorage.getItem('idCartWin4ik');
    setCount(undefined);
    setCartEmpty(true);
    deleteCart(idCart as string, version).then(() =>
      localStorage.removeItem('idCartWin4ik')
    );
  };

  const changeProductsQuantity = (idProd: string, count: number): void => {
    const versionNumber = Number(localStorage.getItem('versionWin4ik'));
    const id = localStorage.getItem('idCartWin4ik');
    const idLine = idProd;
    changeCountProduct(id as string, versionNumber, idLine, count).then(
      (data) => {
        localStorage.setItem('versionWin4ik', String(data.body.version));
        setTotalCount(data.body.totalLineItemQuantity);
      }
    );
  };

  React.useEffect(() => {
    if ((!cartId && !user) || (user && !cartId)) {
      setIsloading(false);
      setCartEmpty(true);
      setCount(undefined);
    }
  }, []);

  if (cartId && !user) {
    React.useEffect(() => {
      getCart(cartId)
        .then((data) => {
          setAllProducts(data.body.lineItems);
          setTotalPrice(data.body.totalPrice.centAmount);
          setTotalCount(data.body.totalLineItemQuantity);
          localStorage.setItem('versionWin4ik', String(data.body.version));
          localStorage.setItem('idCartWin4ik', data.body.id);
          setCount(data.body.totalLineItemQuantity as number);
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
    }, [totalPrice, totalCount]);
  }

  if (user && cartId) {
    React.useEffect(() => {
      getCartCustomer()
        .then((data) => {
          console.log(data.body);
          setAllProducts(data.body.lineItems);
          setTotalPrice(data.body.totalPrice.centAmount);
          setTotalCount(data.body.totalLineItemQuantity);
          localStorage.setItem('versionWin4ik', String(data.body.version));
          localStorage.setItem('idCartWin4ik', data.body.id);
          setCount(data.body.totalLineItemQuantity as number);
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
    }, [totalPrice, totalCount]);
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
          removeFromCart={removeFromCart}
          removeCart={removeCart}
          changeCount={changeProductsQuantity}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default CartPage;
