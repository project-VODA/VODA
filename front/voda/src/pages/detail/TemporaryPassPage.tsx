import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import SimpleTitle from '../../components/SimpleTitle';
import Input from '../../components/InputText';
import SettingButton from '../../components/SettingButton';
import { sendTemporaryPassword } from '../../apis/email';
import { Link } from "react-router-dom";
import useErrorHandlers from '../../hooks/useError';


const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;


const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SimplePass = () => {
	const [email, setEmail] = useState('');
	const errorHandlers = useErrorHandlers();

	const handleEmailSender = () => {
		sendTemporaryPassword(email)
			.then((res) => {
				alert("이메일로 임시 비밀번호가 발송되었습니다.")
				console.log(res)
				// 로그인 페이지로 리다이렉트
				RedirectLogin();
			})
			.catch((err) => {
				errorHandlers(err.response.status, handleEmailSender);
			})
	}

	const naviagte = useNavigate();

  const RedirectLogin = () => {
    naviagte('/');
  }

	return (
		<>
			<StyledLink to='/home' aria-label='임시 비밀번호 발급 페이지입니다.'>
        <SimpleTitle imgSrc='SimpleLogo' aria-label='임시 비밀번호 발급 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요' />
      </StyledLink>
      
			<Input 
				type="email"
				placeholder="이메일을 입력하세요" 
				value={email}
				onChange={(e) => setEmail(e.target.value)}
        aria-label='임시 비밀번호 발급을 위한 이메일을 입력해주세요.'
			/>
			<ButtonContainer>
				<SettingButton text="이메일 발송" onClick={handleEmailSender} aria-label='이메일 발송 버튼입니다.'/>
			</ButtonContainer>
		</>
);
}

export default SimplePass;