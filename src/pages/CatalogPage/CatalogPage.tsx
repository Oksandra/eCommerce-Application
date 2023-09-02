import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CatalogPage.scss';
import { Product } from '@commercetools/platform-sdk';
import getAllProducts from '../../api/getAllProducts';
import { ProductCard } from '../../components/ProductCard/ProductCard';

const CatalogPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
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
            desc={
              product.masterData.current.metaDescription
                ? product.masterData.current.metaDescription['en-US']
                : ''
            }
            price="100"
            key={product.id}
            onClick={(): void => navigate(`/catalog/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
