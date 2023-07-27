## Front End

- ver0.0.0) 최초 브랜치 생성

- 23.07.20 KMJ
  - CRA @typescript
  - redux 이용하여 page 구분(src/store/)

- 23.07.21 KMj
  - 폴더 구조 세팅; components, pages, styles
  - app.tsx; router 설정

- 23.07.22 GSH
  - src/assets/font/ 생성
  - styles.css 에서 전체 폰트 적용

- 23.07.21~22 KMJ
  - typescript 의 styled-components 적용
  - src/styles/global-styles & theme.ts 추가
  - 컴포넌트 구분(Title, Input, LoginButton, RegisterButton, ModeToggle)
  - 모드 변경(테마); src/hooks/ 생성 & 파일 - useMode.ts, ModeToggle.ts + global.ts, theme.ts
  - 이미지 폴더(src/assets/image/) 및 로고 추가
  - [v] 색상 변경 제대로 되는지 체크해야 됌

- 23.07.24 KMJ
  - Change page name(ex - Login -> LoginPage)
  - npm; install - 'axios'
  - video on/off; RTCVideo.tsx
  - Video.tsx 에 컴포넌트 불러오기

- 23.07.25 KMJ
  - redux & login
  - kakao oauth 기능 추가(back api 추가 처리 필요)
  - npm; install - 'react-hook-form'

- 23.07.26 KSH & Choi
  - merge login & signup page(function)

- 23.07.26 Choi
  - 회원가입 / 로그인 axios 연결
  - Redux로 Access Token 관리 필요

- 23.07.27 KJW
  - 로그아웃 axios 연결