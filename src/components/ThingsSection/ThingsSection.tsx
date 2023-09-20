import React from 'react';
import './ThingsSection.scss';
import { Link } from 'react-router-dom';

const ThingsSection: React.FC = () => {
  return (
    <section className="things">
      <div className="things__wrapper">
        <h1 className="things__title">I drink wine and I know things</h1>
        <p className="things__text">Tyrion Lannister</p>
        <div className="things__buttons">
          <Link to="/catalog">
            <button className="things__button" type="button">
              CATALOGUE
            </button>
          </Link>
          <Link to="/cart">
            <button className="things__button" type="button">
              CART
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThingsSection;
