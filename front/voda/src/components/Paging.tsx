import React, { useState } from "react";
import Pagination from "react-js-pagination";

import '../styles/detail/Paging.css';

interface PagingProps {
  page: number;
  count: number;
  setPage: (page: number) => void;
}

const Paging: React.FC<PagingProps> = ({page, count, setPage}) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  );
};

export default Paging;