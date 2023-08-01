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

- 23.07.26 KSH
  - openVidu library에 대한 이슈 때문에 React 18.2.0 -> React 16.13.0 버전 수정
  - React 버전 다운그레이드에 대한 종속성 해결 / package.json 변경
  - React dependencies 수정
  - App.tsx 코드 수정

- 23.07.26 Choi
  - 회원가입 / 로그인 axios 연결
  - Redux로 Access Token 관리 필요

- 23.07.27 gun & YSH
  - openvidu 추가

- 23.07.27 KSH
  - navigate 버튼으로 통일
  - 저시력자 모드에 맞춰 글자 크기 확대

- 23.07.27 YSH & NG
  - 메인페이지에 고객의 소리함 버튼 추가
  - 고객의 소리함 (게시판 형식) 목록보기, 글 작성 페이지 추가  

- 23.07.27 Choi
  - 회원가입 성공 로직 변경
  - 로그인 시 세션 스토리지에 유저 이메일 / 유저 이름 / AccessToken / RefreshToken 저장
  - 마이페이지 회원정보 조회 / 수정 / 비밀번호 변경 페이지 구현
  
- 23.07.27 KJW
  - 로그아웃 axios 연결
  - 엔터키로 로그인할 수 있도록 SubmitInputText 컴포넌트 생성
  - 로그인 axios 에러 처리 구현
  - 게시글 목록 컴포넌트 & axios연결

- 23.08.01 Choi
  - 친구 페이지 임시 저장
  - 통화목록 등 추가 api 필요