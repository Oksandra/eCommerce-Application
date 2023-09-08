import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import './Pagination.scss';

const Pagination: React.FC<ReactPaginateProps> = () => {
  return (
    <ReactPaginate
      className="paginate"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e): void => console.log(e)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
