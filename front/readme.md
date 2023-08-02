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
  - localUser와 remoteUser 화면 위치 전환
  - localUser와 remoteUser 화면 크기 비율 변경
  - src/styles/simple/video.css 추가
  - header height 감소
  - 추후 다른 커스텀 방식 연구(2인 초과 시에 어려움)

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

- 23.07.31 KSH
  - 메인 페이지 접속시 직렬화 오류 해결(middleware 지정),
  - 미적용된 Font 부분 수정

- 23.08.01 KSH
  - simpleSignup 페이지 및 하위 컴포넌트 aria-label 작업
  - slimpeLogin 페이지 및 하위 컴포넌트 aria-label 작업
  - simpleHompage 페이지 및 하위 컴포넌트 aria-label 작업
  - simpleMyPage 페이지 및 하위 컴포넌트 aria-label 작업
  - simpleFeedBackPage 페이지 및 하위 컴포넌트 aria-label 작업

- 23.08.01 Choi
  - 친구 페이지 임시 저장
  - 통화목록 등 추가 api 필요

- 23.08.02 NG
  - redux 사용해서 jwt token 및 user 정보 저장
  - jwt token api 적용
  - user 기능에 redux 활용

- 23.08.01 KSH
  - 비디오 페이지 UI 커스텀 초안
  - Navbar 항목 수정
  - Navbar UI 수정
  - 비디오 위치 변경 및 사이즈 조절
  - 통화 종료시 Hompage로 이동하도록 수정
  - 표정 보내기 버튼 추가 (함수는 아직 switchCamera로 임시)
  - openvidu logo image 변경
  - openvidu background color 변경

- 23.08.02 Choi
  - 친구 페이지 구현
  - 친구 목록/추가/삭제 api 연결
  - 친구 목록 컴포넌트 구현
  - 유저 검색 모달 창 구현
    - 검색 기준 이미 친구부터 출력되게 변경
  - 유저 검색 api 연결
  - 최근 통화 목록 컴포넌트 구현

- 23.08.02 KSH
  - 랜딩 페이지 추가
  - LandingBtn 컴포넌트 추가
  - 각 버튼 누를 시 hompage로 navigate 후 reload해 Theme 적용
  - 기존 메인 페이지 url이 ('/') 에서 ('/home') 으로 변경
  - 대신 랜딩페이지가 ('/') url을 차지
  - 통화 화면 표정 보내기 버튼 UI 수정
  - 통화 종료시 ('/') 에서 ('/home')으로 수정
  - VODA로고 클릭시 ('/') 에서 ('/home')으로 수정
  - 로그인 시 ('/') 에서 ('/home')으로 수정(심플 디테일 both)
  - 심플모드 전 페이지 타이틀에 Link 속성 추가(to='') 이동없이 스크린 리더기에 읽히기 위한 작업
  - 부여한 Link 속성에 aria-label 추가 및 링크로 안보이게 하기위한 위장 작업

- 23.08.02 YSH
  - WaitingRoomPage, VideoPage영상통화 대기방에서 친구에게 전화거는 action 추가
  - VideoRoomComponent 영상통화 종료시 back에 종료 api요청 action 추가 

