import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginGoogle, loginKakao, } from "../../apis/user";

interface LoginRedirectPageProps {
  isGoogle?: boolean;
}

function LoginRedirectPage({ isGoogle }: LoginRedirectPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  let code = searchParams?.get("code");
  const navigate = useNavigate();
  const updateUserStatus = useCallback(
    (response: any) => {
      const accessToken = response.data.accessToken;
    }, []);

  useEffect(() => {
    console.log('here')
    console.log('code: ', code);
    // redirectKakao();
    // 카카오 로그인
    if (code && !isGoogle) {
      loginKakao(code)
        .then((res) => {
          console.log('kakao');
          updateUserStatus(res);
        })
        .catch((err) => console.log(err));
    }
    // 구글 로그인
    if (code && isGoogle) {
      loginGoogle(code)
        .then((res) => {
          console.log('google');
          updateUserStatus(res);
        })
        .catch((err) => console.log(err));
    }
  }, [isGoogle, code, updateUserStatus, navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <p>{isGoogle ? "구글" : "카카오"} 로그인 중입니다...</p>
    </div>
  );
}

export default LoginRedirectPage;
