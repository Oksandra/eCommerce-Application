import React from 'react';
import glassOfWine from '../../assets/svg/wine-glass.svg';
import './Loader.scss';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img src={glassOfWine} width="150" height="150" alt="wine-glass" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
