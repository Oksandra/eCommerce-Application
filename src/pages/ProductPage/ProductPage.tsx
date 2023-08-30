import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductData } from '@commercetools/platform-sdk';
import getProduct from '../../api/getProduct';
import './ProductPage.scss';
import Loader from '../../components/Loader/Loader';

interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [images, setImages] = useState<Image[] | undefined>();
  React.useEffect(() => {
    getProduct(`${id}`)
      .then((data) => {
        setProduct(data.body.masterData.current);
        console.log(data.body.masterData.current);
        setImages(data.body.masterData.current.masterVariant.images);
        setIsloading(false);
      })
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-card">
          <div className="product-card__wrapper">
            <div className="images">
              <div className="images__main">
                <img
                  src={images ? images[0].url : ''}
                  className="product-card__img"
                  alt="bottle of wine"
                />
              </div>
              <div className="images__additional">
                <img
                  src={images ? images[0].url : ''}
                  className="images__card"
                  alt="a lot of wine"
                />
                <img
                  src={images ? images[1].url : ''}
                  className="images__card"
                  alt="a lot of wine"
                />
                <img
                  src={images ? images[2].url : ''}
                  className="images__card"
                  alt="a lot of wine"
                />
              </div>
            </div>
            <p>{product && product.name['en-US']}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
