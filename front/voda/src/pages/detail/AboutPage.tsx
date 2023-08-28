// import React from "react";
// import Hovering from "../../components/AboutHover";
// import Title from "../../components/Title";
// import logo_black from '../../assets/images/logo_black.png'
// import styled from "styled-components";
// import ColorTutorial from '../../assets/images/ColorTutorial.gif';
// import AddFriend from '../../assets/images/AddFriend.gif';
// import SendExpression from '../../assets/images/SendExpression-Sub.gif';
// import HearExpression from '../../assets/images/HearExpression-Sub.gif';


// import "../../styles/detail/DetailAbout.css"
// import "../../styles/detail/AboutHover.css"

// const StyledContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   height: 100vh;
// `;

// const ScrollButton = styled.button`
//   margin: 20px;
// `;

// const RelativeContainer = styled.div`
//   position: relative;
// `;

// const AboutHover:React.FC = () => {
  
//   return (
//     <>
//     <StyledContainer>
//       <RelativeContainer>
//         <div className="AllContainer">
//           <Title className="DetAboutTitle" title='"표정"을 "소리"로 보다.'/>
//           <Hovering className="AboutHovering"/> <br/>
//           <img className="AboutLogo" src={logo_black} alt="왜안보일까요?" style={{ width: "20vw", height: "auto" }}/>
//           <span className="DetAboutMean">
//             V  oice <br/>
//             O  ver <br/>
//             D  iverse <br/>
//             A  ssistance <br/></span>
//         </div>
//       </RelativeContainer>
//     </StyledContainer>
//     <div>
//       <p style={{ fontWeight:'bold', margin: '30px 0px 30px 30px', fontSize:'30px', }}
//         tabIndex={1}
//         aria-label="친구 추가 방법입니다. 심플 모드에서는 영상통화 페이지로 이동 후 친구 검색을 통해 추가 및 통화합니다."
//         >친구 추가
//       </p>
//       <hr />
//       <img 
//         tabIndex={2}
//         src={ AddFriend } 
//         alt="친구 추가 튜토리얼" 
//         style={{
//           maxWidth: "70%",
//           height: "auto",
//           marginTop: "50px",
//           display: 'block',  
//           margin: '0 auto',  
//         }}
//       />
//       <p style={{ fontWeight:'bold', margin: '60px 0px 30px 30px', fontSize:'30px', }}
//         tabIndex={3}
//         aria-label="표정 보내기 버튼 사용방법입니다. 버튼을 클릭하시면 상대방에게 내 표정을 보낼 수 있습니다."
//         >표정 보내기
//       </p>
//       <hr />
//       <img
//         tabIndex={4}
//         aria-label="표정 보내기 버튼 사용방법입니다. 버튼을 클릭하시면 상대방에게 내 표정을 보낼 수 있습니다."
//         src={ SendExpression } 
//         alt="표정 보내기 튜토리얼" 
//         style={{
//           maxWidth: "70%",
//           height: "auto",
//           marginTop: "50px",
//           display: 'block',  
//           margin: '0 auto',  
//         }}
//       />
//       <p style={{ fontWeight:'bold', margin: '70px 0px 30px 30px', fontSize:'30px', }}
//         tabIndex={5}
//         aria-label="표정 듣기 버튼 사용방법입니다. 버튼을 클릭하시면 상대방의 표정을 들을 수 있습니다. 설정에 따라 남성 / 여성 / 목소리와 조언을 추가할 수 있습니다."
//         >표정 듣기
//       </p>
//       <hr />
//       <img
//         tabIndex={6}
//         aria-label="표정 듣기 버튼 사용방법입니다. 버튼을 클릭하시면 상대방의 표정을 들을 수 있습니다. 설정에 따라 남성 / 여성 / 목소리와 조언을 추가할 수 있습니다."
//         src={ HearExpression } 
//         alt="표정 듣기 튜토리얼" 
//         style={{
//           maxWidth: "70%",
//           height: "auto",
//           marginTop: "60px",
//           display: 'block',  
//           margin: '0 auto',  
//         }}
//       />
//       <p style={{ fontWeight:'bold', margin: '60px 0px 30px 30px', fontSize:'30px', }}
//         tabIndex={7}
//         >색상 인식 사용 방법
//       </p>
//       <hr />
//       <img 
//         tabIndex={8}
//         src={ColorTutorial}
//         aria-label="색상 인식 사용 방법에 대해 말씀드리겠습니다. 우선 얼굴이 인식될 수 있도록 얼굴을 정면으로 본 후 잠시 기다려주세요. 그다음 색상을 알고 싶은 물건을 왼쪽 눈에 대고 버튼을 눌러주세요. 그럼 인식된 색상이 음성으로 안내됩니다."
//         alt="색상인식 튜토리얼" 
//         style={{
//           maxWidth: "70%",
//           height: "auto",
//           marginTop: "30px",
//           display: 'block',  
//           margin: '0 auto',  
//         }}
//       />
//     </div>
//     </>
//   );
// };

