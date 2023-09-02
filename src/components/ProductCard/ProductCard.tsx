import React, { FC } from 'react';
import heart from '../../assets/svg/blackHeart.svg';
import cart from '../../assets/svg/blackShopping.svg';
import './ProductCard.scss';

interface ProductCardProps {
  image: string;
  title: string;
  desc: string;
  price: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  image,
  title,
  desc,
  price,
}) => {
  return (
    <div className="product-card">
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
      <div className="product-card__price">{price} $</div>
    </div>
  );
};
