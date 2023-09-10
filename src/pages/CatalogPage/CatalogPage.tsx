import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
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

const limitProductsPerPage = 6;

const CatalogPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<ProductProjection[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [idCategory, setIdCategory] = React.useState<string>('');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalProducts, setTotalProducts] = React.useState<number>(1);
  const [pageActive, setPageActive] = React.useState<number | undefined>();
  const [selectedOption, setSelectedOption] = useState<ArrayObjectSelectState>({
    selectedOption: null,
  });
  React.useEffect(() => {
    if (!idCategory && !searchValue) {
      getAllProducts(currentPage)
        .then((data) => {
          setAllProducts(data.body.results);
          setTotalProducts(data.body.total as number);
          setIsloading(false);
        })
        .catch(() => setIsloading(true));
    }
  }, [idCategory, selectedOption.selectedOption, currentPage, searchValue]);

  React.useEffect(() => {
    if (searchValue) {
      setCurrentPage(0);
      setPageActive(0);
      searchProductsByKeyword(searchValue, currentPage)
        .then((data) => {
          setAllProducts(data.body.results);
          setTotalProducts((data.body.total as number) || 1);
        })
        .catch(() => setIsloading(true));
    }
  }, [searchValue, currentPage]);

  React.useEffect(() => {
    if (idCategory) {
      setCurrentPage(0);
      setPageActive(0);
      getProductsByCategory(idCategory, currentPage)
        .then((data) => {
          setAllProducts(data.body.results);
          setTotalProducts((data.body.total as number) || 1);
        })
        .catch((e) => console.log(e));
    }
  }, [idCategory, currentPage]);

  React.useEffect(() => {
    if (selectedOption.selectedOption?.value) {
      sortProducts(selectedOption.selectedOption.value, currentPage)
        .then((data) => {
          setAllProducts(data.body.results);
          setTotalProducts((data.body.total as number) || 1);
        })
        .catch((e) => console.log(e));
    }
  }, [selectedOption.selectedOption, currentPage]);

  const handlePageChange = ({ selected }: { selected: number }): void => {
    setCurrentPage(selected * 6);
  };

  return (
    <>
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
            className={
              isLoading ? 'catalog__wrapper empty' : 'catalog__wrapper'
            }
          >
            {isLoading ? (
              <Loader />
            ) : (
              allProducts.map((product) => (
                <ProductCard
                  idProduct={product.id}
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
      {!isLoading && (
        <ReactPaginate
          onPageChange={handlePageChange}
          nextLabel=">"
          previousLabel="<"
          pageCount={
            totalProducts && Math.ceil(totalProducts / limitProductsPerPage)
          }
          containerClassName="pagination"
          forcePage={pageActive}
        />
      )}
    </>
  );
};

export default CatalogPage;
