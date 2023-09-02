import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [images, setImages] = useState<Image[] | undefined>();
  React.useEffect(() => {
    setIsloading(true);
    getProduct(`${id}`)
      .then((data) => {
        setProduct(data.body.masterData.current);
        console.log(data.body.masterData.current);
        setImages(data.body.masterData.current.masterVariant.images);
        setIsloading(false);
      })
      .catch(() => navigate('/*'));
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="products-card">
          <div className="products-card__wrapper">
            <div className="images">
              <div className="images__main">
                <img
                  src={images ? images[0].url : ''}
                  className="products-card__img"
                  alt="bottle of wine"
                />
              </div>
              <div className="images__additional">
                {images &&
                  images.map((image, index) => (
                    <img
                      src={images[index].url}
                      className="images__card"
                      alt="a lot of wine"
                      key={images[index].url}
                    />
                  ))}
              </div>
            </div>
            <div className="products-card__info">
              <h3 className="products-card__title">
                {product && product.name['en-US']}
              </h3>
              <p className="products-card__desc">
                {product && product.description && product.description['en-US']}
              </p>
              <button className="products-card__button" type="button">
                Buy NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
