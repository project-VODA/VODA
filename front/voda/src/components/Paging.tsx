import React, { useState } from "react";
import Pagination from "react-js-pagination";

import '../styles/detail/Paging.css';

//const Paging = ({page, count, setPage}) => {
const Paging = () => {
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={totalElements}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;