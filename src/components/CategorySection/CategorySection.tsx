import React from 'react';
import './CategorySection.scss';

const CategorySection: React.FC = () => {
  return (
    <section className="category">
      <div className="category__wrapper">
        <h3 className="category__title">Shop by category</h3>
        <div className="category__items">
          <div className="category__item category__item_red" />
          <div className="category__item category__item_white" />
          <div className="category__item category__item_rose" />
          <div className="category__item category__item_sparkling" />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
