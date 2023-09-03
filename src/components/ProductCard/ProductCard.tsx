import React, { FC } from 'react';
import heart from '../../assets/svg/blackHeart.svg';
import cart from '../../assets/svg/blackShopping.svg';
import './ProductCard.scss';
import sale from '../../assets/images/sale-icon.png';

interface ProductCardProps {
  image: string;
  title: string;
  desc: string;
  price: string;
  onSale: string | undefined;
  onClick: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  image,
  title,
  desc,
  price,
  onSale,
  onClick,
}) => {
  return (
    <div
      onClick={(): void => onClick()}
      aria-hidden="true"
      className="product-card"
    >
      {onSale ? (
        <img className="product-card__sale" src={sale} alt="sale icon" />
      ) : (
        ''
      )}
      <div className="product-card__image-wrap">
        <img src={image} alt="bottle" className="product-card__image" />
      </div>
      <div className="product-card__icons">
        <button className="product-card__icon" type="button">
          <img className="icon__image" src={cart} alt="icon cart" />
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
