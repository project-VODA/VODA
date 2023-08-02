import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Title from '../../components/Title';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const SimpleAbout = () => {
  return (
    <>
    <StyledLink to='' aria-label="서비스 소개 페이지입니다.">
      <Title title="About" />
    </StyledLink>
      {/* Add other content for the home page */}
    </>
  );
};

export default SimpleAbout;
