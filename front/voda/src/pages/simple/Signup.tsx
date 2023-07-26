// components/Signup.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../apis/axios'
import { AxiosError, AxiosResponse } from 'axios';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [handicap, setHandicap] = useState(false); // 기본값을 0으로 설정
  const [passwordCheck, setPasswordCheck] = useState('');
  const [pwFlag, setPwFlag] = useState(false);

  const userData = {
    userEmail: email,
    userName: name,
    userPass: password,
    userHandicap: handicap? 0:1,
  };

  const handleSignup = async () => {
    let err = false;
    let msg = '';

    if(!email) {
      msg = '이메일을 입력해주세요'; 
      err = true;
    }else if(!err && password.length === 0){
      msg = '비밀번호를 입력해주세요';
      err = true;
    }else if(!err && passwordCheck.length === 0){
      msg = '비밀번호 확인을 입력해주세요';
      err = true;
    }else if(!err && !name) {
      msg = '이름을 입력해주세요';
      err = true;
    }

    if (!pwFlag) {
      msg = '비밀번호가 일치하지 않습니다.';
      err = true;
    }
    if (err) {
      alert(msg);
    } else {
      console.log("axios호출");
      await axios.post('/users/regist', userData)
      .then((response: AxiosResponse) => {
        if(response.data.userEmail === userData.userEmail) {
          alert("가입 완료");
          // 로그인 화면으로 리다이렉트
          RedirectLogin();
        }else{
          console.log("가입 실패");
        }
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
    }
  };

  const handlePasswordCheckChange = (e: any) => {
    setPasswordCheck(e.target.value);
    setPwFlag(e.target.value === password);
  };

  const naviagte = useNavigate();

  const RedirectLogin = () => {
    naviagte('/login');
  }

  return (
    <div>
      <h2>회원 가입</h2>
      <div>
        <label>이메일:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>이름:</label>
        <input
          type='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>비밀번호:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>비밀번호 확인:</label>
        <input
          type='password'
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
        />
      </div>
      {pwFlag === false && passwordCheck.length !== 0 && <div>비밀번호가 일치하지 않습니다.</div>}
      <div>
        <label>시각 장애 여부:</label>
        <input
          type='checkbox'
          checked={handicap} // 1이면 체크, 0이면 체크 해제
          onChange={(e) => setHandicap(e.target.checked)}// 체크하면 1, 해제하면 0
        />
      </div>
      <button onClick={handleSignup}>가입하기</button>
    </div>
  );
};

export default Signup;