// export default AboutHover;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo_black from '../../assets/images/logo_black.png';
import Smile from '../../assets/images/Smile.jpg';
import styled from "styled-components";
import Footer from "../../components/Footer";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  // height: 100vh;
  margin-top: 7%;
`;

const Title1 = styled.p`
  text-align: center;
  font-size: 1em;
  font-weight: bold;
`;

const Title2 = styled.p`
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin: 2%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

/*섹션: 가로 배치*/
const Section = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BoldText = styled.span`
  font-size: 1.3em;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 6px;
`;

const Text = styled.span`
  font-size: 1em;
  padding-bottom: 5px
`;

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
  time: "평일 오전 9시 - 오후 6시",
  logoUrl: "../../assets/images/logo_black_sqr.png"
}

const AboutHover:React.FC = () => {    
  const [isHovered, setIsHovered] = useState(false);
  
  const imageStyle: React.CSSProperties = {
    width: '25vw',
    height: 'auto',
    transition: 'filter 0.3s ease-in-out',
    filter: isHovered ? 'blur(0)' : 'blur(15px)',
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <>
    <StyledContainer tabIndex={0} aria-label="Vocie-Over Diverse Assitance. 보다. 세상을 소리로 보다.">
      <Title1>Voice-Over + Diverse Assistance</Title1>
      <StyledLink to='/home' aria-label="서비스 소개 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요">
        <img src={logo_black} alt="VODA 로고" style={{ width: "20vw", height: "auto" }}/>
      </StyledLink>
      <Title2>세상을 "소리"로 "보다"</Title2>
    </StyledContainer>

      <Section>
      <ImageContainer tabIndex={1}>
        {isHovered ? (
          <>
            <BoldText>이제 잘 보이시죠?</BoldText>
            <Text>잠시나마 공감하셨나요?</Text><br/><br/>
          </>
        ) : (
          <>
            <BoldText>저시력자가 보는 모습입니다.</BoldText>
            <Text>사진이 궁금하시다면 마우스를 올려보세요.</Text><br/><br/>
          </>
        )
        }
        <img className="SmileImage" src={Smile} alt="웃는 사람의 사진" style={imageStyle}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} tabIndex={1}/>
      </ImageContainer>
      <TextContainer tabIndex={2} >
    <BoldText>VODA는 시각장애인을 위한 음성 알림을 제공하는 서비스입니다.</BoldText><br/><br/>
        <BoldText>메뉴 소개</BoldText><br/>
        <BoldText>1. 영상 통화</BoldText>
        <Text>의사소통 중에 발생하는 다양한 비언어적 요소 중 표정을 소리로 안내해주는 서비스입니다.</Text>
        <Text>회원정보의 시각장애인 여부에 따라</Text>
        <Text>시각장애인은 표정 듣기 버튼을 통해 상대방의 표정을 들을 수 있으며</Text>
        <Text>비장애인은 표정 보내기 버튼을 통해 상대방에게 자신의 표정을 알릴 수 있습니다.</Text><br/>
        <Text><span style={{backgroundColor: '#d2e9f3'}}>* 마이페이지에서 시각장애 여부를 변경할 수 있으며</span></Text>
        <Text aria-label="환경설정에서 알림 음성의 성별과 종류(표정 / 표정+조언)를 선택할 수 있습니다."><span style={{backgroundColor: '#d2e9f3'}}>환경설정에서 알림 음성의 성별과 종류(표정 / 표정+조언)를 선택할 수 있습니다.</span></Text><br/>
        <BoldText>2. 색상 인식</BoldText>
        <Text>화면에 색을 알고 싶은 화장품을 보여주면 화장품의 색을 음성으로 안내해주는 서비스입니다.</Text><br/>
        <BoldText>3. 심플 모드</BoldText>
        <Text>VODA는 시각장애인의 접근성을 높인 심플모드를 제공합니다.</Text>
        <Text>화면 우측 하단에 있는 모드 토글 버튼을 통해 모드를 변경할 수 있습니다.</Text>
        </TextContainer>
    </Section>
    <Footer content={FooterContent} />
    </>
  );
};

export default AboutHover;
