import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Price, ProductData } from '@commercetools/platform-sdk';
import getProduct from '../../api/getProduct';
import './ProductPage.scss';
import Loader from '../../components/Loader/Loader';
import sale from '../../assets/images/sale-icon.png';
import ModalProductPage from '../../components/ModalProductPage/ModalProductPage';
import { getCart, getCartCustomer } from '../../api/getCart';

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
  const [prices, setPrices] = useState<Price[] | undefined>();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [imgPath, setImgPath] = useState<string | undefined>();
  const [inCart, setInCart] = useState(false);
  React.useEffect(() => {
    setIsloading(true);
    setPrices(undefined);
    getProduct(`${id}`)
      .then((data) => {
        setProduct(data.body.masterData.current);
        setPrices(data.body.masterData.current.masterVariant.prices);
        setImages(data.body.masterData.current.masterVariant.images);
        setIsloading(false);
      })
      .catch(() => navigate('/*'));
    const idCustomer = localStorage.getItem('userWin4ik');
    const idCart = localStorage.getItem('idCartWin4ik');
    if (idCustomer && idCart) {
      getCartCustomer().then((obj) => {
        const products = obj.body.lineItems;
        products.forEach((item) => {
          if (item.productId === id) {
            setInCart(true);
          }
        });
      });
    }
    if (!idCustomer && idCart) {
      getCart(idCart).then((resp) => {
        const products = resp.body.lineItems;
        products.forEach((item) => {
          if (item.productId === id) {
            setInCart(true);
          }
        });
      });
    }
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="products-card">
          <div className="products-card__wrapper">
            <div className="images">
              <div
                aria-hidden="true"
                onClick={(e): void => {
                  setModalActive(true);
                  if (
                    e.currentTarget instanceof Element &&
                    e.currentTarget.children[0].getAttribute('src')
                  ) {
                    setImgPath(
                      e.currentTarget.children[0].getAttribute('src') as string
                    );
                  }
                }}
                className="images__main"
              >
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
                      aria-hidden="true"
                      onClick={(e): void => {
                        setModalActive(true);
                        setImgPath(
                          e.currentTarget.getAttribute('src') as string
                        );
                      }}
                    />
                  ))}
              </div>
            </div>
            <div className="products-card__info">
              <h3 className="products-card__title">
                {product && product.name['en-US']}
                {prices && prices[0].discounted?.value ? (
                  <img
                    className="products-card__sale"
                    src={sale}
                    alt="sale icon"
                  />
                ) : (
                  ''
                )}
              </h3>
              <p className="products-card__price">
                <span
                  className={
                    prices && prices[0].discounted?.value
                      ? 'current-price crossed'
                      : 'current-price'
                  }
                >
                  $
                  {product &&
                    product.masterVariant.prices &&
                    (
                      product.masterVariant.prices[0].value.centAmount / 100
                    ).toFixed(2)}
                </span>
                {prices && prices[0].discounted?.value ? (
                  <span className="sale-price">
                    $
                    {product &&
                      product.masterVariant.prices &&
                      product.masterVariant.prices[0].discounted &&
                      (
                        product.masterVariant.prices[0].discounted.value
                          .centAmount / 100
                      ).toFixed(2)}
                  </span>
                ) : (
                  ''
                )}
              </p>
              <p className="products-card__desc">
                {product && product.description && product.description['en-US']}
              </p>
              <button
                className={
                  inCart
                    ? 'products-card__button in-cart'
                    : 'products-card__button'
                }
                type="button"
              >
                {inCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
          <ModalProductPage active={modalActive} setActive={setModalActive}>
            <img
              src={imgPath}
              className="products-card__img_big"
              alt="all wine"
            />
          </ModalProductPage>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
