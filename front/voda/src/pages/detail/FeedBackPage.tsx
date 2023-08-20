import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import BoardList from '../../components/board/BoardList';
import { Link } from "react-router-dom";

import { MdAssignmentAdd } from 'react-icons/md'
import FroClientImg from "../../assets/images/ForClient.jpg"
import Footer from "../../components/Footer";

const StyledLink = styled(Link)<StyledLinkProps>`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

interface StyledLinkProps {
  to: string;
  text?: string;
  title: string;
  children: React.ReactNode;
}

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const FooterContent = {
  companyName: "VODA",
  email: "voda.a707@gmail.com",
  QnA: "vodavoda.site/feedback",
  address: "서울특별시 강남구 테헤란로 212",
  time: "평일 오전 9시부터 오후 6시까지 상담 가능합니다.",
  logoUrl: "../../assets/images/logo_black_sqr.png"
}


const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    flex-direction: column; /* 모바일 화면에서 세로 방향으로 배치 */
  }
`;

const SimpleFeedBack = () => {

    const navigate = useNavigate();

    const handleWriteArticle= () => {
        navigate('/write');
    }

    return (
        <>
            <ListContainer>
              <img src={ FroClientImg } alt="" />
              <div>
                <div style={{ fontSize: '1.4vw', display:'flex', justifyContent:'flex-end', marginTop: '40px', position:'relative', }}>
                  <MdAssignmentAdd onClick={handleWriteArticle} aria-label='새 글 작성하기' style={{ cursor:'pointer' }}/>
                  &nbsp;&nbsp; <StyledLink title='NewPost' to='/write'> 새 글 작성하기</StyledLink>
                  </div>
                <div style={{ padding: '67px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <BoardList />
                </div>
              </div>
            </ListContainer>
            <Footer content={FooterContent} />


        </>
    );
};

export default SimpleFeedBack;
