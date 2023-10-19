import React, { Dispatch, SetStateAction } from 'react';
import './Filtr.scss';
import Sort from '../Sort/Sort';
import { ArrayObjectSelectState } from '../../interfaces/interfaces';

interface FiltrProps {
  onChangeCategory: (arg: string) => void;
  idCategory: string;
  clearSearch: () => void;
  selectedOption: ArrayObjectSelectState;
  setSelectedOption: Dispatch<SetStateAction<ArrayObjectSelectState>>;
}

const Filtr: React.FC<FiltrProps> = ({
  onChangeCategory,
  idCategory,
  clearSearch,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <aside className="categories">
      <div className="categories__title">CATEGORIES</div>
      <button
        id="ce4b4eb5-225b-4ca2-8906-6cb9a056a72b"
        className={
          idCategory === 'ce4b4eb5-225b-4ca2-8906-6cb9a056a72b'
            ? 'categories__button active'
            : 'categories__button'
        }
        type="button"
        onClick={(): void => {
          onChangeCategory('ce4b4eb5-225b-4ca2-8906-6cb9a056a72b');
          clearSearch();
        }}
      >
        Sparkling wines
      </button>
      <button
        id="783c7a0b-1e1f-4260-bcf9-f220447d3ca9"
        className={
          idCategory === '783c7a0b-1e1f-4260-bcf9-f220447d3ca9'
            ? 'categories__button active'
            : 'categories__button'
        }
        type="button"
        onClick={(): void => {
          onChangeCategory('783c7a0b-1e1f-4260-bcf9-f220447d3ca9');
          clearSearch();
        }}
      >
        Red Wines
      </button>
      <button
        id="18557a81-7049-48c9-83a5-1face36a1af8"
        className={
          idCategory === '18557a81-7049-48c9-83a5-1face36a1af8'
            ? 'categories__button active'
            : 'categories__button'
        }
        type="button"
        onClick={(): void => {
          onChangeCategory('18557a81-7049-48c9-83a5-1face36a1af8');
          clearSearch();
        }}
      >
        White Wines
      </button>
      <button
        id="1a98660a-7154-4ea9-b0f0-571e82f216c1"
        className={
          idCategory === '1a98660a-7154-4ea9-b0f0-571e82f216c1'
            ? 'categories__button active'
            : 'categories__button'
        }
        type="button"
        onClick={(): void => {
          onChangeCategory('1a98660a-7154-4ea9-b0f0-571e82f216c1');
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
      <Sort
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </aside>
  );
};

export default Filtr;
