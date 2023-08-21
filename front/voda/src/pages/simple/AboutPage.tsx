import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import '../../styles/simple/About.css'
import SimpleLogoSqr from '../../assets/images/logo_yellow_sqr.png'
import SimpleTitle from "../../components/SimpleTitle";
import SimpleFooter from "../../components/SimpleFooter";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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

const SimpleAbout = () => {
  return (
    <>
    <StyledLink to='/home' aria-label="서비스 소개 페이지입니다. 홈 화면으로 이동하시려면 이 버튼을 누르세요">
      <SimpleTitle tabIndex={0} imgSrc="SimpleLogo" />
    </StyledLink>
    <div className="ourService">
      <p
        tabIndex={1} 
        aria-label="세상을 소리로 보다 + Voice Over Diverse Assistance 라는 의미의 VODA는 시각장애인과 비장애인의 영상 통화를 돕기위한 표정 알림 서비스와 화장품(물건)의 색상을 음성으로 알려주는 색상 인식 서비스를 제공합니다.">
          세상을 소리로 보다 + Voice Over Diverse Assistance 라는 의미의 VODA는 시각장애인과 비장애인의 영상 통화를 돕기위한 표정 알림 서비스와 화장품의 색을 음성으로 알려주는 색상 인식 서비스를 제공합니다.
      </p>
        <p style={{ fontWeight:'bold', margin: '50px 0px', fontSize:'30px'}}
        tabIndex={2}
        aria-label="사이트 소개"
        >사이트 소개
      </p>
      <div style={{ margin: '30px 0px'}}>
      <p 
        style={{ margin: '0px 30px'}}
        tabIndex={3}
        aria-label="1 저시력자가 알아보기 쉬운 한국장애인개발원의 유니버셜 디자인 서체 KoddiUD온고딕 사용으로 가독성을 높였습니다."
        >1. 저시력자가 알아보기 쉬운 한국장애인개발원의 유니버셜 디자인 서체(koddiUD온고딕)사용으로 가독성을 높였습니다.
      </p>
      <p
        style={{ margin: '0px 30px'}}
        tabIndex={4}
        aria-label="2 색각 이상이나 저시력자가 웹사이트를 이용할 때 개발자가 고려해야 할 명도 대비율 권고 사항 WCAG (Web Content Accessibility) AA 레벨 4.5을 넘는 메인 컬러로 사용함으로써 시안성을 높였습니다.">
          2. 색각 이상이나 저시력자가 웹사이트를 이용할 때 개발자가 고려해야 할 명도 대비율 권고 사항 WCAG (Web Content Accessibility) AA 레벨 4.5을 넘는 메인 컬러 사용함으로써 시안성을 높였습니다.
      </p>
      <p
        style={{ margin: '0px 30px'}}
        tabIndex={5}
        aria-label="3. 스크린리더기의 사용을 고려한 사이트 개발과 저시력자의 이용을 용이하게 하는 고대비와 간단하고 확대된 UI로 구성된 심플 모드로 시각장애인의 접근성을 높였습니다.">
          3. 스크린리더기의 사용을 고려한 사이트 개발과 저시력자의 이용을 용이하게 하는 고대비와 간단하고 확대된 UI로 구성된 심플 모드로 시각장애인의 접근성을 높였습니다.
      </p>
      <p style={{ fontWeight:'bold', margin: '100px 0px 50px', fontSize:'30px'}}
        tabIndex={6}
        aria-label="메뉴 소개"
        >메뉴 소개
      </p>
      <p style={{ fontWeight:'bold', margin: '50px 0px 50px', fontSize:'25px'}}
        tabIndex={7}
        aria-label="영상 통화"
        >영상 통화
      </p>
      <p
        style={{ margin: '0px 30px'}}
        tabIndex={8}
        aria-label="의사소통 중에 발생하는 다양한 비언어적 요소 중 표정을 소리로 알려주는 서비스입니다. 시각장애인은 표정 듣기 버튼을 통해 상대방의 표정을 들을 수 있으며 비장애인은 표정보내기 버튼을 통해 시각장애인에게 자신의 표정을 알릴 수 있습니다. 표정 알림에 관한 설정은 환경설정 페이지에서 할 수 있으며 알림 목소리의 성별과 알림의 종류를 선택할 수 있습니다. 표정 알림은 상대방의 표정에 대해서만 알려주며 표정 및 조언 알림은 상대방의 표정과 함께 표정에 따른 대화 내용을 추천해줍니다."
      > 의사소통 중에 발생하는 다양한 비언어적 요소 중 표정을 소리로 알려주는 서비스입니다. 시각장애인은 표정 듣기 버튼을 통해 상대방의 표정을 들을 수 있으며 비장애인은 표정보내기 버튼을 통해 시각장애인에게 자신의 표정을 알릴 수 있습니다. 표정 알림에 관한 설정은 환경설정 페이지에서 할 수 있으며 알림 목소리의 성별과 알림의 종류를 선택할 수 있습니다. 표정 알림은 상대방의 표정에 대해서만 알려주며 표정 및 조언 알림은 상대방의 표정과 함께 표정에 따른 대화 내용을 추천해줍니다.
      </p>
      <p style={{ fontWeight:'bold', margin: '50px 0px 50px', fontSize:'25px'}}
        tabIndex={9}
        aria-label="색상 인식"
        >색상 인식
      </p>
      <p
        style={{ margin: '0px 30px'}}
        tabIndex={10}
        aria-label="화면에 색을 알고 싶은 화장품을 보여주면 화장품의 색을 음성으로 안내해주는 서비스입니다."
      > 화면에 색을 알고 싶은 화장품을 보여주면 화장품의 색을 음성으로 안내해주는 서비스입니다.
      </p>
      <p style={{ fontWeight:'bold', margin: '50px 0px 50px', fontSize:'25px'}}
        tabIndex={11}
        aria-label="고객의 소리함"
        >고객의 소리함
      </p>
      <p
        style={{ margin: '0px 30px'}}
        tabIndex={12}
        aria-label="사용자가 VODA 서비스를 이용하면서 불편한 점이나 개선이 필요하다고 생각하는 점이 있다면 고객의 소리함을 통해 의견을 남길 수 있습니다. VODA는 사용자의 피드백을 통해 더욱 발전하고 성장할 것입니다."
      > 사용자가 VODA 서비스를 이용하면서 불편한 점이나 개선이 필요하다고 생각하는 점이 있다면 고객의 소리함을 통해 의견을 남길 수 있습니다. VODA는 사용자의 피드백을 통해 더욱 발전하고 성장할 것입니다.
      </p>
      </div>
      <p
        style={{ fontWeight:'bolder', margin: '90px 30px 0px', fontSize:'55px' }}
        tabIndex={13}
        aria-label="보다로 표정을, 색상을, 그리고 세상을 소리로 보다."
      > VODA로 표정을, 색상을, 그리고 세상을 소리로 보다.
      </p>
    </div>
    <SimpleFooter content={FooterContent} />
  </>
  );
};

export default SimpleAbout;
