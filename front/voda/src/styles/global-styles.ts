// global-styles.ts

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// KMJ 스타일 가이드에 대한 설명 - typescript styled-
// global 설정 가능

interface ThemeInterface {
	theme: {
		body: string;
		toggleBackground: string;
		mainColor: string;
		navbar: string;
	};
}

export const GlobalStyle = createGlobalStyle<ThemeInterface>`
    ${reset}
    body {
        font-family: 'NanumSquare', sans-serif;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.5s ease-in-out;
    }
    button {
        cursor: pointer;
        outline: none;
        transition: all 0.5s ease-in-out;
    }
    img {
        width: 100%;
        height: 100%;
    }
`;

// * {
// 	box-sizing: border-box;
// }

// ol, ul, li {
//     list-style: none;
// }

// button {
//     background: none;
//     cursor: pointer;
//     border: none;
//     outline: none;
//     transition: all 0.5s ease-in-out;
// }