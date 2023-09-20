import { DiscountCodeInfo, LineItem } from '@commercetools/platform-sdk';
import React, { useContext, useState } from 'react';

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
import { addPromocode } from '../../api/addPromocode';
import Modal from '../../components/Modal/Modal';
import { QuantityContext } from '../../hoc/QuantityProvider';

const CartPage: React.FC = () => {
  const cartId: string | null = localStorage.getItem('idCartWin4ik');
  const user: string | null = localStorage.getItem('userWin4ik');
  const [allProducts, setAllProducts] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);
  const promocodeApplied = localStorage.getItem('promocodeWin4ik') as string;
  const [promocode, setPromocode] = useState(promocodeApplied || '');
  const [isDisabled, setDisabled] = useState(true);
  const [discountCode, setDiscountCode] = useState<
    DiscountCodeInfo[] | undefined
  >();
  const [isActive, setActive] = useState<boolean>(false);
  const { setCount } = useContext(QuantityContext);

  const removeFromCart = (id: string): void => {
    const version = Number(localStorage.getItem('versionWin4ik'));
    const idCustomer = localStorage.getItem('userWin4ik');
    const idCart = localStorage.getItem('idCartWin4ik');
    const lineItemId = id;
    if (idCustomer) {
      removeProductFromCart(idCart as string, version, lineItemId)
        .then((obj) => {
          setTotalPrice(obj.body.totalPrice.centAmount);
          if (obj.body.totalLineItemQuantity) {
            setCount(obj.body.totalLineItemQuantity);
          } else {
            setCount(null);
          }
          localStorage.setItem('versionWin4ik', String(obj.body.version));
        })
        .catch((e) => console.log(e));
    }
    if (!idCustomer) {
      removeProductFromCartAnonimous(idCart as string, version, lineItemId)
        .then((resp) => {
          setTotalPrice(resp.body.totalPrice.centAmount);
          if (resp.body.totalLineItemQuantity) {
            setCount(resp.body.totalLineItemQuantity);
          } else {
            setCount(null);
          }
          localStorage.setItem('versionWin4ik', String(resp.body.version));
        })
        .catch((e) => console.log(e));
    }
  };

  const removeCart = (): void => {
    const version = Number(localStorage.getItem('versionWin4ik'));
    const idCart = localStorage.getItem('idCartWin4ik');
    setCount(null);
    setCartEmpty(true);
    deleteCart(idCart as string, version)
      .then(() => {
        localStorage.removeItem('idCartWin4ik');
        localStorage.removeItem('promocodeWin4ik');
        localStorage.removeItem('countProductsWin4ik');
      })
      .catch((e) => console.log(e));
  };

  const changeProductsQuantity = (idProd: string, count: number): void => {
    const versionNumber = Number(localStorage.getItem('versionWin4ik'));
    const id = localStorage.getItem('idCartWin4ik');
    const idLine = idProd;
    if (count < 0) return;
    changeCountProduct(id as string, versionNumber, idLine, count)
      .then((data) => {
        localStorage.setItem('versionWin4ik', String(data.body.version));
        setTotalCount(data.body.totalLineItemQuantity);
      })
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    if ((!cartId && !user) || (user && !cartId)) {
      setIsloading(false);
      setCartEmpty(true);
      setCount(null);
    }
  }, []);

  if (cartId && !user) {
    React.useEffect(() => {
      getCart(cartId)
        .then((data) => {
          setAllProducts(data.body.lineItems);
          setTotalPrice(data.body.totalPrice.centAmount);
          setTotalCount(data.body.totalLineItemQuantity);
          setDiscountCode(data.body.discountCodes);
          localStorage.setItem('versionWin4ik', String(data.body.version));
          localStorage.setItem('idCartWin4ik', data.body.id);
          if (data.body.totalLineItemQuantity) {
            setCount(data.body.totalLineItemQuantity);
          } else {
            setCount(null);
          }
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
          setDiscountCode(data.body.discountCodes);
          setAllProducts(data.body.lineItems);
          setTotalPrice(data.body.totalPrice.centAmount);
          setTotalCount(data.body.totalLineItemQuantity);
          localStorage.setItem('versionWin4ik', String(data.body.version));
          localStorage.setItem('idCartWin4ik', data.body.id);
          if (data.body.totalLineItemQuantity) {
            setCount(data.body.totalLineItemQuantity);
          } else {
            setCount(null);
          }
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

  const clickApply = (): void => {
    const versionNumber = Number(localStorage.getItem('versionWin4ik'));
    const id = localStorage.getItem('idCartWin4ik');
    addPromocode(id as string, versionNumber, promocode)
      .then((obj) => {
        setAllProducts(obj.body.lineItems);
        setTotalPrice(obj.body.totalPrice.centAmount);
        setTotalCount(obj.body.totalLineItemQuantity);
        localStorage.setItem('versionWin4ik', String(obj.body.version));
        localStorage.setItem('idCartWin4ik', obj.body.id);
        setDiscountCode(obj.body.discountCodes);
        setDisabled(true);
        localStorage.setItem('promocodeWin4ik', promocode);
      })
      .catch(() => {
        setActive(true);
        setTimeout(() => {
          setActive(false);
        }, 3000);
      });
  };

  return (
    <>
      {cartEmpty ? <CartEmpty /> : ''}
      {!cartEmpty && isLoading ? <Loader /> : ''}
      {!cartEmpty && !isLoading ? (
        <>
          <Cart
            allProducts={allProducts}
            totalPrice={totalPrice}
            totalCount={totalCount}
            removeFromCart={removeFromCart}
            removeCart={removeCart}
            changeCount={changeProductsQuantity}
            promocode={promocode}
            setPromocode={setPromocode}
            isDisabled={isDisabled}
            setDisabled={setDisabled}
            clickApply={clickApply}
            discountCode={discountCode as DiscountCodeInfo[]}
          />
          <Modal
            active={isActive}
            resultType="error"
            message="Incorrect promocode!"
          />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default CartPage;
