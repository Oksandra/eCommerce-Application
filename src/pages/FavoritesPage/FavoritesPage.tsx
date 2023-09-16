import React from 'react';

import './FavoritesPage.scss';
import FavoritesPageEmpty from '../../components/FavoritesPageEmpty/FavoritesPageEmpty';

const FavoritesPage: React.FC = () => {
  return (
    <div className="favorites-page">
      <FavoritesPageEmpty />
    </div>
  );
};

export default FavoritesPage;
