import React from 'react';
import './Search.scss';
import search from '../../assets/svg/search-icon.svg';

const Search: React.FC = () => {
  return (
    <div className="search">
      <img src={search} className="search__icon" alt="search-icon" />
      <input className="search__input" placeholder="Search" type="text" />
    </div>
  );
};

export default Search;
