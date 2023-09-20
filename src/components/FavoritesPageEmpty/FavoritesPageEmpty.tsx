import React from 'react';

import './FavoritesPageEmpty.scss';

const FavoritesPageEmpty: React.FC = () => {
  return (
    <div className="favorites-empty">
      <h2>Favorites are empty</h2>
      <p className="favorites-empty__text">Add products using ❤️️</p>
    </div>
  );
};

export default FavoritesPageEmpty;
