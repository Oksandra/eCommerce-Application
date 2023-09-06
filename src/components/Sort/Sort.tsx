import React, { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import './Sort.scss';
import { ArrayObjectSelectState, Option } from '../../interfaces/interfaces';

interface SortProps {
  selectedOption: ArrayObjectSelectState;
  setSelectedOption: Dispatch<SetStateAction<ArrayObjectSelectState>>;
}

const options = [
  {
    value: 'price asc',
    label: 'Price - from cheap to expensive',
  },
  {
    value: 'price desc',
    label: 'Price - from expensive to cheap',
  },
  {
    value: 'name.en-us asc',
    label: 'Name - A - Z',
  },
  {
    value: 'name.en-us desc',
    label: 'Name - Z - A',
  },
];

const Sort: React.FC<SortProps> = ({
  selectedOption,
  setSelectedOption,
}): JSX.Element => {
  return (
    <div className="sort-wrapper">
      <div className="sort-wrapper__text">SORT BY:</div>
      <Select
        placeholder="..."
        className="sort-wrapper__select"
        options={options}
        value={selectedOption.selectedOption}
        onChange={(option: Option | null): void => {
          setSelectedOption({ selectedOption: option });
        }}
      />
    </div>
  );
};

export default Sort;
