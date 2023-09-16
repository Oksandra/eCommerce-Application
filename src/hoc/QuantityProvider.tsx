import React, { useState, createContext, useMemo, ReactNode } from 'react';

type QuantityProviderProps = {
  children: ReactNode;
};

export const QuantityContext = createContext<QuantityContextProps>({
  quantity: undefined,
  setCount: () => {},
});

export interface QuantityContextProps {
  quantity: number | undefined;
  setCount: (newQuantity: number | undefined) => void;
}

export const QuantityProvider: React.FC<QuantityProviderProps> = ({
  children,
}) => {
  const [quantity, setQuantity] = useState<undefined | number>();

  const setCount = (newQuantity: number | undefined): void => {
    setQuantity(newQuantity);
  };

  const value = useMemo(() => {
    return { quantity, setCount };
  }, [quantity]);

  return (
    <QuantityContext.Provider value={value}>
      {children}
    </QuantityContext.Provider>
  );
};
