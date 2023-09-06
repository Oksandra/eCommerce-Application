import React from 'react';
import './Filtr.scss';

interface FiltrProps {
  onChangeCategory: (arg: string) => void;
  idCategory: string;
  clearSearch: () => void;
}

const Filtr: React.FC<FiltrProps> = ({
  onChangeCategory,
  idCategory,
  clearSearch,
}) => {
  return (
    <aside className="categories">
      <div className="categories__title">CATEGORIES</div>
      <button
        id="0f78b7da-5e69-4600-a8a0-2083bc4d173a"
        className={
          idCategory === '0f78b7da-5e69-4600-a8a0-2083bc4d173a'
            ? 'categories__button active'
            : 'categories__button'
        }
        type="button"
        onClick={(): void => {
          onChangeCategory('0f78b7da-5e69-4600-a8a0-2083bc4d173a');
          clearSearch();
        }}
      >
        Sparkling wines
      </button>
      <button
        id="96e7295c-116f-409d-8b66-faeb0238964d"
        className={
          idCategory === '96e7295c-116f-409d-8b66-faeb0238964d'
            ? 'categories__button active'
            : 'categories__button'
        }
        type="button"
        onClick={(): void => {
          onChangeCategory('96e7295c-116f-409d-8b66-faeb0238964d');
          clearSearch();
        }}
      >
        Red Wines
      </button>
      <button
        id="6b625304-5b48-44fb-b675-ab852dd4f831"
        className={
          idCategory === '6b625304-5b48-44fb-b675-ab852dd4f831'
            ? 'categories__button active'
            : 'categories__button'
        }
        type="button"
        onClick={(): void => {
          onChangeCategory('6b625304-5b48-44fb-b675-ab852dd4f831');
          clearSearch();
        }}
      >
        White Wines
      </button>
      <button
        id="57ce0b9c-ff63-4a17-a906-4f87f9069c9c"
        className={
          idCategory === '57ce0b9c-ff63-4a17-a906-4f87f9069c9c'
            ? 'categories__button active'
            : 'categories__button'
        }
        type="button"
        onClick={(): void => {
          onChangeCategory('57ce0b9c-ff63-4a17-a906-4f87f9069c9c');
          clearSearch();
        }}
      >
        Rose Wines
      </button>
      <button
        onClick={(): void => {
          onChangeCategory('');
          clearSearch();
        }}
        className="reset-button"
        type="button"
      >
        RESET ALL
      </button>
    </aside>
  );
};

export default Filtr;
