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

- 23.08.01 KMJ
  - openVidu에 face-api 적용

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
  - 아주 조그마한 Signup / Login UI 변경 (위치 및 가로세로 크기 / 폰트)

- 23.08.02 YSH
  - WaitingRoomPage, VideoPage영상통화 대기방에서 친구에게 전화거는 action 추가
  - VideoRoomComponent 영상통화 종료시 back에 종료 api요청 action 추가 

- 23.08.02 KJW
  - 표정 보내기 버튼 누르면 시그널로 임시 데이터 전송 기능 구현
  - 표정 듣기 버튼 누르면 시그널로 데이터 요청해서 임시 데이터 받는 기능 구현

- 23.08.03 KSH
  - DetailArticle 페이지 aria-label에서 타이틀 읽게 수정
  - 작성 일시와 내용은 읽게 수정, but리더기가 인식 안하고 건너뛰는 문제
  - 디테일 전화걸기 페이지 레이아웃 변경
  - react-icons 도입으로 npm install 필요
  - FriendList.tsx 컴포넌트 변경
  - SimpleWaitingPage 모달 내용물 변경
  - 디테일 waitingPage 초안 완성

- 23.08.03 Choi
  - 기존 심플모드 디테일 모드로 이관
  - 심플모드 로직 변경

- 23.08.04 KSH
  - SIMPLE 친구추가 모달 UI 수정
  - 배경색 변경
  - Simple About Page 레이아웃 및 UI 완료
  - Simple About Page aria-label 완료

- 23.08.04 Choi
  - 환경 설정 페이지 추가
  - 환경 설정 변경 버튼 / 기능 구현
  - 정보 수정, 환경 설정 수정 시 로그아웃 되게 수정

- 23.08.06 KSH
  - Simple 서비스 소개 크기 수정
  - Detail About 호버링까지 완 ( 중앙 배치가 하고싶음...)
  - 사운드도 넣으려고 했으나, 사용자 경험 이슈로 보류(파일은 살려둠)

- 23.08.07 KSH
  - Detail About 페이지 초안
  - Figma 따라서 구성 / 추가로 적을 문구 필요, 너무 허전해보이는 느낌

-23.08.07 KJW
  - 유저 세팅에 따라 알림 목소리 변경
  - 남성 목소리 표정 알림음 파일 추가
  - 모드 토글 버튼 수정

-23.08.08 KJW
  - handDetection 관련 코드 제거

- 23.08.07 Choi
  - 캐러셀 컴포넌트 추가
  - 디테일 홈페이지 내용 작성(캐러셀)
  - 심플 모드 네비게이션 제거
  - 네비게이션 메뉴, 유저 아이콘 업데이트

- 23.08.08 Choi  
  - react quill, dompurify 라이브러리 적용
  - 고객의 소리함 글쓰기, 상세보기 HTML 태그 적용

- 23.08.08 KSH
  - 표정 듣기 / 표정 보내기 버튼을 userHandicap api 연결
  - 표정 듣기는 작동 안됨 / 표정 너무 자주 보낼 시 RuntimeError: memory access out of bounds 에러 발견
  - 환경 설정(심플) 페이지 우선 divideHorizon
  - 심플
    - 홈페이지, 영상통화 대기 페이지, 영상통화 페이지, 환경설정 페이지 tab index 설정
  - 환경설정 페이지 UI개선

- 23.08.08 YSH
  - 통화 알림시 4초 지연 후 알림 모달창 띄움

- 23.08.09 KSH
  - 랜딩페이지를 Simple로그인 페이지와 동일하게 변경
  - 로그인 안되어있을 시 디테일 모드에서 햄버거 및 네비게이션 바 랜딩 X
  - 비디오 페이지 탭 인덱스 수정
  - detail mypage 생성
  - 파비콘 및 프로젝트 이름 변경
  - header margin에 의한 SimpleAbout Page css 수정

- 23.08.09 Choi
  - 서버이벤트 모달 영역 밖 클릭 시 반응 없게 수정
  - 서버이벤트 모달 컨텐츠 정렬 스타일 수정 (<br> -> CSS)
  - 전체 페이지 margin-top 63픽셀 적용 / homepage제외

- 23.08.10 Choi
  - 스크린모드 유저세팅 반영되게 수정
  - 네비게이션 로그아웃 수정
  - 서버이벤트 모달 창 z-index 수정 -> 디테일 모드 네비게이션에 가려지지 않음
  - 서버이벤트 모달 창 색상 스크린 모드에 따라 변경

- 23.08.10 KSH
  - 심플 모드 고객의 소리함 변경
  - 디테일 모드 react-quill 색상 변경(흰색 안보임)
  - 디테일 랜딩페이지 로고 색 교체
  - 유저 검색 모달 창 크기 수정, 버튼 수정 (닫기 버튼 테두리 없애기)
  - simple color 및 simple about 페이지 Navigation 패딩수정

- 23.08.11 KSH
  - color 페이지 url 수정
  - Detail Feedback UI 수정(진행중) / Simple과 분리 
  - 네비게이션 호버링 영역 링크 추가

- 23.08.11 Choi
  - 게시글 상세보기에 댓글 출력부 추가
  - 댓글 CRUD 컴포넌트 / 기능 완성

- 23.08.12 YSH
  - 통화 불가한 상황시 모달로 알림 (나에게 온 전화가 있거나, 상대방이 통화중일 경우) UserSearchList, FriendList, RecentCall 수정

- 23.08.12 KSH
  - detail 친구 찾기 모달 아이콘 변경 및 간격 재조정
  - 심플 홈페이지 color 경로 추가 / 환경 설정은 마이페이지 하위로 이동
  - th bold
  - 심플 및 디테일 모드에 따른 비디오 페이지 백그라운드 색상 변경
  - 비디오 페이지 툴바 그림자 삭제 

- 23.08.13 KSH
  - detail waitingpage css 및 레이아웃 수정
    - 이미지 삽입
    - table 분리 후 hr 삽입
    - 간격 재조정
  - 회원가입 / 로그인 (심플) 인풋 태그 색상 변경

- 23.08.14 KSH
  - 새 글 작성하기 글씨 링크 추가
  - 로그인 / 회원가입 태그 길이 정렬
  - 게시글 작성 태그 길이 정렬
  - 심플 서비스 소개 페이지 서비스 내용 소개 텍스트 추가(label 완료)
  - 심플 고객의 소리 새 글 작성 버튼 위치 변경

- 23.08.15 KSH
  - 댓글 수정 삭제 버튼 및 작성일자 우측 정렬
  - 게시물 수정 삭제 버튼 변경
  - border-radius 수정
  - 댓글 등록 버튼 수정
  - commentName className (수정 필요시 css파일)으로 댓글 내용 길어질 시 닉네임 세로화 현상 제거
  - 디테일 댓글 수정 삭제 버튼 수정
  - footer 컴포넌트는 만들어 놨으나, 푸터가 들어가면 about 페이지에서 튕김현상 발생

- 23.08.15 YSH
  - 통화 거절 모달에서 나가기 버튼 클릭시 leavesession
  - 간헐적으로 발생하는 getMediaError 비동기 처리로 해결