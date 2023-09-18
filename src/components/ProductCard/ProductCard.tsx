import React, { FC, useContext, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import heart from '../../assets/svg/blackHeart.svg';
import heartRed from '../../assets/images/red-heart.png';
import cart from '../../assets/svg/cart.svg';
import './ProductCard.scss';
import sale from '../../assets/images/sale-icon.png';
import { createCartAnonimous, createCartCustomer } from '../../api/createCart';
import { updateCartAnonimous, updateCart } from '../../api/updateCart';
import { getCart, getCartCustomer } from '../../api/getCart';
import { QuantityContext } from '../../hoc/QuantityProvider';

interface ProductCardProps {
  image: string;
  title: string;
  desc: string;
  price: string;
  onSale: string | undefined;
  idProduct: string;
  onClick: () => void;
  isFavorites: boolean;
}

export const ProductCard: FC<ProductCardProps> = ({
  image,
  title,
  desc,
  price,
  onSale,
  idProduct,
  onClick,
  isFavorites,
}) => {
  const [version, setVersion] = useState<number>();
  const [isActive, setIsActive] = useState(false);
  const { setCount, allProductsWine, favorites } = useContext(QuantityContext);
  const [isFavoritesProduct, seIsFavoritesProduct] =
    useState<boolean>(isFavorites);
  React.useEffect(() => {
    const idCartLS = localStorage.getItem('idCartWin4ik') as string;
    const id = localStorage.getItem('userWin4ik') as string;
    console.log('all', allProductsWine);
    if (idCartLS && !id) {
      getCart(idCartLS).then((obj) => {
        setCount(obj.body.totalLineItemQuantity as number);
        setVersion(obj.body.version);
        localStorage.setItem('versionWin4ik', `${obj.body.version}`);
        const products = obj.body.lineItems;
        Array.from(products).forEach((item) => {
          if (item.productId === idProduct) {
            setIsActive(true);
          }
        });
      });
    }
    if (idCartLS && id) {
      getCartCustomer()
        .then((obj) => {
          setCount(obj.body.totalLineItemQuantity as number);
          setVersion(obj.body.version);
          localStorage.setItem('versionWin4ik', `${obj.body.version}`);
          localStorage.setItem('idCartWin4ik', obj.body.id);
          const products = obj.body.lineItems;
          Array.from(products).forEach((item) => {
            if (item.productId === idProduct) {
              setIsActive(true);
            }
          });
        })
        .catch(() => {
          createCartCustomer().then((resp) => {
            setVersion(resp.body.version);
            localStorage.setItem('versionWin4ik', `${resp.body.version}`);
          });
        });
    }
    if (id) {
      getCartCustomer()
        .then((obj) => {
          setCount(obj.body.totalLineItemQuantity as number);
          setVersion(obj.body.version);
          localStorage.setItem('versionWin4ik', `${obj.body.version}`);
          localStorage.setItem('idCartWin4ik', obj.body.id);
          const products = obj.body.lineItems;
          Array.from(products).forEach((item) => {
            if (item.productId === idProduct) {
              setIsActive(true);
            }
          });
        })
        .catch(() => {
          createCartCustomer().then((resp) => {
            setVersion(resp.body.version);
            localStorage.setItem('versionWin4ik', `${resp.body.version}`);
            localStorage.setItem('idCartWin4ik', resp.body.id);
          });
        });
    }
  }, [isActive, version]);

  const findElementById = (
    id: string,
    allProductsWine1: ProductProjection[],
    favorites1: ProductProjection[]
  ): void => {
    console.log('addd');
    console.log('allAD', allProductsWine1);
    const elementSelected = allProductsWine1.filter((item) => item.id === id);
    const repeatElementIndex = favorites1.findIndex(
      (item) => item.id === elementSelected[0].id
    );
    if (repeatElementIndex === -1) {
      favorites.push(...elementSelected);
    } else {
      favorites.splice(repeatElementIndex, 1);
    }
    localStorage.setItem('favoritesWin4ik', JSON.stringify(favorites));
  };

  const addCart = async (): Promise<void> => {
    const id = localStorage.getItem('userWin4ik') as string;
    const idCartLS = localStorage.getItem('idCartWin4ik') as string;
    if (!id && !idCartLS) {
      createCartAnonimous().then((obj) => {
        localStorage.setItem('idCartWin4ik', obj.body.id);
        updateCartAnonimous(obj.body.id, obj.body.version, idProduct).then(
          (resp) => {
            setVersion(resp.body.version);
            localStorage.setItem('versionWin4ik', `${resp.body.version}`);
            setIsActive(true);
          }
        );
      });
    }
    if (idCartLS && !id) {
      const versionNumber = Number(localStorage.getItem('versionWin4ik'));
      updateCartAnonimous(idCartLS, versionNumber, idProduct).then((resp) => {
        setVersion(resp.body.version);
        localStorage.setItem('versionWin4ik', `${resp.body.version}`);
      });
    }
    if (id && idCartLS) {
      const versionNumber = Number(localStorage.getItem('versionWin4ik'));
      updateCart(idCartLS, versionNumber, idProduct).then((resp) => {
        setVersion(resp.body.version);
        localStorage.setItem('versionWin4ik', `${resp.body.version}`);
      });
    }
  };
  return (
    <div aria-hidden="true" className="product-card">
      {onSale ? (
        <img className="product-card__sale" src={sale} alt="sale icon" />
      ) : (
        ''
      )}
      <button
        type="button"
        className="product-card__image-wrap"
        onClick={(): void => onClick()}
      >
        <img src={image} alt="bottle" className="product-card__image" />
      </button>
      <div className="product-card__icons">
        <button
          id={idProduct}
          className="product-card__icon"
          type="button"
          onClick={addCart}
          disabled={isActive}
        >
          <img className="icon__image" src={cart} alt="icon cart" />
          {isActive && <span className="icon__marker">&#10003;</span>}
        </button>
        <button
          onClick={(): void => {
            findElementById(idProduct, allProductsWine, favorites);
            seIsFavoritesProduct((prev) => !prev);
          }}
          className="product-card__icon"
          type="button"
        >
          <img
            className="icon__image"
            src={isFavoritesProduct ? heartRed : heart}
            alt="icon heart"
          />
        </button>
      </div>
      <h2 className="product-card__title">{title}</h2>
      <p className="product-card__description">{desc}</p>
      <div className="product-card__price">
        <span className={onSale ? 'current-price crossed' : 'current-price'}>
          {price} $
        </span>
        {onSale ? <span className="sale-price_card">{onSale} $</span> : ''}
      </div>
    </div>
  );
};
