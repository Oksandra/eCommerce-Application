import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

const Pagination: React.FC<ReactPaginateProps> = () => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      previousLabel="<"
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
