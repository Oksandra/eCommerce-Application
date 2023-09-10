import React, { FC, useState } from 'react';
import heart from '../../assets/svg/blackHeart.svg';
import cart from '../../assets/svg/cart.svg';
import './ProductCard.scss';
import sale from '../../assets/images/sale-icon.png';
import { createCartAnonimous } from '../../api/createCart';
import updateCartAnonimous from '../../api/updateCart';
import { getCart } from '../../api/getCart';

interface ProductCardProps {
  image: string;
  title: string;
  desc: string;
  price: string;
  onSale: string | undefined;
  idProduct: string;
  onClick: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  image,
  title,
  desc,
  price,
  onSale,
  idProduct,
  onClick,
}) => {
  const [version, setVersion] = useState<number>();
  const [isActive, setIsActive] = useState(false);
  React.useEffect(() => {
    const idCartLS = localStorage.getItem('idCartWin4ik') as string;
    if (idCartLS) {
      getCart(idCartLS).then((obj) => {
        setVersion(obj.body.version);
        const products = obj.body.lineItems;
        Array.from(products).forEach((item) => {
          if (item.productId === idProduct) {
            setIsActive(true);
          }
        });
      });
    }
  }, [isActive, version]);
  const addCart = (): void => {
    const id = localStorage.getItem('userWin4ik') as string;
    const idCartLS = localStorage.getItem('idCartWin4ik') as string;
    if (!id && !idCartLS) {
      createCartAnonimous().then((obj) => {
        localStorage.setItem('idCartWin4ik', obj.body.id);
        updateCartAnonimous(obj.body.id, obj.body.version, idProduct).then(
          (resp) => {
            setVersion(resp.body.version);
            setIsActive(true);
          }
        );
      });
    }
    if (idCartLS) {
      updateCartAnonimous(idCartLS, version as number, idProduct).then(
        (resp) => {
          setVersion(resp.body.version);
        }
      );
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
        <button className="product-card__icon" type="button">
          <img className="icon__image" src={heart} alt="icon heart" />
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
