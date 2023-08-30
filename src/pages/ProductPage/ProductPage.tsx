import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductData } from '@commercetools/platform-sdk';
import getProduct from '../../api/getProduct';
import './ProductPage.scss';
import Loader from '../../components/Loader/Loader';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductData | null>(null);
  React.useEffect(() => {
    getProduct(`${id}`)
      .then((data) => {
        setProduct(data.body.masterData.current);
        setIsloading(false);
      })
      .catch(() => navigate('/*'));
  }, [id]);

  return (
    <div className="product-card">
      {isLoading ? <Loader /> : product && product.name['en-US']}
    </div>
  );
};

export default ProductPage;
