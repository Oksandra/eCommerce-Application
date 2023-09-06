import React from 'react';
import './Search.scss';
import search from '../../assets/svg/search-icon.svg';
import del from '../../assets/svg/delete_icon.svg';

interface SearchProps {
  searchValue: string;
  setSearchValue: (arg: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchValue, setSearchValue }) => {
  return (
    <div className="search">
      <img src={search} className="search__icon" alt="search-icon" />
      <input
        value={searchValue}
        onChange={(event): void => setSearchValue(event.target.value)}
        className="search__input"
        placeholder="Search"
        type="text"
      />
      {searchValue && (
        <img
          aria-hidden="true"
          onClick={(): void => setSearchValue('')}
          src={del}
          className="search__delete"
          alt="delete-icon"
        />
      )}
    </div>
  );
};

export default Search;
