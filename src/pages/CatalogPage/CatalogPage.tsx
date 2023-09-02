import React, { useState } from 'react';
import './CatalogPage.scss';
import { Product } from '@commercetools/platform-sdk';
import getAllProducts from '../../api/getAllProducts';
import { ProductCard } from '../../components/ProductCard/ProductCard';

const CatalogPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    getAllProducts(1)
      .then((data) => {
        setAllProducts(data.body.results);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="catalog">
      <div className="catalog__wrapper">
        {allProducts.map((product) => (
          <ProductCard
            title={product.masterData.current.name['en-US']}
            image={
              product.masterData.current.masterVariant.images
                ? product.masterData.current.masterVariant.images[0].url
                : ''
            }
            price="100"
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
