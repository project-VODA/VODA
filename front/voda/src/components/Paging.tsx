import React, { useState } from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";

import '../styles/detail/Paging.css';

interface PagingProps {
  page: number;
  count: number;
  setPage: (page: number) => void;
  style?: React.CSSProperties;
}

const PagingContainer = styled.div`
  cursor: pointer;
`;

const Paging: React.FC<PagingProps> = ({page, count, setPage, style}) => {
  return (
    <PagingContainer>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage}
      />
    </PagingContainer>
  );
};

export default Paging;