import React from 'react';
import './CategorySection.scss';

const CategorySection: React.FC = () => {
  return (
    <section className="category">
      <div className="category__wrapper">
        <h3 className="category__title">Shop by category</h3>
        <div className="category__items">
          <div className="category__item category__item_red">
            <p className="category__text">RED WINE</p>
          </div>
          <div className="category__item category__item_white">
            <p className="category__text">WHITE WINE</p>
          </div>
          <div className="category__item category__item_rose">
            <p className="category__text">ROSE WINE</p>
          </div>
          <div className="category__item category__item_sparkling">
            <p className="category__text">SPARKLING WINE</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
