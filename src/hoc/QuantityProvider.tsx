import React, { useState, createContext, useMemo, ReactNode } from 'react';

import { ProductProjection } from '@commercetools/platform-sdk';

type QuantityProviderProps = {
  children: ReactNode;
};

export const QuantityContext = createContext<QuantityContextProps>({
  quantity: undefined,
  setCount: () => {},
  favorites: [],
  setNewFavotites: () => {},
  allProductsWine: [],
  setNewAllProductsWine: () => {},
});

export interface QuantityContextProps {
  quantity: number | undefined;
  setCount: (newQuantity: number | undefined) => void;
  favorites: ProductProjection[];
  setNewFavotites: (newFavotites: ProductProjection[]) => void;
  allProductsWine: ProductProjection[];
  setNewAllProductsWine: (newFavotites: ProductProjection[]) => void;
}

export const QuantityProvider: React.FC<QuantityProviderProps> = ({
  children,
}) => {
  const [quantity, setQuantity] = useState<undefined | number>();
  const [favorites, setFavotites] = useState<ProductProjection[]>([]);
  const [allProductsWine, setAllProductsWine] = useState<ProductProjection[]>(
    []
  );

  const setCount = (newQuantity: number | undefined): void => {
    setQuantity(newQuantity);
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
  }, [quantity]);

  return (
    <QuantityContext.Provider value={value}>
      {children}
    </QuantityContext.Provider>
  );
};
