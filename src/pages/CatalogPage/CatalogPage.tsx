import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CatalogPage.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import getAllProducts from '../../api/getAllProducts';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import Search from '../../components/Search/Search';
import searchProductsByKeyword from '../../api/searchProductsByKeyword';
import getProductsByCategory from '../../api/getProductsByCategory';
import Filtr from '../../components/Filtr/Filtr';
import { ArrayObjectSelectState } from '../../interfaces/interfaces';
import { sortProducts } from '../../api/sortProducts';

const CatalogPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<ProductProjection[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [idCategory, setIdCategory] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = useState<ArrayObjectSelectState>({
    selectedOption: null,
  });

  React.useEffect(() => {
    if (!idCategory) {
      getAllProducts(0)
        .then((data) => {
          setAllProducts(data.body.results);
          setIsloading(false);
        })
        .catch(() => setIsloading(true));
    }
  }, [idCategory, selectedOption.selectedOption]);

  React.useEffect(() => {
    searchProductsByKeyword(searchValue)
      .then((data) => {
        setAllProducts(data.body.results);
      })
      .catch(() => setIsloading(true));
  }, [searchValue]);

  React.useEffect(() => {
    if (idCategory) {
      getProductsByCategory(idCategory)
        .then((data) => {
          setAllProducts(data.body.results);
        })
        .catch((e) => console.log(e));
    }
  }, [idCategory]);

  React.useEffect(() => {
    if (selectedOption.selectedOption?.value) {
      sortProducts(selectedOption.selectedOption.value)
        .then((data) => {
          setAllProducts(data.body.results);
        })
        .catch((e) => console.log(e));
    }
  }, [selectedOption.selectedOption]);

  return (
    <div className="catalog-page">
      {!isLoading && (
        <Filtr
          idCategory={idCategory}
          onChangeCategory={(id: string): void => setIdCategory(id)}
          clearSearch={(): void => {
            setSearchValue('');
            setSelectedOption({
              selectedOption: null,
            });
          }}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      )}
      <div className="catalog">
        {!isLoading && (
          <div className="search-wrapper">
            <Search
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearch={(): void => {
                setIdCategory('');
                setSelectedOption({
                  selectedOption: null,
                });
              }}
            />
          </div>
        )}
        <div
          className={isLoading ? 'catalog__wrapper empty' : 'catalog__wrapper'}
        >
          {isLoading ? (
            <Loader />
          ) : (
            allProducts.map((product) => (
              <ProductCard
                title={product.metaTitle ? product.metaTitle['en-US'] : ''}
                image={
                  product.masterVariant.images
                    ? product.masterVariant.images[0].url
                    : ''
                }
                desc={
                  product.metaDescription
                    ? product.metaDescription['en-US']
                    : ''
                }
                price={
                  product.masterVariant.prices
                    ? (
                        product.masterVariant.prices[0].value.centAmount / 100
                      ).toFixed(2)
                    : ''
                }
                key={product.id}
                onClick={(): void => navigate(`/catalog/${product.id}`)}
                onSale={
                  product.masterVariant.prices &&
                  product.masterVariant.prices[0].discounted?.value
                    ? (
                        product.masterVariant.prices[0].discounted.value
                          .centAmount / 100
                      ).toFixed(2)
                    : ''
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
