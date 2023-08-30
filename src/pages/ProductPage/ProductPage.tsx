import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductData } from '@commercetools/platform-sdk';
import getProduct from '../../api/getProduct';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState<ProductData | null>(null);
  React.useEffect(() => {
    getProduct(`${id}`)
      .then((data) => setProduct(data.body.masterData.current))
      .catch(() => navigate('/*'));
  }, [id]);

  return (
    <div>
      <div>{product && product.name['en-US']}</div>
    </div>
  );
};

export default ProductPage;
