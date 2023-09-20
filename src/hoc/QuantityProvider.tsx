import React, { useState, createContext, useMemo, ReactNode } from 'react';

import { ProductProjection } from '@commercetools/platform-sdk';

type QuantityProviderProps = {
  children: ReactNode;
};

export const QuantityContext = createContext<QuantityContextProps>({
  quantity: null,
  setCount: () => {},
  favorites: [],
  setNewFavotites: () => {},
  allProductsWine: [],
  setNewAllProductsWine: () => {},
});

export interface QuantityContextProps {
  quantity: number | null;
  setCount: (newQuantity: number | null) => void;
  favorites: ProductProjection[];
  setNewFavotites: (newFavotites: ProductProjection[]) => void;
  allProductsWine: ProductProjection[];
  setNewAllProductsWine: (newFavotites: ProductProjection[]) => void;
}

export const QuantityProvider: React.FC<QuantityProviderProps> = ({
  children,
}) => {
  const [quantity, setQuantity] = useState<null | number>(
    Number(localStorage.getItem('countProductsWin4ik'))
      ? Number(localStorage.getItem('countProductsWin4ik'))
      : null
  );
  const [favorites, setFavotites] = useState<ProductProjection[]>(
    localStorage.getItem('favoritesWin4ik')
      ? JSON.parse(localStorage.getItem('favoritesWin4ik') as string)
      : []
  );
  const [allProductsWine, setAllProductsWine] = useState<ProductProjection[]>(
    []
  );

  const setCount = (newQuantity: number | null): void => {
    setQuantity(newQuantity);
    localStorage.setItem('countProductsWin4ik', String(newQuantity));
  };

  const setNewFavotites = (newFavotites: ProductProjection[]): void => {
    setFavotites(newFavotites);
  };

  const setNewAllProductsWine = (
    newProductsWine: ProductProjection[]
  ): void => {
    setAllProductsWine(newProductsWine);
  };

  const value = useMemo(() => {
    return {
      quantity,
      setCount,
      favorites,
      setNewFavotites,
      allProductsWine,
      setNewAllProductsWine,
    };
  }, [quantity, allProductsWine]);

  return (
    <QuantityContext.Provider value={value}>
      {children}
    </QuantityContext.Provider>
  );
};
