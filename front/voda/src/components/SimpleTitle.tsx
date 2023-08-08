// components/Title.tsx

import React, { useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../App';
import SimpleLogo from '../assets/images/logo_yellow.png'
import { useNavigate } from 'react-router-dom';

interface ColorProps {
  color: string;
  'aria-live'?: string;
  'aria-label'?: string;
}

const TitleContainer = styled('header')<ColorProps>`
  width: 100%;
  height: 60px;
  font-size: 2em;
  color: ${({ color }) => color};
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  padding: 40px 0;
`;

const Image = styled.img`
  max-width: 300px;
  height: auto;
  display: block;
  margin: 0 auto;
`

interface TitleProps {
  title?: string;
  className?: string;
  'aria-live'?: string;
  'aria-label'?: string;
  imgSrc: string;
  onClick?: string;
  tabIndex?: number;
}


export default function SimpleTitle({ 'aria-live':ariaLive, 'aria-label':ariaLabel, className, imgSrc, onClick }: TitleProps) {
  const navigate = useNavigate();
  
    const handleImageClick = () => {
      navigate('/home')
    }
  const { theme } = useContext(ThemeContext);

  return (<TitleContainer  
            className={className} 
            aria-live={ariaLive}
            aria-label={ariaLabel}
            color={theme.text} 
            onClick={handleImageClick}>
            <Image src={SimpleLogo} alt="VODA" onClick={() => handleImageClick() }/>
          </TitleContainer>);
}