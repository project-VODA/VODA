import react from 'react';
import styled from 'styled-components';


const Footer = () => {
  return (
    <FooterStyle>
    This is footer
    </FooterStyle>
  )
}

const FooterStyle = styled(Footer)`
  background-color: #f8f8f8;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Footer