import React from "react";
import { Navigate } from "react-router-dom";

const SimpleMyPage = () => {
  // 로그인 안됐을 시 로그인 창으로 리다이렉트 /////
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace={true}
      />
    );
  }
  /////////////////////////////////////////////////////
  return <div>마이 페이지</div>;
};

export default SimpleMyPage;
