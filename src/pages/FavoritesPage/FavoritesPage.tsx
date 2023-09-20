import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './FavoritesPage.scss';
import FavoritesPageEmpty from '../../components/FavoritesPageEmpty/FavoritesPageEmpty';
import { QuantityContext } from '../../hoc/QuantityProvider';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import getProducts from '../../api/getProducts';

const FavoritesPage: React.FC = () => {
  const { favorites, setNewAllProductsWine } = useContext(QuantityContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    getProducts()
      .then((data) => {
        return data;
      })
      .then((data) => setNewAllProductsWine(data.body.results))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div
      className={
        favorites.length === 0 ? 'favorites-page' : 'favorites-page grid'
      }
    >
      {favorites.length === 0 ? (
        <FavoritesPageEmpty />
      ) : (
        favorites.map((product) => (
          <ProductCard
            idProduct={product.id}
            title={product.metaTitle ? product.metaTitle['en-US'] : ''}
            image={
              product.masterVariant.images
                ? product.masterVariant.images[0].url
                : ''
            }
            desc={
              product.metaDescription ? product.metaDescription['en-US'] : ''
            }
            price={
              product.masterVariant.prices
                ? (
                    product.masterVariant.prices[0].value.centAmount / 100
                  ).toFixed(2)
                : ''
            }
            key={product.id}
            onClick={(): void => {
              navigate(`/catalog/${product.id}`);
            }}
            onSale={
              product.masterVariant.prices &&
              product.masterVariant.prices[0].discounted?.value
                ? (
                    product.masterVariant.prices[0].discounted.value
                      .centAmount / 100
                  ).toFixed(2)
                : ''
            }
            isFavorites
          />
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
