import { Link } from "d3-shape";
import React from "react";
import styled from "styled-components";
import sqrLogo from "../assets/images/logo_black_sqr.png"

interface FooterProps {
  content: {
    companyName: string;
    email: string;
    QnA: string;
    address: string;
    time: string;
    logoUrl: string;
  };
}

const FooterContainer = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 250px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 200px auto auto;
`;

const ContentWrapper = styled.div`
  max-width: 90%;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Logo = styled.img`
  width: 160px; /* 이미지 크기 조절 */
  margin-right: 250px; /* 이미지 오른쪽 마진 설정 */
  margin-top: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <FooterContainer>
      <ContentWrapper>
        <FooterContent>
          <Logo src={sqrLogo} alt="sqrlogo" />
          <TextContainer>
            <p style={{ fontSize: "35px" }}>{content.companyName}</p>
            <p style={{ marginTop: "20px" }}>Email : {content.email}</p>
            <p style={{ marginTop: "10px" }}>주소 : {content.address}</p>
            <p style={{ marginTop: "10px" }}>
              Q&A : <a href={content.QnA}>{content.QnA}</a>
            </p>
            <p style={{ marginTop: "10px" }}>상담 가능 시간 : {content.time}</p>
          </TextContainer>
        </FooterContent>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;