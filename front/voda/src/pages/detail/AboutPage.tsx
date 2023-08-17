import React from "react";
import Hovering from "../../components/AboutHover";
import Title from "../../components/Title";
import logo_black from '../../assets/images/logo_black.png'
import styled from "styled-components";
import ColorTutorial from '../../assets/images/ColorTutorial.gif';
import AddFriend from '../../assets/images/AddFriend.gif';
import SendExpression from '../../assets/images/SendExpression-Sub.gif';
import HearExpression from '../../assets/images/HearExpression-Sub.gif';


import "../../styles/detail/DetailAbout.css"
import "../../styles/detail/AboutHover.css"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const ScrollButton = styled.button`
  margin: 20px;
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const AboutHover:React.FC = () => {
  
  return (
    <>
    <StyledContainer>
      <RelativeContainer>
        <div className="AllContainer">
          <Title className="DetAboutTitle" title='"표정"을 "소리"로 보다.'/>
          <Hovering className="AboutHovering"/> <br/>
          <img className="AboutLogo" src={logo_black} alt="왜안보일까요?" style={{ width: "20vw", height: "auto" }}/>
          <span className="DetAboutMean">
            V  oice <br/>
            O  ver <br/>
            D  iverse <br/>
            A  ssistance <br/></span>
        </div>
      </RelativeContainer>
    </StyledContainer>
    <div>
      <p style={{ fontWeight:'bold', margin: '30px 0px 30px 30px', fontSize:'30px', }}
        tabIndex={1}
        aria-label="친구 추가 방법입니다. 심플 모드에서는 영상통화 페이지로 이동 후 친구 검색을 통해 추가 및 통화합니다."
        >친구 추가
      </p>
      <hr />
      <img 
        tabIndex={2}
        src={ AddFriend } 
        alt="친구 추가 튜토리얼" 
        style={{
          maxWidth: "70%",
          height: "auto",
          marginTop: "50px",
          display: 'block',  
          margin: '0 auto',  
        }}
      />
      <p style={{ fontWeight:'bold', margin: '60px 0px 30px 30px', fontSize:'30px', }}
        tabIndex={3}
        aria-label="표정 보내기 버튼 사용방법입니다. 버튼을 클릭하시면 상대방에게 내 표정을 보낼 수 있습니다."
        >표정 보내기
      </p>
      <hr />
      <img
        tabIndex={4}
        aria-label="표정 보내기 버튼 사용방법입니다. 버튼을 클릭하시면 상대방에게 내 표정을 보낼 수 있습니다."
        src={ SendExpression } 
        alt="표정 보내기 튜토리얼" 
        style={{
          maxWidth: "70%",
          height: "auto",
          marginTop: "50px",
          display: 'block',  
          margin: '0 auto',  
        }}
      />
      <p style={{ fontWeight:'bold', margin: '70px 0px 30px 30px', fontSize:'30px', }}
        tabIndex={5}
        aria-label="표정 듣기 버튼 사용방법입니다. 버튼을 클릭하시면 상대방의 표정을 들을 수 있습니다. 설정에 따라 남성 / 여성 / 목소리와 조언을 추가할 수 있습니다."
        >표정 듣기
      </p>
      <hr />
      <img
        tabIndex={6}
        aria-label="표정 듣기 버튼 사용방법입니다. 버튼을 클릭하시면 상대방의 표정을 들을 수 있습니다. 설정에 따라 남성 / 여성 / 목소리와 조언을 추가할 수 있습니다."
        src={ HearExpression } 
        alt="표정 듣기 튜토리얼" 
        style={{
          maxWidth: "70%",
          height: "auto",
          marginTop: "60px",
          display: 'block',  
          margin: '0 auto',  
        }}
      />
      <p style={{ fontWeight:'bold', margin: '60px 0px 30px 30px', fontSize:'30px', }}
        tabIndex={7}
        >색상 인식 사용 방법
      </p>
      <hr />
      <img 
        tabIndex={8}
        src={ColorTutorial}
        aria-label="색상 인식 사용 방법에 대해 말씀드리겠습니다. 우선 얼굴이 인식될 수 있도록 얼굴을 정면으로 본 후 잠시 기다려주세요. 그다음 색상을 알고 싶은 물건을 왼쪽 눈에 대고 버튼을 눌러주세요. 그럼 인식된 색상이 음성으로 안내됩니다."
        alt="색상인식 튜토리얼" 
        style={{
          maxWidth: "70%",
          height: "auto",
          marginTop: "30px",
          display: 'block',  
          margin: '0 auto',  
        }}
      />
    </div>
    </>
  );
};

export default AboutHover;
