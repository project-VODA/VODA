import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import Title from '../../components/Title';
import Input from '../../components/InputText';
import SettingButton from '../../components/SettingButton';
import { sendTemporaryPassword } from '../../apis/email';


const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SimplePass = () => {
	const [email, setEmail] = useState('');

	const handleEmailSender = () => {
		sendTemporaryPassword(email)
			.then((res) => {
				alert("이메일로 임시 비밀번호가 발송되었습니다.")
				console.log(res)
				// 로그인 페이지로 리다이렉트
				RedirectLogin();
			})
			.catch((err) => {
				console.log(err);
			})
	}

	const naviagte = useNavigate();

  const RedirectLogin = () => {
    naviagte('/login');
  }

	return (
		<>
			<Title title='임시 비밀번호 발급'/>

			<Input 
				type="email"
				placeholder="이메일을 입력하세요" 
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<ButtonContainer>
				<SettingButton text="이메일 발송" onClick={handleEmailSender}/>
			</ButtonContainer>
		</>
);
}

export default SimplePass;