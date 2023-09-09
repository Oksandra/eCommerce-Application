import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

const Pagination: React.FC<ReactPaginateProps> = ({
  nextLabel,
  previousLabel,
  pageCount,
}) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={nextLabel}
      previousLabel={previousLabel}
      pageRangeDisplayed={6}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
