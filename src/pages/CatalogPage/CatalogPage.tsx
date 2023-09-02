import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CatalogPage.scss';
import { Product } from '@commercetools/platform-sdk';
import getAllProducts from '../../api/getAllProducts';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';

const CatalogPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(true);

  React.useEffect(() => {
    getAllProducts(0)
      .then((data) => {
        setAllProducts(data.body.results);
        setIsloading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="catalog">
      <div
        className={isLoading ? 'catalog__wrapper empty' : 'catalog__wrapper'}
      >
        {isLoading ? (
          <Loader />
        ) : (
          allProducts.map((product) => (
            <ProductCard
              title={product.masterData.current.name['en-US']}
              image={
                product.masterData.current.masterVariant.images
                  ? product.masterData.current.masterVariant.images[0].url
                  : ''
              }
              desc={
                product.masterData.current.metaDescription
                  ? product.masterData.current.metaDescription['en-US']
                  : ''
              }
              price={
                product.masterData.current.masterVariant.prices
                  ? (
                      product.masterData.current.masterVariant.prices[0].value
                        .centAmount / 100
                    ).toFixed(2)
                  : ''
              }
              key={product.id}
              onClick={(): void => navigate(`/catalog/${product.id}`)}
              onSale={
                product.masterData.current.masterVariant.prices &&
                product.masterData.current.masterVariant.prices[0].discounted
                  ?.value
                  ? (
                      product.masterData.current.masterVariant.prices[0]
                        .discounted.value.centAmount / 100
                    ).toFixed(2)
                  : ''
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
