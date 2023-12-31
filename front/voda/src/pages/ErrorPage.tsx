import errorImage from '../assets/images/errorImage.png';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "../hooks/reduxHook";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;
const ContentWrapper = styled.div`
  text-align: center;
`;

const ErrorText = styled.div`
  font-size: 96px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubText = styled.div`
  font-size: 56px;
`;

const ErrorPage = () => {
	const navigate = useNavigate();
	const isLogin = useAppSelector((state) => state.user.isLogin);

  const redirectHomePage = () => {
    navigate(isLogin ? '/home' : '/');
  };

  return (
    <>
			<Container onClick={redirectHomePage}>
				<div style={{height: '200px', width: '200px'}}>
					<img src={errorImage} alt='에러가 발생했습니다. 클릭하여 홈페이지로 이동하세요'/>
				</div>
				<ContentWrapper>
					<ErrorText>Error</ErrorText>
					<SubText>Time to Go Home! Click!!</SubText>
				</ContentWrapper>
			</Container>
    </>
  )
}

export default ErrorPage;