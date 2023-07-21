import React from "react";

const SimpleLogin = () => {
  return (
    <div>
      <h1>심플모드 - 로그인 페이지</h1>
      <br />
      <br />
      이메일
      <input
        type="text"
        placeholder="이메일을 입력하세요"
      />
      <br />
      비밀번호
      <input placeholder="비밀번호를 입력하세요" />
      <button type="submit">Login</button>
      <p>
        로그인이 안 되면 마이페이지에서 로그인 페이지로 바로 리다이렉트 걸어둠
      </p>
    </div>
  );
};

export default SimpleLogin;


